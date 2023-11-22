const express = require("express");
const router = express.Router();
const {
 createFeedback,deleteFeedback,getFeedback,updateFeedback
} = require("../controllers/feedbackController");

router
  .post("/createfeedback", createFeedback)
  .get("/getfeedback", getFeedback)
  .put("/updatefeedback/:id", updateFeedback)
  .delete("/deletefeedback/:id", deleteFeedback);

module.exports = router;
