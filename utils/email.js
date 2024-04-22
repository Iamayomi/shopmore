const nodemailer = require("nodemailer");

module.exports = class Email {
	   constructor(user, url) {
        this.to = user.email;
        this.firstName = user.firstName;
        this.url = url;
        this.from = `Shopmore <${process.env.EMAIL_FROM}>`;
    };


    transport(){
    	return nodemailer.createTransport({
    	    host: process.env.EMAIL_HOST,
            port: process.env.EMAIL_PORT,
            auth: {
                user: process.env.EMAIL_USERNAME,
                pass: process.env.EMAIL_PASSWORD
            }

    	});
    };

	async sendEmail(){

		const mailOption = {
			from: this.form,
			to: this.to,
			// subject
		};

		await this.transport().sendMail(mailOption);
	};

	async welcomeMessage(){
		await this.sendEmail("Welcome to SHOPMORE !!!")
	};

	async sendPasswordReset(){
        await this.send('Your password reset token will Expires in 10mins');
    };

};

// how can i get the name and location of user signin so that sene email to thr user