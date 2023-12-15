const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
    type: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true,
    },
    orderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Order',
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    }
  },
    {
    timestamps: true 
  });

  const Notification = mongoose.model('Notification', notificationSchema);


  module.exports = Notification