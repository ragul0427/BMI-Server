const express = require("express");
const router = express.Router();
const {
  createStatus,getStatus
} = require("../controllers/restaturantStatusController");
const upload = require("../helper/upload");

router
  .post("/create_status", upload.single("file"), createStatus)
  .get("/get_status", getStatus)
  

module.exports = router;
