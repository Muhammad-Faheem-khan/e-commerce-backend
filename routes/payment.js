const express = require('express');
const {getAllPayments, createPayment} = require('../controllers/payments')

const router = express.Router();

router.get('/', getAllPayments)
router.post('/create', createPayment)

module.exports = router