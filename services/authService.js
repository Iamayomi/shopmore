const { promisify } = require("util");
const crypto = require("crypto");
const { Op } = require("sequelize");

const appError = require("../utils/appError");
const { User } = require("../models/index");
const { createTokenCookies } = require("../utils/sendTokenCookies");


exports.register = async function (req, res, next) {
	try {
		const createUser = await User.create({
			firstname: req.body.firstname,
			lastname: req.body.lastname,
			email: req.body.email,
			phonenumber: req.body.phonenumber,
			acceptedTerms: req.body.acceptedTerms,
			gender: req.body.gender,
			country: req.body.country,
			date_Of_Birth: req.body.date_Of_Birth,
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

};



exports.forgotPassword = async function (req, res, next) {

	const email = req.body.email;

	const user = await User.findOne({ where: { email: email } });

	if (!user) {
		return next(new appError("This email doen't exist", 404));
	};

	const resetToken = crypto.randomBytes(32).toString('hex');

	user.passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex');

	user.passwordResetExpires = Date.now() + 10 * 60 * 1000;

	await user.save();

	res.status(201).json({
		message: user.passwordResetToken,
		date: user.passwordResetExpires
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















