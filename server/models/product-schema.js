const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  title: { type: String, required: true },
  price: { type: String, required: true },
  priceType: { type: String, required: true },
  productType: { type: String, require: true },
  tags: { type: Array, required: true },
  imageUrl: { type: String, required: true },
  userId: { type: String, required: true },
  productId: { type: String, required: true },
  quantity: { type: String, required: true },
  status: { type: String, required: true },
});

module.exports = mongoose.model("ProductSchema", ProductSchema);
