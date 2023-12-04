const express = require("express");
const router = express.Router();
const {
    createScratch,getScratch
} = require("../controllers/scratchController");

router
  .post("/createscratch", createScratch)
  .get("/getscratch", getScratch)
  
module.exports = router;
