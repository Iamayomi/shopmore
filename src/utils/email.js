const nodemailer = require("nodemailer");

module.exports = class Email {
	constructor(user, html) {
		this.from = `Shopmore <${process.env.EMAIL_FROM}>`;
		this.to = user.email;
		this.username = user.username;
		this.otp = user.otp;
		this.html = html;
	};

	transporter() {
		return nodemailer.createTransport({
			host: process.env.BREVO_SMPT_HOST,
			port: 587,
			secure: false,
			// family: 6,
			auth: {
				user: process.env.BREVO_SMPT_USERNAME,
				pass: process.env.BREVO_SMPT_PASSWORD
			}
		})
	};



	async sendEmail(subject) {

		const mailOption = {
			from: this.from,
			to: this.to,
			subject,
			html: this.html,
		};

		await this.transporter().sendMail(mailOption, (err, info) => {
			if (err) {
				return console.log('Error', err);
			}
			console.log('Email sent successfully: ', info.response);

		});
	};

	async welcomeMessage() {
		await this.sendEmail(`Welcome to shopmore ${this.username}`)
	};

	async verifyEmail() {
		await this.sendEmail(`Your security code is ${this.otp}`);
	};

	async sendPasswordReset() {
		await this.sendEmail(`Your security code ${this.otp} password reset`);
	};

	async detectIpAddress() {
		await this.sendEmail('Your account is login on difference device');
	};

};

// how can i get the name and location of user signin so that sene email to thr user