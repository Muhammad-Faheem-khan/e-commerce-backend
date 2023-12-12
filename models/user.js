const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
      },

      email: {
        type: String,
        required: true,
        unique: true
      },

      password: {
        type: String,
        required: true
      },

      gender: {
        type: String,
        default: null,
      },

      dob: {
        type: String,
        default: null,
      },

      img: {
        type: String,
        default: null,
      },

      mobileNumber: {
        type: String,
        default: null,
      },

      address: {
        type: String,
        default: null,
      },

      isActive: {
        type: Boolean,
        default: true
      },

      role: {
        type: String,
        required: true,
        default: 'user',
      }},
      {
        timestamps: true 
      })

const User = mongoose.model('User', userSchema)

module.exports = User;