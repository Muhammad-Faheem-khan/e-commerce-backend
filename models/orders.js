const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    item: {
      type: String,
      required: true
    },
    value: {
      type: String,
      required: true,
    },
    paymentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Payment',
    },
    customerId:{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  });

  const Order = mongoose.model('Order', orderSchema);


  module.exports = Order