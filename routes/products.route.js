const express = require('express');
const router = express.Router();

const productsController = require('../controllers/products.controller');
const { validationSchema } = require('../middlewares/validationSchema');

router.route('/')
  .get(productsController.getAllProducts)
  .post(validationSchema(), productsController.createProduct)

router.route('/:productId')
  .get(productsController.getProduct)
  .put(productsController.updatedProduct)
  .delete(productsController.deleteProduct)

module.exports = router;