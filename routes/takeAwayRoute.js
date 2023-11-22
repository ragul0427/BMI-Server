const express = require("express");
const router = express.Router();
const {
 createTakeAwayOrder,getTakeAwayOrder,updateTakeAwayOrder
} = require("../controllers/takeAwayController");

router
  .post("/createtakeaway", createTakeAwayOrder)
  .get("/gettakeaway", getTakeAwayOrder)
  .put("/updatetakeaway/:id", updateTakeAwayOrder)
 

module.exports = router;
