const express = require("express");
const router = express.Router();
const {
  createbanner,deletebanner,getbanner,updatebanner
} = require("../controllers/bannerController");

router
  .post("/createbanner", createbanner)
  .get("/getbanner", getbanner)
  .put("/updatebanner/:id", updatebanner)
  .delete("/deletebanner/:id", deletebanner);

module.exports = router;
