const express = require('express');
const {getProduct, getProductsBySeller, getAllproducts, createproduct, deleteproduct, updateProduct} = require('../../controllers/product');

const router = express.Router();
const upload = require('../../helper/upload')

router.get('/', getAllproducts);
router.get('/:id', getProduct)
router.delete('/:id', deleteproduct)
router.put('/:id', upload.single('img'), updateProduct)
router.get('/seller/:id', getProductsBySeller)
router.post('/create',upload.single('img'), createproduct)

module.exports = router;