const mongoose = require('mongoose');

const refreshTokenSchema = new mongoose.Schema({
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    token: {
      type: String,
      required: true,
    }
  },
    {
    timestamps: true 
  });

  const UserToken = mongoose.model('UserToken', refreshTokenSchema);


  module.exports = UserToken