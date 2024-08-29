const { Sequelize } = require("sequelize");
const cron = require("node-cron");
const { User, UserTemp } = require("../models/index");
const ErrorApp = require("./appError");


// const cronJob = cron.schedule('* * * * *', async () => {
//     try {
//         await UserTemp.destroy({ where: { isphoneVerified: false, otpExpiry: { [Sequelize.Op.lt]: new Date() } } });

//     } catch (err) {
//         console.error("Error while cleaning up unverify", err);
//     }
// });

// setTimeout(() => {
//     cronJob.stop();
// }, 24 * 60 * 60 * 1000);

// module.exports = cronJob; 