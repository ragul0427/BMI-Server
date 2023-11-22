const express = require("express");
const router = express.Router();
const {
  createVideo,
  getVideo,
  updateVideo,
  deleteVideo,
} = require("../controllers/videoController");

router
  .post("/createvideo", createVideo)
  .get("/getvideo", getVideo)
  .put("/updatevideo/:id", updateVideo)
  .delete("/deletevideo/:id", deleteVideo);

module.exports = router;
