const express = require('express');
const { redirectToCheckout, redirectToPayment} = require('../controllers/stripe');

const router = express.Router();

router.post("/create-checkout-session", redirectToCheckout)
router.post("/create-intent-payment", redirectToPayment)
module.exports = router;