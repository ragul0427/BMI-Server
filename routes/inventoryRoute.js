const express = require("express");
const router = express.Router();
const {
  createInventory,getInventory,deleteInventory,updateInventory
} = require("../controllers/inventoryController");

router
  .post("/createinventory", createInventory)
  .get("/getinventory", getInventory)
  .put("/updateinventory/:id", updateInventory)
  .delete("/deleteinventory/:id", deleteInventory);

module.exports = router;
