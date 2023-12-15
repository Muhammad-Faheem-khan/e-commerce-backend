const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
    items: [{
      productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
    },
    quantity: {
      type: Number,
      default: 1
    }
  }],
    paymentAmount: {
      type: String,
      required: true,
    }
  },
  {
    timestamps: true 
  });

  const Payment = mongoose.model('Payment', paymentSchema);


  module.exports = Payment