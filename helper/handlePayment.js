const Payment = require("../models/payment");


exports.createPayment = async (products, totalValue, customerId, res) => {
    try {

      const payment = new Payment ({
        items: products,
        paymentAmount: totalValue,
      });
  
      await payment.save()
      
      return payment

    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  };