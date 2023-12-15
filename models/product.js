const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    item: {
      type: String,
      required: true
    },
    price: {
      type: String,
      required: true,
    },
    sellerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    stock:{
        type: Number,
        required: true,
    },
    category: {
        type: String,
        required: true
    },
    quantity: {
      type: Number,
      default: 1,
    },
    img: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true 
  });

  const Product = mongoose.model('Product', productSchema);

  module.exports = Product