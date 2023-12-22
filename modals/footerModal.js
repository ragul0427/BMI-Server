const mongoose = require("mongoose");

const footerSchema = mongoose.Schema(
  {
    name:String,
    logo: String,
    contactNumber:String,
    address:String,
    email: String,
    logo_image_key:String
  },
  { timestamps: true }
);

module.exports = mongoose.model("footerSettings", footerSchema);
