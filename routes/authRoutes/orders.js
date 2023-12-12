const express = require('express');
const {getAllOrders, getUserOrders, createOrder, lastWeekOrders} = require('../../controllers/orders')

const router = express.Router();

router.get('/', getAllOrders)
router.get('/:id', getUserOrders)
router.post('/create', createOrder)
router.get('/details', lastWeekOrders)

module.exports = router