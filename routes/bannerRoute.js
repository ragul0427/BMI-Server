const express = require("express");
const router = express.Router();
const {
  createbanner,
  deletebanner,
  getbanner,
  updatebanner,
  getSpecificBanner,
  updateAdvertisementBanner,
} = require("../controllers/bannerController");
const { webTokenMiddleware } = require("../middleWare/webMiddleware");

router
  .post("/createbanner", createbanner)
  .get("/getbanner", getbanner)
  .put("/updatebanner/:id", updatebanner)
  .delete("/deletebanner/:id", deletebanner);

// APK
router.get("/get_specific_banner/:id", getSpecificBanner);
router.put(
  "/update_add_banner_view_count",
  webTokenMiddleware,
  updateAdvertisementBanner
);

module.exports = router;
