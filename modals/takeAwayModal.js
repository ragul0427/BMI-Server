const mongoose = require("mongoose");

const takeAwaySchema = mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    orderedFood: {
      type: Array,
      required: true,
    },
    customerName: {
      type: String,
      required: true,
    },
    timeSlot: {
      type: String,
    },
    inventory: {
      type: String,
    },
    category: {
      type: String,
    },
    quantity: {
      type: String,
    },
    mobileNumber: {
      type: String,
      required: true,
    },
    billAmount: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      default: "Order placed",
      required: true,
    },
    gst: {
      type: Number,
    },
    delivery_charge: {
      type: Number,
    },
    packing_charge: {
      type: Number,
    },
    transaction_charge: {
      type: Number,
    },
    coupon_amount: {
      type: Number,
    },
    item_price: {
      type: Number,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("takeawayorder", takeAwaySchema);
