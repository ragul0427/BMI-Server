const express = require("express");
const router = express.Router();
const {
  createCategory,
  getCategory,
  updateCategory,
  deleteCategory,
} = require("../controllers/categoryController");

router
  .post("/createcategory", createCategory)
  .get("/getcategory", getCategory)
  .put("/updatecategory/:id", updateCategory)
  .delete("/deletecategory/:id", deleteCategory);

module.exports = router;
