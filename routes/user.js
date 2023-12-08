const express = require('express');
const { getUser, getAllUsers, createUser, loginUser, updateUser, deleteUser, resetPassword} = require('../controllers/users');
const {authenticateJWT} = require('../middleware/authCheck')

const router = express.Router();
const upload = require('../helper/upload')

router.post('/login', loginUser)
router.post('/resetPassword', resetPassword)
router.post('/signup', createUser)

// router.use(authenticateJWT);

router.get('/', getAllUsers);
router.get('/:id', getUser)
router.put('/:id',upload.single('img'), updateUser)
router.delete('/:id', deleteUser)


module.exports = router;