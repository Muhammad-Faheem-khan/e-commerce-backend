const firebase = require('firebase-admin')

const serviceAccount = require('./firebase.config.json')

firebase.initializeApp({
  credential: firebase.credential.cert(serviceAccount)
})

module.exports = firebase