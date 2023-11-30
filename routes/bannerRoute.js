const express = require("express");
const router = express.Router();
const {
  createbanner,
  deletebanner,
  getbanner,
  updatebanner,
  getSpecificBanner,
} = require("../controllers/bannerController");

router
  .post("/createbanner", createbanner)
  .get("/getbanner", getbanner)
  .put("/updatebanner/:id", updatebanner)
  .delete("/deletebanner/:id", deletebanner);

// APK
router.get("/get_specific_banner/:id", getSpecificBanner);

module.exports = router;
