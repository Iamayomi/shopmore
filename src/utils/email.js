const nodemailer = require("nodemailer");

module.exports = class Email  {
	   constructor(user, url) {
		this.to = to;
		this.email = user.email;
		this.otp = user.otp;
		this.from = `Shopmore Shopping Site<${process.env.EMAIL_FROM}>`;
	};
// olojedechristopher24@gmail.com

	transporter(){
		return nodemailer.createTransport({
			service: 'gmail',
			 auth: {
				user: "",
				password: "" 
			}
		})
	};



	async sendEmail(subject){

		const mailOption = {
			from: this.form,
			to: this.to,
			subject,
			text: `please verify Your opt ${this.otp}`
		};

		await this.transporter().sendMail(mailOption, (err, info) => {
			if(err){
				return console.log('Error', err);
			}
		 console.log('Email sent successfully: ', info.response);

		});
	};

	async welcomeMessage(){
		await this.sendEmail(`Welcome to shopmore ${this.username}`)
	};

	async verifyEmail(){
		await this.send('Your Email otp will Expires in 15 mins');
	};


	async sendPasswordReset(){
		await this.send('Your password reset token will Expires in 10mins');
	};

};

// how can i get the name and location of user signin so that sene email to thr user