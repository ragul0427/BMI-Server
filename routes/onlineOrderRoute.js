const express = require("express");
const router = express.Router();
const {
  createOnlineOrder,getOnlineOrder,updateOnlineOrder,deleteOnlineOrder
} = require("../controllers/onlineOrderController");

router
  .post("/createonlineOrder", createOnlineOrder)
  .get("/getonlineorder", getOnlineOrder)
  .put("/updateonlineorder/:id", updateOnlineOrder)
  .delete("/deleteonlineorder/:id", deleteOnlineOrder);

module.exports = router;
