const express = require('express');
const {getAllPayments} = require('../../controllers/payments')

const router = express.Router();

router.get('/', getAllPayments)

module.exports = router