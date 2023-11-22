const express = require("express");
const router = express.Router();
const {
  createTable,getTable,updateTable,deleteTable
} = require("../controllers/tablecontroller");

router
  .post("/createtable", createTable)
  .get("/gettable", getTable)
  .put("/updatetable/:id", updateTable)
  .delete("/deletetable/:id", deleteTable);

module.exports = router;
