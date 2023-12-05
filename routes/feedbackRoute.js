const express = require("express");
const router = express.Router();
const {
  createFeedback,
  deleteFeedback,
  getFeedback,
  updateFeedback,
  addMyfeedback,
  getMyfeedback,
  getAllfeedback
} = require("../controllers/feedbackController");
const { webTokenMiddleware } = require("../middleWare/webMiddleware");

router
  .post("/createfeedback", createFeedback)
  .get("/getfeedback", getFeedback)
  .put("/updatefeedback/:id", updateFeedback)
  .delete("/deletefeedback/:id", deleteFeedback);

// Web
router.post("/add_my_feedback", webTokenMiddleware, addMyfeedback);
router.post("/get_my_feedback", webTokenMiddleware, getMyfeedback);
router.get("/get_all_feedback",  getAllfeedback);

module.exports = router;
