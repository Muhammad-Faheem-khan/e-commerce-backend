const jwt = require('jsonwebtoken');
const UserToken = require('../models/refreshToken')
const {verifyRefreshToken }= require('../helper/verifyRefreshToken')

const SECRETE_ACCESS_KEY = process.env.SECRETE_ACCESS_KEY;

exports.generateAccessToken = async (req, res) => {
    try{
      const {tokenDetails} = await verifyRefreshToken(req.body.refreshToken)
      const userInfo = { userId: tokenDetails.userId, email: tokenDetails.email }
      const accessToken = jwt.sign( userInfo, SECRETE_ACCESS_KEY, { expiresIn: "15m" });

      res.status(200).json({accessToken, message: "Access token created successfully",})
    } catch (err){
        res.status(400).json(err)
    }
}

exports.deleteToken = async (req, res) => {
    try {
        const userToken = await UserToken.findOne({ token: req.body.refreshToken });
        if (!userToken)
            return res
                .status(200)
                .json({ error: false, message: "Logged Out Sucessfully" });

        await UserToken.deleteOne({ token: req.body.refreshToken });
        res.status(200).json({ error: false, message: "Logged Out Sucessfully" });
    } catch (err) {
        res.status(500).json({ error: true, message: "Internal Server Error" });
    }
  };