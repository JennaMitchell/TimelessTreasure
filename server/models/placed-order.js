const mongoose = require("mongoose");

const PlacedOrderSchema = new mongoose.Schema({
  itemsPlacedData: { type: Array, required: true },
  quantityArray: { type: Array, required: true },
  uniqueSellers: { type: Array, require: true },
  overAllStatus: { type: String, required: true },
  sellerOrderStatusArray: { type: Array, require: true },
  date: { type: String, require: true },
  orderId: { type: String, require: true, unique: true },
  buyerId: { type: String, unique: true },
});

module.exports = mongoose.model("PlacedOrderSchema", PlacedOrderSchema);
