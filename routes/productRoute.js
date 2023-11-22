const express = require("express");
const router = express.Router();
const {
  createProduct,getProduct,deleteProduct,updateProduct
} = require("../controllers/productController");

router
  .post("/createproduct", createProduct)
  .get("/getproduct", getProduct)
  .put("/updateproduct/:id", updateProduct)
  .delete("/deleteproduct/:id", deleteProduct);

module.exports = router;
