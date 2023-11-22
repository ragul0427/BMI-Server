const express = require("express");
const router = express.Router();
const {
  createSubCategory,
  getSubCategory,
  updateSubCategory,
  deleteSubCategory,
} = require("../controllers/subCategoryController");

router
  .post("/createsubcategory", createSubCategory)
  .get("/getsubcategory", getSubCategory)
  .put("/updatesubcategory/:id", updateSubCategory)
  .delete("/deletesubcategory/:id", deleteSubCategory);

module.exports = router;
