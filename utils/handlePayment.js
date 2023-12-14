const Payment = require("../models/payment");


exports.createPayment = async (item, paymentAmount, res) => {
    try {

      const payment = new Payment ({
        item,
        paymentAmount,
      });
  
      await payment.save()
      
      return payment

    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  };