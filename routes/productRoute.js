const express = require("express");
const router = express.Router();
const {
  createProduct,getProduct,deleteProduct,updateProduct
} = require("../controllers/productController");
const upload = require("../helper/upload");
router
  .post("/createproduct",upload.single("file"),createProduct)
  .get("/getproduct", getProduct)
  .put("/updateproduct/:id", updateProduct)
  .delete("/deleteproduct/:id", deleteProduct);

module.exports = router;
