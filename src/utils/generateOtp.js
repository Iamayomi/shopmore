const { User } = require("../models/index");

module.exports = async function (userId) {
		// generate opt for user
		const otp = Math.floor(100000 + Math.random() * 900000).toString();

		// set expiry time for user
		const otpExpiry = new Date(Date.now() + 15 * 60 * 1000);

		const user = await User.findByPk(userId);

		// save opt and expiry time to user
		user.otp = otp;
		user.otpExpiry = otpExpiry;
		await user.save();

		// res.status(200).json({
		// 	status: "success",
		// 	message: `OTP is ${otp} it will expires in the next 15mins`,
		// })

	// await new Email(user, null).welcomeMessage();
}

