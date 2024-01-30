const jwt = require('jsonwebtoken');
const { promisify } = require("util");
const bcrypt = require('bcryptjs');
const crypto = require("crypto");
const { Op } = require("sequelize");
const User = require("./../models/userModel");


const signToken = id => {
	return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN })
};

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
			confirmPassword: req.body.confirmPassword,

		});

		const token = signToken(createUser.id);
		res.status(201).json({
			status: "success",
			token,
			data: {
				User: createUser
			}
		})
	} catch (err) {
		next(res.status(401).send(err.message));
	}

};


exports.login = async function (req, res, next) {
	const { email, password } = req.body;

	if (!email || !password) {
		return res.status(400).send("provide a email and password");
	};

	const user = await User.findOne({ where: { email: email } });

	console.log(user)

	if (!user || !(await User.comparePassword(password, user.password))) {
		return next(res.status(401).send("Invalid a email and password"));
	};

	const token = signToken(user.id);
	res.status(201).json({
		status: "success",
		token
	});
};

exports.protect = async function (req, res, next) {

	let token;
	if (req.headers.authorization?.startsWith("Bearer")) {
		token = req.headers.authorization.split(" ")[1];
	};

	if (!token) {
		return res.status(401).send("You are not logged in! Please login to get accsss");

	}

	const decode = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

	const currentUser = await User.findByPk(decode.id);

	if (!currentUser) {
		return next(res.status(401).send("This User Token doesn't Exist Anymore"));
	};

	function changePasswordAfter() {
		const changeTimeStamp = parseInt(currentUser.createdAt.getTime() / 1000);

		return decode.iat < changeTimeStamp;
	}

	if (changePasswordAfter()) {
		return next(res.status(401).send("This User recently changed password"));
	}

	req.user = currentUser;

	next();
};


exports.forgotPassword = async function (req, res, next) {

	const email = req.body.email;

	const user = await User.findOne({ where: { email: email } });

	if (!user) {
		return res.status(404).send("This email doen't exist");
	};

	const resetToken = crypto.randomBytes(32).toString('hex');

	user.passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex');

	user.passwordResetExpires = Date.now() + 10 * 60 * 1000;

	await user.save();

	res.status(201).json({ message: user.passwordResetToken, date: user.passwordResetExpires });
};


exports.resetPassword = async function (req, res, next) {
	const hashedToken = crypto.createHash('sha256').update(req.params.token).digest('hex');
	const user = await User.findOne({ passwordResetToken: hashedToken, where: { passwordResetExpires: { [Op.gte]: Date.now() } } });

	if (!user) {
		next(res.status(400).send("Invalid token or has expired"));
	};

	user.password = req.body.password;
	console.log(user.password);
	user.confirmPassword = req.body.confirmPassword;
	user.passwordResetToken = null;
	user.passwordResetExpires = null;

	await user.save();

	const token = signToken(user.id);

	res.status(200).json({
		status: 'success',
		token
	});

};


exports.getAllActiveUsers = async (req, res, next) => {
  try {
    const activeUsers = await User.getActiveUsers();
    console.log(activeUsers)
    req.activeUsers = activeUsers;
    next();
  } catch (err) {
    res.status(500).send(err.message);
  }
};













