const Product = require('../models/product')
const mongoose = require('mongoose');
const { ObjectId } = require('mongodb');

exports.getAllproducts = async (req, res) => {
    try {
  
      let query = Product.find();
      if (req.query.sort) {
        query = query.sort(req.query.sort)
      }
      if (req.query.fields) {
        const fields = req.query.fields.split(',').join(' ');
        query = query.select(fields);
      } else {
        query = query.select('-__v');
      }
    
      const products = await query.exec();
      res.status(200).json(products);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  };

exports.getProductsBySeller = async (req, res) => {
  try {
    const sellerId = req.params.id
    const objectIdSellerId = new ObjectId(sellerId);
    const db = mongoose.connection.db;
    const productsDB = db.collection('products')
    const products = await productsDB.aggregate([
      { $match: { sellerId: objectIdSellerId} },
      { $project: {__v: 0}},
      { $sort : { createdAt: -1}}
    ]).toArray();

    res.status(200).json(products);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

exports.getProduct= async (req, res) => {
    try {
      const productId = req.params.id
      const objectIdProductId = new ObjectId(productId);
      const product = await Product.find({_id: objectIdProductId});
  
      res.status(200).json(product);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  };

exports.createproduct = async (req, res) => {
  try {

    if (req.user.role !== 'seller') {
        return res.status(403).json({ message: 'Access denied.' });
        }

    const { item, price, sellerId, stock, category } = req.body

    let imgPath = null;
    if (req.file) {
      imgPath = "http://localhost:5000/uploads/" + req.file?.filename 
    }

    const newproduct = new Product ({
      item,
      price,
      sellerId,
      stock,
      category,
      img: imgPath
    });

    await newproduct.save()

    res.status(200).json({message: 'Product is saved successfully', product: newproduct});
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

exports.deleteproduct = async (req, res) => {
  try {
    const productId = req.params.id;

    if (!mongoose.isValidObjectId(productId)) {
      return res.status(400).json({ message: 'Invalid product ID.' });
    }

    const product = await Product.findOne({ _id: productId });

    if (product) {
      if (req.user._id.toString() !== product.sellerId.toString() ) {
          return res.status(403).json({ message: 'Access denied.' });
        }else{
            await Product.deleteOne({ _id: productId });
        }
    }else{
        return res.status(404).json({ message: 'product not found.' });
    }

    res.status(200).json({ message: 'Product deleted successfully.' });
  } catch (error) {
    res.status(500).json({ message: 'An error occurred while deleting the product.' });
  }
};

exports.updateProduct = async (req, res) => {
    try {
      const productId = req.params.id;

      const product = await Product.findOne({ _id: productId });

      if (product) {
        if (req.user._id.toString() !== product.sellerId.toString()) {
            return res.status(403).json({ message: 'Access denied.' });
          }
      }
     
      let imgPath = null;
      if (req.file) {
        imgPath = "http://localhost:5000/uploads/" + req.file?.filename 
      }else{
        imgPath = product.img
      }

      product.item = req.body.item;
      product.price = req.body.price;
      product.img = imgPath;
      product.sellerId = req.body.sellerId;
      product.stock = req.body.stock;
      product.category = req.body.category
  
      const updatedProduct = await product.save();
  
      res.status(200).json({ message: 'Product is updated', product: updatedProduct });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };
