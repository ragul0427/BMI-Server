const express = require("express");
const router = express.Router();
const upload = require("../helper/upload");
const {
  createCategory,
  getCategory,
  updateCategory,
  deleteCategory,
  getAllCusines,
  getAllCusinessFilter,
  getFilteredProducts,
} = require("../controllers/categoryController");

router
  .post(
    "/createcategory",
    upload.single("file"),
    createCategory
  )
  .get("/getcategory", getCategory)
  .put("/updatecategory/:id",upload.single("file"), updateCategory)
  .delete("/deletecategory/:id", deleteCategory);

// web
router.get("/get_all_cusiness_data/:id", getAllCusines);
router.get("/get_all_cusiness_filter/:id", getAllCusinessFilter);
router.get("/get_filtered_products/:id", getFilteredProducts);

module.exports = router;
