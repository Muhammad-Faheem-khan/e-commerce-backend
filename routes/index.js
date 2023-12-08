const express = require('express');

const orderRoutes = require('./orders.js')
const PaymentRoutes = require('./payment.js')
const UserRoutes = require('./user.js')

const router = express.Router();

router.use('/api/users', UserRoutes)
router.use('/api/orders', orderRoutes)
router.use('/api/payments', PaymentRoutes)

module.exports = router