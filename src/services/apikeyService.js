const crypto = require("crypto");
const ErrorApp = require("../utils/appError");
const Email = require("../utils/email");
const { APIKey } = require("../models/index");



exports.generateApiKey = async (req, res, next) => {
    try {

        const email = req.body.email;

        const apiKey = crypto.randomBytes(16).toString('hex');

        if (!email) {
            return ErrorApp("email is required", 400);
        };

        const createApiKey = await APIKey.create({ email: email, key: apiKey });

        // html template for sending sign up code
        const html = `<h2>Verify your security code password reset</h2>
        <p>Never share your api key with anyone or shopmore employee will never ask for it</p>
        <p>it will expire in 15mins</p>
        <h2>${createApiKey.key}</h2>
        <p>Best regards</p>
        <p>Shopmore support </p>`;

        // send security code to the use
        await new Email(createApiKey, html).verifyEmail();

    } catch (err) {
        next(new ErrorApp("Error genearating API key ", 500))
    }
}