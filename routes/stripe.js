const express = require('express');
const { redirectToCheckout} = require('../controllers/stripe');

const router = express.Router();

router.post("/create-checkout-session", redirectToCheckout)

module.exports = router;