const { promisify } = require("util");
const crypto = require("crypto");
const { Op } = require("sequelize");

const appError = require("../utils/appError");
const { User } = require("../models/index");
const { createTokenCookies } = require("../utils/sendTokenCookies");
const Email = require("../utils/email");
// console.log(new Email(user, null));


exports.register = async function (req, res, next) {
	try {
		const createUser = await User.create({
			firstName: req.body.firstName,
			lastName: req.body.lastName,
			email: req.body.email,
			phoneNumber: req.body.phoneNumber,
			acceptedTerms: req.body.acceptedTerms,
			gender: req.body.gender,
			country: req.body.country,
			dateOfBirth: req.body.dateOfBirth,
			password: req.body.password,
			confirmPassword: req.body.confirmPassword
		});

	createTokenCookies(createUser, 201, res);

	} catch (err) {
		res.status(401).json(err.message);
	}
};


exports.login = async function (req, res, next) {

	const { email, password } = req.body;

	if (!email || !password) {
		return next(new appError("provide a email and password", 400));
	};

	const user = await User.findOne({ where: { email: email } });

	if (!user || !(await User.comparePassword(password, user.password))) {
		return next(new appError("Invalid a email and password", 401));
	};

	createTokenCookies(user, 201, res);

    // await new Email(user, null).welcomeMessage();

};



exports.forgotPassword = async function (req, res, next) {

	const email = req.body.email;

	const user = await User.findOne({ where: { email: email } });

	if (!user) {
		return next(new appError("This email doen't exist", 404));
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
		return next(new appError("Invalid token or has expired", 400));
	};

	user.password = req.body.password;
	user.confirmPassword = req.body.confirmPassword;
	user.passwordResetToken = null;
	user.passwordResetExpires = null;

	await user.save();

	createTokenCookies(user, 200, res);

};















