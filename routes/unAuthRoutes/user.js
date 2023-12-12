const express = require('express');
const { createUser, loginUser, resetPassword} = require('../../controllers/users');

const router = express.Router();

router.post('/login', loginUser)
router.post('/resetPassword', resetPassword)
router.post('/signup', createUser)

module.exports = router;