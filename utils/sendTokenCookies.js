const jwt = require("jsonwebtoken");

const signToken = function (id) {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });
};


exports.createTokenCookies = function (user, statusCode, res) {
    const token = signToken(user.id);

    const cookiesOption = {
        expires: new Date(Date.now() + process.env.JWT_COOKIES_EXPIRES_IN * 24 * 60 * 60 * 1000),
        httpOnly: true,
        sameSite: 'lax'
    };

    if (process.env.ENV === 'production') cookiesOption.secure = true;

    res.cookie('jwt', token, cookiesOption);

    res.status(statusCode).json({
        status: "success",
        token,
        data: {
            User: user
        }
    })
};




