const jwt = require('jsonwebtoken');
const User = require('../models/user'); 

exports.authenticateJWT = async (req, res, next) => {
  const bearerHeader = req.headers["authorization"];
  if (typeof bearerHeader !== "undefined") {
    const bearer = bearerHeader.split(" ");
    const token = bearer[1];

    const authData = await jwt.verify(token, process.env.SECRETE_KEY)

    if(!authData){
        res.status(403).json({
            code: "Invalid Token!",
          });
    }else{
        try{
            const user = await User.findById(authData.userId)
            if (!user) {
                return res.status(403).json({
                  code: "User not found!",
                });
              }
        } catch (error){
            return res.status(500).json({
                code: "Internal Server Error",
              });
        }
    }

  } else {
    res.status(403).json({
      code: "Token missing!",
    });
  }
};

