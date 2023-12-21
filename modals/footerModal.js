const mongoose = require("mongoose");

const footerSchema = mongoose.Schema(
  {
    socialMediaSettings: [
      {
        status: Boolean,
        link: String,
        image: String,
        footer_image_key: String,
      },
    ],
    logo: {
      type: String,
    },
    contactNumber: {
      type: Number,
    },
    address: {
      type: Number,
    },
    email: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("footerSettings", footerSchema);
