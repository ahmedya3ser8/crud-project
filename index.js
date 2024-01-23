require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');

mongoose.connect(process.env.MONGO_URL).then(() => {
  console.log("Connected to MongoDB");
});

app.use(cors());

app.use(express.json()); // middleware for req.body

const productsRouter = require('./routes/products.route');

app.use('/api/products', productsRouter);

app.listen(process.env.PORT || 4000, () => {
  console.log(`listening on port ${process.env.PORT}`);
})