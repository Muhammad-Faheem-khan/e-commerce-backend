const express = require('express');

const orderRoutes = require('./orders.js')
const PaymentRoutes = require('./payment.js')
const UserRoutes = require('./user.js')
const ProductRoutes = require('./product.js')
const FirebaseRoutes = require('./firebaseRoutes.js')

const router = express.Router();

router.use('/users', UserRoutes)
router.use('/orders', orderRoutes)
router.use('/payments', PaymentRoutes)
router.use('/products', ProductRoutes)
router.use('/firebase', FirebaseRoutes)

module.exports = router