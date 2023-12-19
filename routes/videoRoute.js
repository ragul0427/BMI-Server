const express = require("express");
const router = express.Router();
const {
  createVideo,
  getVideo,
  updateVideo,
  deleteVideo,
} = require("../controllers/videoController");
const upload = require("../helper/upload");

router
  .post("/createvideo",upload.single("file"), createVideo)
  .get("/getvideo", getVideo)
  .put("/updatevideo/:id",upload.single("file"), updateVideo)
  .delete("/deletevideo/:id", deleteVideo);

module.exports = router;
