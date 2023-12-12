const Order = require('../models/orders')
const Notification = require('../models/notification')
const mongoose = require('mongoose');
const socket = require('../socket');
const { ObjectId } = require('mongodb');

exports.getAllOrders = async (req, res) => {
    try {
  
      let query = Order.find();
      if (req.query.sort) {
        query = query.sort(req.query.sort)
      }
      if (req.query.fields) {
        const fields = req.query.fields.split(',').join(' ');
        query = query.select(fields);
      } else {
        query = query.select('-__v');
      }
    
      const orders = await query.exec();
      res.status(200).json(orders);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  };

exports.getUserOrders = async (req, res) => {
  try {
    const userId = req.params.id
    const objectIdUserId = new ObjectId(userId);
    const db = mongoose.connection.db;
    const ordersDB = db.collection('orders')
    const orders = await ordersDB.aggregate([
      { $match: { customerId: objectIdUserId } },
      { $project: {__v: 0}},
      { $sort : { createdAt: -1}}
    ]).toArray();

    res.status(200).json(orders);
  } catch (error) {
    console.log(error)
    res.status(404).json({ message: error.message });
  }
};

exports.createOrder = async (req, res) => {
  try {
    const { item, value, paymentId, customerId } = req.body
  
    const newOrder = new Order ({
      item,
      value,
      paymentId,
      customerId

    });
    await newOrder.save()

    const newNotification = new Notification({
      type: 'created',
      description: `New order: ${item}. Value: value`,
      orderId: newOrder._id
    })
    await newNotification.save()
    // io.emit('notification');

    socket.io().emit('notification', () => {
        console.log('notification added')
      })

    res.status(200).json(newOrder);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

exports.deleteOrder = async (req, res) => {
  try {
    const orderId = req.params.id;

    if (!mongoose.isValidObjectId(userId)) {
      return res.status(400).json({ message: 'Invalid order ID.' });
    }

    const deletedUser = await Order.findByIdAndDelete(orderId);

    if (!deletedUser) {
      return res.status(404).json({ message: 'Order not found.' });
    }

    res.status(200).json({ message: 'Order deleted successfully.' });
  } catch (error) {
    res.status(500).json({ message: 'An error occurred while deleting the order.' });
  }
};

exports.lastWeekOrders = async (req, res) => {
  try{
      const db = mongoose.connection.db;
      const orders = db.collection('orders')
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
      const details = await orders.aggregate([
          { $match: { createdAt: {$gte: sevenDaysAgo} } },
          {
              $lookup: {
                  from: 'payments',
                  localField: 'paymentId',
                  foreignField: '_id',
                  as: 'paymentDetails',
                },
          },
          { $unwind: '$paymentDetails' },
          {
          $group: {
              _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
              totalPaymentAmount: { $sum: { $toDouble: '$paymentDetails.paymentAmount' } },
          },
          },
          { $sort : { _id: -1}}
        ]).toArray();
      res.status(200).json(details);
  }catch (error) {
      res.status(404).json({ message: error.message });
  }
}