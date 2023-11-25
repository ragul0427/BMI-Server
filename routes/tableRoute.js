const express = require("express");
const router = express.Router();
const {
  createTable,getTable,updateTable,deleteTable,
  getAllTables
} = require("../controllers/tablecontroller");

router
  .post("/createtable", createTable)
  .get("/gettable", getTable)
  .put("/updatetable/:id", updateTable)
  .delete("/deletetable/:id", deleteTable);

// Web
router.get("/get_all_tables", getAllTables)

module.exports = router;
