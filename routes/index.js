const express = require('express');

const unauthRoutes = require('./unAuthRoutes')
const stripe = require('./stripe')
const authRoutes = require('./authRoutes')
const {authenticateJWT} = require('../middleware/authCheck')

const router = express.Router();

router.use(stripe)
router.use(unauthRoutes,)
router.use(authenticateJWT)
router.use(authRoutes)

module.exports = router