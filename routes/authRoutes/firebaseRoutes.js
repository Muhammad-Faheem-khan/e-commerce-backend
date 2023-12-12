const express = require('express');
const {saveFirebaseToken, sendNotification} = require('../../controllers/firebaseNotification')

const router = express.Router();

router.put('/:id', saveFirebaseToken)
router.post('/send/:id', sendNotification)

module.exports = router