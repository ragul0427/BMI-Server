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
    startTime: {
      type: String,
    },
    stopTime: {
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
    gst:{
      type:Number,
    },
    deliveryCharge:{
      type:Number,
    },
    transactionCharge:{
      type:Number,
    },
    packingCharge:{
      type:Number,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("callOrder", callOrderSchema);
