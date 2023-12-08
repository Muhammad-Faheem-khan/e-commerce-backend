const Payment = require('../models/payment')

exports.getAllPayments = async (req, res) => {
    try {
  
      const payments = await Payment.find();
      res.status(200).json(payments);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  };


  exports.createPayment = async (req, res) => {
    try {
      const { item, paymentAmount } = req.body
    
      const payment = new Payment ({
        item,
        paymentAmount,
      });

      await payment.save()
      res.status(200).json(payment);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  };