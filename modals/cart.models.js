const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema(
  {
    userRef: String,
    productRef: String,
    orderRef: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("cart", cartSchema);
