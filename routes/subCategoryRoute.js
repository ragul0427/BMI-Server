const express = require("express");
const router = express.Router();
const {
  createSubCategory,
  getSubCategory,
  updateSubCategory,
  deleteSubCategory,
} = require("../controllers/subCategoryController");
const upload = require("../helper/upload");

router
  .post("/createsubcategory", upload.single("file"), createSubCategory)
  .get("/getsubcategory", getSubCategory)
  .put("/updatesubcategory/:id", updateSubCategory)
  .delete("/deletesubcategory/:id", deleteSubCategory);

module.exports = router;
