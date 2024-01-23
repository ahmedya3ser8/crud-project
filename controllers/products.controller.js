const ProductModel = require('../models/product.model');
const httpStatus = require('../utils/httpStatus');
const { validationResult } = require('express-validator');

const getAllProducts = async (req, res) => {
  const query = req.query;
  const limit = req.query.limit || 10;
  const page = req.query.page || 1;
  const skip = (page - 1) * limit;
  const products = await ProductModel.find({}, {"__v": false}).limit(limit).skip(skip);
  res.status(200).json({status: httpStatus.SUCCESS, data: {products}})
}

const getProduct =async (req, res) => {
  try {
    const product = await ProductModel.findById(req.params.productId);
    if (!product) {
      return res.status(404).json({status: httpStatus.FAIL, data: {product: null}});
    }
    return res.status(200).json({status: httpStatus.SUCCESS, data: {product}});
  } catch (error) {
    return res.status(400).json({status: httpStatus.ERROR, message: error.message, code: 400, data: null});
  }
}

const createProduct = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({status: httpStatus.ERROR, message: errors.array(), code: 400, data: null});
  }

  const {id, title, price, description, category} = req.body;

  const newProduct = new ProductModel({
    id,
    title,
    price,
    description,
    category
  });

  await newProduct.save();
  res.status(201).json({status: httpStatus.SUCCESS, data: {product: newProduct}});
}

const updatedProduct = async (req, res) => {
  try {
    const updatedProduct = await ProductModel.updateOne({_id: req.params.productId}, {$set: {...req.body}});
    if (!updatedProduct) {
      return res.status(404).json({status: httpStatus.FAIL, data: {product: null}});
    }
    return res.status(200).json({status: httpStatus.SUCCESS, data: {product: updatedProduct}});
  } catch (error) {
    return res.status(400).json({status: httpStatus.ERROR, message: error.message, code: 400, data: null});
  }
}

const deleteProduct = async (req, res) => {
  await ProductModel.deleteOne({_id: req.params.productId});
  res.status(200).json({status: httpStatus.SUCCESS, data: null})
}

module.exports = {
  getAllProducts,
  getProduct,
  createProduct,
  updatedProduct,
  deleteProduct
}