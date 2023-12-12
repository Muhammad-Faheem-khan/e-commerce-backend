const express = require('express');

const  refreshToken = require('./refreshToken')
const userRoutes = require('./user.js')

const router = express.Router();

router.use('/token', refreshToken)
router.use('/users', userRoutes)

module.exports = router