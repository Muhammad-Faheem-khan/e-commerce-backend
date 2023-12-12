const jwt = require('jsonwebtoken');
const { validateUser} = require('../controllers/users')
exports.authenticateJWT = async (req, res, next) => {
    const bearerHeader = req.headers["authorization"];
    if (typeof bearerHeader !== "undefined") {
        const bearer = bearerHeader.split(" ");
        const token = bearer[1];

        try {
        const authData = jwt.verify(token, process.env.SECRETE_ACCESS_KEY);
        console.log('authData', authData)

        if (!authData) {
            return res.status(403).json({
            code: "Invalid Token!",
            });
        }
        const data = await validateUser(authData.userId);
        if (!data.status) {
            return res.status(403).json({
            code: "User not found!",
            });
        }

        req.user = data.user;
        next();
        } catch (error) {
        if (error.name === 'TokenExpiredError') {
            return res.status(403).json({
            code: "Token expired!",
            });
        }

        if (error.name === 'JsonWebTokenError') {
            return res.status(403).json({
            code: "Invalid Token!",
            });
        }

        return res.status(500).json({
            code: "Internal Server Error",
        });
        }
    } else {
        res.status(403).json({
        code: "Token missing!",
        });
    }
};

