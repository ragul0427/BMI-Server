const mongoose = require("mongoose");

const callOrderSchema = mongoose.Schema(
  {
    orderedFood: {
      type: String,
      required: true,
    },
    customerName: {
      type: String,
      required: true,
    },
    mobileNumber: {
      type: Number,
      required: true,
    },
    location: {
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
    billAmount: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      default: "Order received",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("callOrder", callOrderSchema);
