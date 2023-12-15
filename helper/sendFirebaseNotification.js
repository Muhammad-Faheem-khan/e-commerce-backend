const Notification = require('../models/notification')
const socket = require('../socket');
const firebase = require('../firebase')

exports.sendNotification = async (order, res) => {

  const newNotification = new Notification({
    type: 'created',
    description: `New order is Placed of Value: ${order.totalValue}`,
    orderId: order._id,
    userId: order.customerId._id
  })
  await newNotification.save()

  socket.io().emit('notification')

  const user = order.customerId
  if(user && user.firebaseToken !== ''){
    const message = {
      token: user.firebaseToken,
      
      data: {
        title: 'Order Placed',
        body: 'Hey there, your order is confirmed.',
        orderId: order._id.toString(),
        icon: 'https://img.freepik.com/free-photo/3d-render-black-white-hands-holding-red-heart_107791-16650.jpg?size=626&ext=jpg', 
        link: 'http://localhost:3000/',
          },
      };
      
      firebase.messaging().send(message)
      .then((response => {
        console.log('Successfully sent message:', response)
      })).catch((error)=>{
          console.log('Error sending message:', error);
          res.status(400).json({ message: error.message });
        })
  }
}
