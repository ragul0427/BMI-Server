const express = require("express");
const router = express.Router();
const {
 createDinningOrder,getDinningOrder,updateDinningOrder
} = require("../controllers/dinningOrderController");

router
  .post("/createdinningorder", createDinningOrder)
  .get("/getdinningorder", getDinningOrder)
  .put("/updatedinningorder/:id", updateDinningOrder)
 

module.exports = router;
