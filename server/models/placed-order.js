const mongoose = require("mongoose");

const PlacedOrderSchema = new mongoose.Schema({
  itemsPlacesData: { type: Array, required: true, unique: true },
  status: { type: String, required: true, unique: true },
  orderId: { type: String, require: true, unique: true },
});

module.exports = mongoose.model("PlacedOrderSchema", PlacedOrderSchema);
