const express = require('express');
const { getUser, getAllUsers, updateUser, deleteUser} = require('../../controllers/users');

const router = express.Router();
const upload = require('../../helper/upload')

router.get('/', getAllUsers);
router.get('/:id', getUser)
router.put('/:id',upload.single('img'), updateUser)
router.delete('/:id', deleteUser)

module.exports = router;