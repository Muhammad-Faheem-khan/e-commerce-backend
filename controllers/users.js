const User = require('../models/user')
const bcrypt = require('bcrypt');
const mongoose = require('mongoose')
const {generateToken} = require('../utils/generateToken')

exports.getAllUsers = async (req, res) => {
  try {
    let query = User.find();
    if (req.query.sort) {
      query = query.sort(req.query.sort)
    }
    if (req.query.fields) {
      const fields = req.query.fields.split(',').join(' ');
      query = query.select(fields);
    } else {
      query = query.select('-__v');
    }
  
    const allUsers = await query.exec();
    res.status(200).json(allUsers);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

exports.getUser = async (req, res) => {
    try {
    
    const {id} = req.params
    const user = await User.findById(id);
      if (!user) {
        return res.status(404).send('User not found');
      }else{
       res.status(200).json(user)
      }
    }catch(error) {
        res.status(404).json({message: error.message})
    }
}

exports.createUser = async (req, res) => {

    const { name, email, password, role } = req.body
    try {
        
        // Check if the email is already registered
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ message: 'Email already registered' });
        }
    
        // Hash the password using bcrypt
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({
            name,
            email,
            password: hashedPassword,
            role,
        });
    
        await user.save();
        
        // Return a success response
      res.status(201).json({ message: 'User registered successfully', user});

    }catch(error) {
      console.log(error)
      res.status(500).json({ message: 'An error occurred while registering the user' });
    }
}

exports.loginUser = async (req, res) => {
  try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }
  
      const isPasswordMatch = await bcrypt.compare(password, user.password);
      if (!isPasswordMatch) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }

      const { accessToken, refreshToken } = await generateToken(user);
    
      res
      .cookie('refreshToken', refreshToken, { httpOnly: true, sameSite: 'strict' })
      .header('Authorization', accessToken)
      .json({ accessToken, user });

    } catch (error) {
      console.log(error)
      res.status(500).json({ message: 'An error occurred during login' });
    }
}

exports.updateUser = async (req, res) => {
  try {
    console.log(req.user._id)
    const userId = req.params.id;
    if (req.user._id.toString() !== userId) {
      return res.status(403).json({ message: 'Access denied.' });
    }

    const { email } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser && existingUser._id.toString() !== userId) {
      return res.status(409).json({ message: 'Email already exists for another user.' });
    }
    
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if(req.body.password){

      user.password = await bcrypt.hash(req.body.password, 10);
    }
    let imgPath = null;
    if (req.file) {
      imgPath = "http://localhost:5000/uploads/" + req.file?.filename 
    }else{
      imgPath = user.img
    }
    user.name = req.body.name;
    user.email = req.body.email;
    user.img = imgPath;
    user.gender = req.body.gender;
    user.mobileNumber = req.body.mobilePersonal;
    user.address = req.body.address;
    user.role = req.body.role;

    const updatedUser = await user.save();

    res.status(200).json({ message: 'User profile is updated', user: updatedUser });
  } catch (error) {
    console.log(error)
    res.status(400).json({ message: error.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;
    if (req.user._id.toString() !== userId) {
      return res.status(403).json({ message: 'Access denied.' });
    }

    if (!mongoose.isValidObjectId(userId)) {
      return res.status(400).json({ message: 'Invalid user ID.' });
    }

    const deletedUser = await User.findByIdAndDelete(userId);

    if (!deletedUser) {
      return res.status(404).json({ message: 'User not found.' });
    }

    res.status(200).json({ message: 'User deleted successfully.' });
  } catch (error) {
    res.status(500).json({ message: 'An error occurred while deleting the user.' });
  }
};

exports.resetPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(409).json({ message: 'Invalid Email' });
    }else{
      const user = await User.findById(existingUser._id);
      const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()-_=+";
      let password = "";
      
      for (let i = 0; i < 10; i++) {
        const randomIndex = Math.floor(Math.random() * charset.length);
        password += charset.charAt(randomIndex);
      }
      user.password = await bcrypt.hash(password, 10);
      const updatedUser = await user.save();
      res.status(200).json({ message: 'Password is reset.', password});
    }
    
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.validateUser = async (userId) =>{
  try{
    console.log(userId)
    const user = await User.findById(userId);
    if (!user) {
      return {code : 404 , status: false,  message :'User not found'}
    }
      return {code : 200 , status: true , user , message :'User found'}
  }
  catch(err){
    return {code : 500 , status: false , message :'Internal server error'}
  }
}