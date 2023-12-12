const express = require('express');

const orderRoutes = require('./orders.js')
const PaymentRoutes = require('./payment.js')
const UserRoutes = require('./user.js')

const router = express.Router();

router.use('/users', UserRoutes)
router.use('/orders', orderRoutes)
router.use('/payments', PaymentRoutes)

module.exports = router