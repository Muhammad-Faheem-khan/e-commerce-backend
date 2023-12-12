const jwt = require('jsonwebtoken');
const UserToken = require('../models/refreshToken')

const SECRETE_REFRESH_KEY = process.env.SECRETE_REFRESH_KEY;

exports.verifyRefreshToken = async (refreshToken) => {
    try {
        const doc = await UserToken.findOne({ token: refreshToken });

        if (!doc) {
            throw { error: true, message: "Invalid refresh token" };
        }

        const tokenDetails = jwt.verify(refreshToken, SECRETE_REFRESH_KEY);

        return {
            tokenDetails,
            error: false,
            message: "Valid refresh token",
        };
    } catch (err) {
        throw { error: true, message: "Invalid refresh token" };
    }
};
