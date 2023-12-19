const mongoose = require("mongoose");

const tableSchema = mongoose.Schema(
  {
    tableNo: {
      type: String,
      required: true,
    },
    seatsAvailable: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    status: {
      type: Boolean,
      default: false,
    },
    table_image_key:{
      type:String,
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("table", tableSchema);
