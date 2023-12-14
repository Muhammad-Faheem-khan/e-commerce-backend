const express = require('express');
const {saveFirebaseToken} = require('../../controllers/firebaseNotification')

const router = express.Router();

router.put('/:id', saveFirebaseToken)

module.exports = router