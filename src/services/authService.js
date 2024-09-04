const { promisify } = require("util");
const crypto = require("crypto");
const { Op } = require("sequelize");
const bcrypt = require("bcryptjs");

const { Sequelize } = require("sequelize");
const axios = require("axios");


const { User, UserTemp } = require("../models/index");
const { createTokenCookies } = require("../utils/sendTokenCookies");
const ErrorApp = require("../utils/appError");


const Email = require("../utils/email");


exports.register = async function (req, res, next) {

	try {
		let ip = await req.headers['x-forwarded-for'] || req.ip;

		const { username, email, password, phoneNumber, gender, acceptedTerms } = req.body;

		const user = await User.findOne({ where: { email } });

		if(user){
			return next(new ErrorApp("email has already exits login to your account", 400));
		};

		// create user on the temporary model 
		const createUser = await User.create({
			email, password, phoneNumber, acceptedTerms, username, gender, ip
		});


		createTokenCookies(createUser, 201, `User sign up successfully`, res);
		

	} catch (err) { 
		res.status(401).send(err.message);
	}
};



exports.generateOneTimePassword  = async (req, res, next) => {

		// generate opt for user
		const otp = Math.floor(100000 + Math.random() * 900000).toString();

		// set expiry time for user
		const otpExpiry = new Date(Date.now() + 15 * 60 * 1000);

		const user = req.user;

		// save opt and expiry time to user
		user.otp = otp;
		user.otpExpiry = otpExpiry;
		await user.save();

	// await new Email(user, null).welcomeMessage();


		res.status(200).json({
			status: "success",
			message: `OTP is ${otp} it will expires in the next 15mins`,
		})

}


exports.verifyPhone = async function (req, res, next) {
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
			user.otpExpiry = null; 
			user.isPhoneVerified = true;
			await user.save();

			res.status(201).json({
				status: "success",
				message: "phoneNumber verification is successful",
			})

		} else {
			return next(new ErrorApp("Invalid OTP", 400));
		}

	} catch (err) {
		res.status(400).send(err.message);
	}
};


exports.verifyEmail = async function (req, res, next) {
	try {

		const userId = req.user.id;
  
		const user = await User.findByPk(userId);

		const { otp } = req.body;


		// check if otp has expired
		if (new Date() > user.otpExpiry) {
			return next(new ErrorApp("OTP has expired", 400));
		};

		// check if otp send is equal to the input one
		if (user.otp === otp) {
			user.otp = null; 
			user.otpExpiry = null; 
			user.isEmailVerified = true;
			await user.save();

			res.status(201).json({
				status: "success",
				message: "Email verification is successful",
			})


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
	// console.log(user.password)
	// console.log(await bcrypt.compare(password, user.password))

	if (!user || !(await bcrypt.compare(password, user.password))) {
		return next(new ErrorApp("Invalid a email and password", 401));
	};

	if (user.isEmailVerified === false || user.isPhoneVerified === false) {
		return next(new ErrorApp("please verify your email and number", 401));
	};

	createTokenCookies(user, 201, "Login Successfully", res);

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


exports.userLogout = async function (req, res) {
	res.cookie('jwt', "", { maxAge: 0 })
	res.status(200).json({
		status: "success"
	});
}












