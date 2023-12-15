const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    productsInfo: [{
      productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
    },
    quantity: {
      type: Number,
      default: 1
    }
  }],
    totalValue: {
      type: Number,
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
  },
  {
    timestamps: true 
  });

  const Order = mongoose.model('Order', orderSchema);


  module.exports = Order