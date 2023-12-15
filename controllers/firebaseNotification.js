const User = require('../models/user')

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
      res.status(400).json({ message: error.message });
    }
  };

