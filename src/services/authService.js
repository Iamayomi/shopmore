const { promisify } = require("util");
const crypto = require("crypto");
const { Op } = require("sequelize");
const bcrypt = require("bcryptjs");

const { Sequelize } = require("sequelize");
const axios = require("axios");
const SibApiV3Sdk = require('sib-api-v3-sdk');


const { User } = require("../models/index");
const { createTokenCookies } = require("../utils/sendTokenCookies");
// const generateOtp = require("../utils/generateOtp");
const ErrorApp = require("../utils/appError");

const Email = require("../utils/email");


exports.register = async function (req, res, next) {

	try {

		let ipAddress = await req.headers['x-forwarded-for'] || req.ip;

		const { username, email, password, phoneNumber, gender, acceptedTerms } = req.body;

		// find the user with the email if the user eist with the email
		const user = await User.findOne({ where: { email } });

		// generate opt for user
		const otp = Math.floor(100000 + Math.random() * 900000).toString();

		// set expiry time for user
		const otpExpiry = new Date(Date.now() + 15 * 60 * 1000);

		// html template for sending sign up code
		const html = `<h2> Your shopmore email security code </h2>
		<p>Never share your code with anyone shopmore employee will never ask for it</p>
		<p>it will expire in 15mins</p>
		<h2>${otp}</h2>
		<p>Best regards</p>
		<p>Shopmore support </p>`;

		// check if user has sign up with this email before, if so, sent code to the email
		// if(user.isEmailVerified === false){

		// 	// sent code to the user
		// 	await new Email(user, html).verifyEmail();

		// 	res.status(201).json({
		// 		status: "success",
		// 		message: `code has been sent to this email ${user.email}`,
		// 	})

		// // create user if email doest not exist in database
		// }; 
		// create user on the temporary model 
		const createUser = await User.create({
			email, password, phoneNumber, acceptedTerms, username, gender, ipAddress, otp, otpExpiry
		});

		// send OTP to user Email
		await new Email(createUser, html).verifyEmail();

		// sign token and send user response
		createTokenCookies(createUser, 201, `User sign up successfully`, res);


	} catch (err) { 
		res.status(401).send(err);
	}
};



exports.sendOTPPhonenumber = async function(req, res, next){

	try{

		const userId = req.params.userId;

		const user = await User.findByPk(userId);

		// generate opt for user
		const otp = Math.floor(100000 + Math.random() * 900000).toString(); 


		const defaultClient = SibApiV3Sdk.ApiClient.instance;

		let apiKey = defaultClient.authentications['api-key'];
		apiKey.apiKey = process.env.BREVO_SMPT_API_KEY;

		let apiInstance = new SibApiV3Sdk.TransactionalSMSApi();

		let sendTransacSms = new SibApiV3Sdk.SendTransacSms();

		sendTransacSms = {
				sender: 'shopmore',
				recipient: user.phoneNumber,
				content: `Your verification code is ${otp}`
			}

		const sendOTP = await apiInstance.sendTransacSms(sendTransacSms);
		// console.log(sendOTP.data)
		res.status(201).json({
				status: "success",
				message: "phoneNumber verification is successful",
				data: sendOTP
			})

	}catch(err){
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
		};

		// check if otp and user id send is true and update if is true
		User.update({ otp: null, otpExpiry: null, isPhoneVerified: true },
		 { where: { id: userId, otp: otp }}).then((data) => {
		res.status(201).json({
					status: "success",
					message: "phoneNumber verification is successful",
				})
		}).catch((err) => {
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
		};

		User.update({ otp: null, otpExpiry: null, isEmailVerified: true }, { where: { id: userId, otp: otp }}).then((data) => {
		res.status(201).json({
					status: "success",
					message: "Email verification is successful",
				})
		}).catch((err) => {
			return next(new ErrorApp("Invalid OTP", 400));
		});


	} catch (err) {
		res.status(400).send(err.message);
	}
}


exports.login = async function (req, res, next) {

	const { email, password } = req.body;

	if (!email || !password) {
		return next(new ErrorApp("provide a email and password", 400));
	};

	const user = await User.findOne({ where: { email } });
	// console.log(await bcrypt.compare(password, user.password))

	// if (!user || !(await bcrypt.compare(password, user.password))) {
	// 	return next(new ErrorApp("Invalid a email and password", 401));
	// };

	// createTokenCookies(user, 201, "Login Successfully", res);

	// await new Email(user, null).welcomeMessage();

};



exports.forgotPassword = async function (req, res, next) {

	const email = req.body.email;

	const user = await User.findOne({ where: { email: email } });

	if (!user) {
		return next(new ErrorApp("This email doen't exist", 404));
	};

   // generate opt for user
	const otp = Math.floor(100000 + Math.random() * 900000).toString();

	// set expiry time for user
	const otpExpiry = new Date(Date.now() + 15 * 60 * 1000);

	// save opt and expiry time to user
	user.otp = otp;
	user.otpExpiry = otpExpiry;
	await user.save();

   // await new Email(user, null).welcomeMessage();


	res.status(200).json({
		status: "success",
		message: `OTP is ${otp} it will expires in the next 15mins`,
	})

};


exports.resetPassword = async function (req, res, next) {

	const user = await User.findOne({ where: { otp: otp, otpExpiry: { [Op.gte]: Date.now() } } });

	if (!user) {
		return next(new ErrorApp("Invalid token or has expired", 400));
	};

	user.password = req.body.password;
	user.confirmPassword = req.body.confirmPassword;
	user.otp = null;
	user.otpExpiry = null;

	await user.save();

	createTokenCookies(user, 200, res);

};


exports.userLogout = async function (req, res) {
	res.cookie('jwt', "", { maxAge: 0 })
	res.status(200).json({
		status: "success"
	});
}












