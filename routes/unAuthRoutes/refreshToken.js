const express = require('express');
const { generateAccessToken, deleteToken} = require('../../controllers/refreshToken');

const router = express.Router();

router.post('/generateToken', generateAccessToken)
router.delete('/deleteToken', deleteToken)


module.exports = router;