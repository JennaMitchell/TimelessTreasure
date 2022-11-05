const mongoose = require("mongoose");

const SellerPlacedOrderSchema = new mongoose.Schema({
  itemsPlacedData: { type: Array, required: true, unique: true },
  status: { type: String, required: true, unique: true },
  orderId: { type: String, require: true },
  sellerId: { type: String, required: true, unique: true },
  date: { type: String, required: true },
});

module.exports = mongoose.model(
  "SellerPlacedOrderSchema",
  SellerPlacedOrderSchema
);
