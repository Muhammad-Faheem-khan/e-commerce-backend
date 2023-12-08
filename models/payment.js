const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
    item: {
      type: String,
      required: true
    },
    paymentAmount: {
      type: String,
      required: true,
    },
    orderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Order',
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  });

  const Payment = mongoose.model('Payment', paymentSchema);


  module.exports = Payment