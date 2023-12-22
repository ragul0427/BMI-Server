const express = require("express");
const router = express.Router();
const {
  createVideo,
  getVideo,
  updateVideo,
  deleteVideo,
} = require("../controllers/videoController");
const uploaders = require('../utils/uploaders')

const {ImageUploader} = uploaders

router
  .post("/createvideo",ImageUploader.single("file"),createVideo)
  .get("/getvideo", getVideo)
  .put("/updatevideo/:id",ImageUploader.single("file"), updateVideo)
  .delete("/deletevideo/:id", deleteVideo);

module.exports = router;
