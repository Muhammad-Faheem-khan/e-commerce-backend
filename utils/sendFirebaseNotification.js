const User = require('../models/user')

const firebase = require('../firebase')

exports.sendNotification = async (customerId, res) => {
    
      const user = await User.findById({_id: customerId});
      if(user && user.firebaseToken !== ''){
        const message = {
          token: user.firebaseToken,
          
          data: {
            title: 'Order Placed',
            body: 'Hey there, your order is confirmed.',
            orderId: '12345',
            icon: 'https://img.freepik.com/free-photo/3d-render-black-white-hands-holding-red-heart_107791-16650.jpg?size=626&ext=jpg', 
            orderId: '12345',
            link: 'http://localhost:3000/',
              },
          };
          
          firebase.messaging().send(message)
          .then((response => {
            console.log('Successfully sent message:', response)
            return message
          })).catch((error)=>{
                console.log('Error sending message:', error);
                res.status(400).json({ message: error.message });
            })
      }
}
