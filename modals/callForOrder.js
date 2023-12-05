const mongoose = require("mongoose");

const callOrderSchema = mongoose.Schema(
  {
    orderedFood: {
      type: Array,
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
    inventory: {
      type: Array,
    },
    deliveryStatus:{
      type:String,
      required:true,
    },
    location: {
      type: String,
      required: true,
    },
    timeSlot: {
      type: String,
    },
    timePicked: {
      type: String,
    },
    inventory: {
      type: Array,
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
