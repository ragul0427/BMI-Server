const mongoose = require("mongoose");

const bannerSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    image: [
      {
        url: String,
        key: String,
      },
    ],
    productId: String,
    content: String,
    count: {
      type: Number,
      default: 0,
    },
    userDetails: {
      userId: String,
      phoneNumber: String,
      userName: String,
      refDate: {
        type: Date,
        default: Date.now(),
      },
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("banner", bannerSchema);
