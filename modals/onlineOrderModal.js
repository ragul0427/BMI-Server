const mongoose = require("mongoose");

const onlineOrderSchema = mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    orderId: {
      type: String,
      required: true,
    },
    orderedFood: {
      type: String,
      required: true,
    },
    customerName: {
      type: String,
      required: true,
    },
    mobileNumber: {
      type: String,
      required: true,
    },
    timeSlot: {
      type: String,
    },
    inventory: {
      type: Array,
    },
    location: {
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
  },
  { timestamps: true }
);

module.exports = mongoose.model("onlineorder", onlineOrderSchema);
