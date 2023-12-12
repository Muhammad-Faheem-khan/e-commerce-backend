const User = require('../models/user')

const firebase = require('../firebase')

exports.saveFirebaseToken = async (req, res) => {
    try {
      const userId = req.params.id;
      if (req.user._id.toString() !== userId) {
        return res.status(403).json({ message: 'Access denied.' });
      }
  
      const { firebaseToken } = req.body;
      
      const user = await User.findById(userId);
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      if(firebaseToken){
        user.firebaseToken = firebaseToken;
      }else{
        user.firebaseToken = '';
      }
  
      await user.save();
  
      res.status(200).json({ message: 'Firebase token is saved'});
    } catch (error) {
      console.log(error)
      res.status(400).json({ message: error.message });
    }
  };

exports.sendNotification = async (req, res) => {
    const userId = req.params.id;
      if (req.user._id.toString() !== userId) {
        return res.status(403).json({ message: 'Access denied.' });
      }
      
      const user = await User.findById(userId);
      console.log('user', user)

      if(user && user.firebaseToken !== ''){
        const message = {
            token: user.firebaseToken,
            data: {
                title: 'Firebase notification',
                body: 'Hey there>>>> I am here'
                }
            }
            console.log(message)

          const response = await firebase.messaging().send(message)
        //   .then((response => {
        //     res.status(200).json({ message: response });
        //     console.log('Successfully sent message:', response)
        //   }))
          if(response){
            
            }else {
                console.log('Error sending message:', error);
                res.status(400).json({ message: response });
            }
      }
}
