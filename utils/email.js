
// const AWS = require("aws-sdk");

// const nodemailer = require("nodemailer");

// module.exports = class Email {
// 	   constructor(user, url) {
//         this.to = user.email;
//         this.firstName = user.firstName;
//         this.url = url;
//         this.from = `Shopmore Shopping Site<${process.env.EMAIL_FROM}>`;
//     };
// // olojedechristopher24@gmail.com

//     transporter(){
//     	return nodemailer.createTransport({
//         	 host: 
//              post: 587, 
//              secure: false,
//              auth: {
//                 user: 
//                 password:
//              }
//              })
//     	});
//     };


// 	async sendEmail(subject){

// 		const mailOption = {
// 			from: this.form,
// 			to: this.to,
// 			subject,
//             text: 'testing AWS SES email'
// 		};

// 		await this.transporter().sendMail(mailOption, (err, info) => {
//             if(err){
//                 return console.log('Error', err);
//             }
//          console.log('Email sent successfully: ', info.response);

//         });
// 	};

// 	async welcomeMessage(){
// 		await this.sendEmail(`Welcome to shopmore ${this.firstName}`)
// 	};

// 	async sendPasswordReset(){
//         await this.send('Your password reset token will Expires in 10mins');
//     };

// };

// // how can i get the name and location of user signin so that sene email to thr user