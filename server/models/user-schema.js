const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isSeller: {
    type: Boolean,
    default: false,
  },

  // img: { type: String },
});

module.exports = mongoose.model("UserSchema", UserSchema);
