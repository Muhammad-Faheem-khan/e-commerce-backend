const Payment = require('../models/payment')

exports.getAllPayments = async (req, res) => {
  try {
    const payments = await Payment.find();
    res.status(200).json(payments);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

