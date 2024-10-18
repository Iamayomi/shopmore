const { Op } = require("sequelize");
const bcrypt = require("bcryptjs");

const axios = require("axios");
const SibApiV3Sdk = require("sib-api-v3-sdk");

const { User } = require("../models/index");
const { createTokenCookies } = require("../utils/sendTokenCookies");
const ErrorApp = require("../utils/appError");

const Email = require("../utils/email");

exports.register = async function (req, res, next) {
  try {
    // user public address
    const ipAddress = await axios.get(`https://api.ipify.org?format=json`);

    const { ip } = ipAddress.data;

    // generate opt for user
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // set expiry time for user
    const otpExpiry = new Date(Date.now() + 15 * 60 * 1000);

    // html template for sending sign up code
    const html = `<h2> Verify your email address</h2>
    	<p>Never share your code with anyone shopmore employee will never ask for it</p>
    	<p>it will expire in 15mins</p>
    	<h2>${otp}</h2>
    	<p>Best regards</p>
    	<p>Shopmore support </p>`;

    const { email, password, acceptedTerms } =
      req.body;

    // find the user with the email if the user eist with the email
    const user = await User.findOne({ where: { email } });

    // create user if email doest not exist in database
    const userIsNotEmailVerified = await User.findOne({
      where: { email: email, isEmailVerified: false },
    });

    if (userIsNotEmailVerified) {
      await new Email(user, html).verifyEmail();

      // sign token and send user response
      return createTokenCookies(user, 201, `code has been sent to this email ${email}`, res);
    };

    const userIsEmailVerified = await User.findOne({
      where: { email: email, isEmailVerified: true },
    });

    // check if user has sign up with this email before, if so, sent code to the email
    if (!userIsEmailVerified) {

      // create user on the temporary model
      const createUser = await User.create({
        email,
        password,
        acceptedTerms,
        ip,
        otp,
        otpExpiry,
      });

      // send OTP to user Email
      await new Email(createUser, html).verifyEmail();

      // sign token and send user response
      createTokenCookies(createUser, 201, `code has been sent to this email ${email}`, res);

    }
  } catch (err) {
    res.status(401).send(err);
  }
};

exports.sendOTPPhonenumber = async function (req, res, next) {
  try {
    const userId = req.params.userId;

    const user = await User.findByPk(userId);

    const { phoneNumber } = req.body;

    // generate opt for user
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    const defaultClient = SibApiV3Sdk.ApiClient.instance;

    let apiKey = defaultClient.authentications["api-key"];
    apiKey.apiKey = process.env.BREVO_SMPT_API_KEY;

    let apiInstance = new SibApiV3Sdk.TransactionalSMSApi();

    let sendTransacSms = new SibApiV3Sdk.SendTransacSms();

    sendTransacSms = {
      sender: "shopmore",
      recipient: phoneNumber,
      content: `Your verification code is ${otp}`,
    };

    const sendOTP = await apiInstance.sendTransacSms(sendTransacSms);
    // console.log(sendOTP.data)
    res.status(201).json({
      status: "success",
      message: "phoneNumber verification is successful",
      data: sendOTP,
    });
  } catch (err) {
    res.status(400).send(err);
  }
};

exports.verifyPhone = async function (req, res, next) {
  try {
    const userId = req.params.userId;

    const user = await User.findByPk(userId);

    const { otp } = req.body;

    // check if otp has expired
    if (Date.now() > user.otpExpiry) {
      return next(new ErrorApp("OTP has expired", 400));
    }

    // check if otp and user id send is true and update if is true
    User.update(
      { otp: null, otpExpiry: null, isPhoneVerified: true },
      { where: { id: userId, otp: otp } }
    )
      .then((data) => {
        res.status(201).json({
          status: "success",
          message: "phoneNumber verification is successful",
        });
      })
      .catch((err) => {
        return next(new ErrorApp("Invalid OTP", 400));
      });
  } catch (err) {
    res.status(400).send(err.message);
  }
};

exports.verifyEmail = async function (req, res, next) {
  try {
    const userId = req.params.userId;

    const user = await User.findByPk(userId);

    const { otp } = req.body;

    // check if otp has expired
    if (new Date() > user.otpExpiry) {
      return next(new ErrorApp("OTP has expired", 400));
    }

    // check if otp and user id send is true and update if is true
    User.update(
      { otp: null, otpExpiry: null, isEmailVerified: true },
      { where: { id: userId, otp: otp } }
    )
      .then((data) => {
        res.status(201).json({
          status: "success",
          message: "Email verification is successful",
        });
      })
      .catch((err) => {
        return next(new ErrorApp("Invalid OTP", 400));
      });
  } catch (err) {
    res.status(400).send(err.message);
  }
};

exports.addDetails = async (req, res, next) => {
  const userId = req.params.userId;

  const user = await User.findByPk(userId);

  const { username, gender } = req.body;
  user.gender = gender;
  user.username = username;
  await user.save();

  res.status(201).json({
    status: "success",
    message: "Details successfully upload",
  });
}

exports.login = async function (req, res, next) {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new ErrorApp("provide a email and password", 400));
  }

  let html;

  const user = await User.findOne({ where: { email } });
  // console.log(await bcrypt.compare(password, user.password))
  const userIsEmailVerified = await User.findOne({
    where: { email: email, isEmailVerified: false },
  });

  if (userIsEmailVerified) {
    // generate opt for user
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    html = `<h2> Your shopmore email security code </h2>
		<p>Never share your code with anyone shopmore employee will never ask for it</p>
		<p>it will expire in 15mins</p>
		<h2>${otp}</h2>
		<p>Best regards</p>
		<p>Shopmore support </p>`;

    await new Email(user, html).verifyEmail();

    res.status(201).json({
      status: "success",
      message: `code has been sent to this email ${user.email}`,
    });
  } else if (!user || !(await bcrypt.compare(password, user.password))) {
    return next(new ErrorApp("Invalid a email and password", 401));
  } else {
    // check if user login on the same device if not send email to the user
    if (!(user.ipAddress === req.ip)) {
      const ipAddress = await axios.get(`https://api.ipify.org?format=json`);

      const { ip } = ipAddress.data;

      const getLocation = await axios.get(
        `http://api.ipstack.com/${ip}?access_key=${process.env.IPSTACK_API_KEY}`
      );

      const { country_name, region_name, longitude, latitude, city } =
        getLocation.data;

      html = `<h2>Your account was sign in on difference device </h2>
			<p>Account: ${user.email}</p>
			<p>Location: ${country_name}, ${region_name} ${city}</p>
			<p>Time: ${new Date()}</p>
			<p>Latitude: ${latitude}</p>
			<p>Longitude: ${longitude}</p>
			<p>Ip Address: ${ip}</p>
			<p>Best regards</p>
			<p>Shopmore support </p>`;

      await new Email(user, html).detectIpAddress();
    }

    createTokenCookies(user, 201, "Login Successfully", res);
  }
};

exports.forgotPassword = async function (req, res, next) {
  const email = req.body.email;

  const user = await User.findOne({ where: { email } });

  if (!user) {
    return next(new ErrorApp("This email doen't exist", 404));
  }

  // generate opt for user
  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  // set expiry time for user
  const otpExpiry = new Date(Date.now() + 15 * 60 * 1000);

  // save opt and expiry time to user
  user.otp = otp;
  user.otpExpiry = otpExpiry;
  await user.save();

  // html template for sending sign up code
  const html = `<h2>Verify your security code password reset</h2>
		<p>Never share your code with anyone shopmore employee will never ask for it</p>
		<p>it will expire in 15mins</p>
		<h2>${user.otp}</h2>
		<p>Best regards</p>
		<p>Shopmore support </p>`;

  // send security code to the use
  await new Email(user, html).sendPasswordReset();

  res.status(201).json({
    status: "success",
    message: `security code has been sent to this email ${user.email}`,
  });
};

exports.verifyResetPasswordCode = async function (req, res, next) {
  const { email, otp } = req.body;

  const user = await User.findOne({
    where: { email: email, otp: otp, otpExpiry: { [Op.gte]: Date.now() } },
  });

  if (!user) {
    return next(
      new ErrorApp("Security Code has expired or invalid email", 400)
    );
  }
  await user.save();

  res.status(201).json({
    status: "success",
    message: "password reset code verification is successful",
  });
};

exports.resetPassword = async function (req, res, next) {
  const email = req.body.email;

  const user = await User.findOne({ where: { email } });

  if (!user) {
    return next(new ErrorApp("email does not exist", 400));
  }

  user.password = req.body.password;
  user.confirmPassword = req.body.confirmPassword;
  user.otp = null;
  user.otpExpiry = null;

  await user.save();

  createTokenCookies(user, 200, "password successfully reset", res);
};

exports.userLogout = async function (req, res) {
  res.cookie("jwt", "", { maxAge: 0 });
  res.status(200).json({
    status: "success",
  });
};
