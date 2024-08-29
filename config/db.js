const { Sequelize } = require("sequelize");
require('dotenv').config({ path: './config/config.env' });

const sequelize = (process.env.NODE_ENVIRONMENT === 'production') ?  new Sequelize(process.env.PG_URL, { dialect: 'postgres' }) :  new Sequelize(process.env.PG_DATABASE, process.env.PG_USERNAME, process.env.PG_PASSWORD, { dialect: 'postgres' });


const connectDatabse = async function () {
    console.log("Checking database connection..........");
    try {
        await sequelize.authenticate();
        console.log("Database connected succesfully");
    } catch (err) {
        console.log("Unable to connect ", err);
    }
};

connectDatabse();

module.exports = sequelize;