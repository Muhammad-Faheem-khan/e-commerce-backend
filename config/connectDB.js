const mongoose = require('mongoose');
const mongoURI = process.env.MONGODB_URI;

async function connectToMongoDB() {
    try {
      await mongoose.connect(mongoURI);
      console.log('Connected to MongoDB Atlas');
    } catch (error) {
      console.error('Failed to connect to MongoDB Atlas:', error);
    }
  }

module.exports = connectToMongoDB