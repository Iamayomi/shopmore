const { promisify } = require("util");
const crypto = require("crypto");
const { Op } = require("sequelize");
const bcrypt = require("bcryptjs");
const { Sequelize } = require("sequelize");
const axios = require("axios");


const ErrorApp = require("../utils/appError");
const { User, UserTemp } = require("../models/index");
const { createTokenCookies } = require("../utils/sendTokenCookies");

// const Email = require("../utils/email");


exports.register = async function (req, res, next) {

	// let getuserIp = await req.headers['x-forwarded-for'] || req.connectionRemote;
	// getuserIp = getuserIp + " ";
	// console.log(getuserIp)

	try {

		const { username, email, password, phoneNumber, gender, acceptedTerms } = req.body;

		// generate opt for user
		const otp = Math.floor(100000 + Math.random() * 900000).toString();

		// set expiry time for user
		const otpExpiry = new Date(Date.now() + 1 * 60 * 1000);

		const user = await User.findOne({ where: { email } });


		if (user.isEmailVerified === false) {
			const userId = user.id;

			//const email = new Email(createUser, null).welcomeMessage();

			// save opt and expiry time to user
			user.otp = otp;
			user.otpExpiry = otpExpiry;
			await user.save();

			res.status(200).json({
				status: "success",
				message: `The OTP is ${otp}`
			})
		}
		else {
			// create user on the temporary model 
			const createUser = await User.create({
				email, password, phoneNumber, acceptedTerms, username, gender
			});

			// save opt and expiry time to user
			createUser.otp = otp;
			createUser.otpExpiry = otpExpiry;
			await createUser.save();

			createTokenCookies(createUser, 201, `The OTP is ${otp}`, res);
		}


	} catch (err) {
		res.status(401).send(err.message);
	}
};


exports.verifyPhone = async function (req, res, next) {
	try {
		const { otp } = req.body;

		// find user by phone number 
		const tempUser = await UserTemp.findByPk(req.user.id);

		if (Date.now() > tempUser.otpExpiry) {
			await UserTemp.destroy({ where: { isphoneVerified: false, otpExpiry: { [Sequelize.Op.lt]: new Date() } } });
			return next(new ErrorApp("OTP has expired. please sign up again", 400));
		}

		// check if the OTP is correct
		if (tempUser.otp === otp) {

			const { email, password, phoneNumber, acceptedTerms, gender, username } = tempUser;

			const user = await User.create({
				email, phoneNumber, acceptedTerms, gender, username
			});

			user.password = password;
			user.save();

			await UserTemp.destroy({ where: { email } });

			createTokenCookies(user, 201, "Phone verification is successful", res);

		} else {
			return next(new ErrorApp("Invalid OTP", 400));
		}

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
		if (Date.now() > user.otpExpiry) {
			return next(new ErrorApp("OTP has expired", 400));
		};

		// check if otp send is equal to the input one
		if (user.otp === otp) {
			user.otp = null;
			user.isEmailVerified = true;
			createTokenCookies(user, 201, "Email verification is successful", res);

		} else {
			return next(new ErrorApp("Invalid OTP", 400));
		}

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
	console.log(await bcrypt.compare(password, user.password))

	if (!user || !(await bcrypt.compare(password, user.password))) {
		return next(new ErrorApp("Invalid a email and password", 401));
	};

	createTokenCookies(user, 201, res);

	// await new Email(user, null).welcomeMessage();

};



exports.forgotPassword = async function (req, res, next) {

	const email = req.body.email;

	const user = await User.findOne({ where: { email: email } });

	if (!user) {
		return next(new ErrorApp("This email doen't exist", 404));
	};

	const resetToken = crypto.randomBytes(32).toString('hex');

	user.password_reset_token = crypto.createHash('sha256').update(resetToken).digest('hex');

	user.password_reset_expires = Date.now() + 10 * 60 * 1000;

	await user.save();

	res.status(201).json({
		message: user.password_reset_token,
		date: user.password_reset_expires
	});

};


exports.resetPassword = async function (req, res, next) {

	const hashedToken = crypto.createHash('sha256').update(req.params.token).digest('hex');

	const user = await User.findOne({ passwordResetToken: hashedToken, where: { passwordResetExpires: { [Op.gte]: Date.now() } } });

	if (!user) {
		return next(new ErrorApp("Invalid token or has expired", 400));
	};

	user.password = req.body.password;
	user.confirmPassword = req.body.confirmPassword;
	user.passwordResetToken = null;
	user.passwordResetExpires = null;

	await user.save();

	createTokenCookies(user, 200, res);

};















