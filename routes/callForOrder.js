const express = require("express");
const router = express.Router();
const {
createCallOrder,getCallOrder,updateCallOrder
} = require("../controllers/callForOrderController");

router
  .post("/createcallorder", createCallOrder)
  .get("/getcallorder", getCallOrder)
  .put("/updatecallorder/:id", updateCallOrder)
 

module.exports = router;
