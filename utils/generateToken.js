const jwt = require('jsonwebtoken');
const UserToken = require('../models/refreshToken')

const SECRETE_ACCESS_KEY = process.env.SECRETE_ACCESS_KEY;
const SECRETE_REFRESH_KEY = process.env.SECRETE_REFRESH_KEY;

exports.generateToken = async (user) => {
    try {
        
        const userInfo = { userId: user._id, email: user.email }
        const accessToken = jwt.sign(userInfo, SECRETE_ACCESS_KEY, {expiresIn: '1h'} );
        const refreshToken = jwt.sign(userInfo, SECRETE_REFRESH_KEY, {expiresIn: '15d'})

        const userToken = await UserToken.findOne({ userId: user._id });
        if (userToken) await userToken.deleteOne();

        await new UserToken({ userId: user._id, token: refreshToken }).save();
        return Promise.resolve({ accessToken, refreshToken });
    } catch (error) {
        return Promise.reject(error);
    }
  }