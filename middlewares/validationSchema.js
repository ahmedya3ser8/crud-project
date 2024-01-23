const { body } = require("express-validator")

const validationSchema = () => {
  return [body('id')
  .notEmpty()
  .withMessage('id is required and must be unique'),
  body('title')
    .notEmpty()
    .withMessage('title is required'),
  body('price')
    .notEmpty()
    .withMessage('price is required'),
  body('description')
    .notEmpty()
    .withMessage('description is required'),
  body('category')
    .notEmpty()
    .withMessage('category is required')
  ]
}

module.exports = {
  validationSchema
}