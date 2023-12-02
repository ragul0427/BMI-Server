const mongoose = require("mongoose");

const feedbackSchema = mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
    },
    mobileNumber: {
      type: Number,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    ratings: {
      type: String,
      required: true,
    },
    suggestions: {
      type: String,
    },
    options: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("feedback", feedbackSchema);
