const product = require("../modals/productModal");
const Cart = require("../modals/cart.models.js");
const { uploadToCloud } = require("../helper/uploadToS3");
const s3 = require("../helper/s3config");
const fs = require("fs");
const _ = require("lodash");

const createProduct = async (req, res) => {
  try {
    const result = uploadToCloud(req);
    s3.upload(result, async (err, data) => {
      const file = req.file;
      if (err) {
        return res.status(500).send(err);
      }
      fs.unlink(file.path, (unlinkErr) => {
        if (unlinkErr) {
        }
      });
      await product.create({
        name: req.body.name,
        status: req.body.status,
        offer: req.body.offer,
        price: req.body.price,
        categoryName: req.body.categoryName,
        subCategoryName: req.body.subCategoryName,
        categoryId: req.body.categoryId,
        subCategoryId: req.body.subCategoryId,
        image: data.Location,
      });
      return res.status(200).send({ url: data.Location });
    });
  } catch (err) {
    return res.status(500).send("Something went wrong while creating products");
  }
};

const getProduct = async (req, res) => {
  try {
    const result = await product.find({});
    return res.status(200).send({ data: result });
  } catch (e) {
    return res.status(500).send("Something went wrong while fetching Products");
  }
};

const updateProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await product.findByIdAndUpdate(id, { ...req.body });
    return res.status(200).send({ data: result });
  } catch (e) {
    return res.status(500).send("Something went wrong while updating product");
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    await product.findByIdAndDelete(id);
    return res.status(200).send("Category deleted");
  } catch (e) {
    return res.status(500).send("Something went wrong while delete product");
  }
};

const getProductDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await product.find({ _id: id });
    return res.status(200).send({ data: result });
  } catch (e) {
    return res.status(500).send("Something went wrong");
  }
};

const addToCartFromProductDetails = async (req, res) => {
  try {
    let where = {
      userRef: _.get(req, "body.userDetails._id", ""),
      productRef: _.get(req, "body.productRef", ""),
      orderRef: _.get(req, "body.orderRef", ""),
    };
    if (_.get(req, "body.bookingRef", "")) {
      where.bookingRef = _.get(req, "body.bookingRef", "");
    }

    const result = await Cart.find(where);
    if(!_.isEmpty(result)){
      return res.status(200).send({ data: "already exist" });
    }
    const resultcart = await Cart.create(where);
    return res.status(200).send({ data: resultcart });
  } catch (e) {
    return res.status(500).send("Something went wrong");
  }
};

module.exports = {
  createProduct,
  getProduct,
  deleteProduct,
  updateProduct,
  getProductDetails,
  addToCartFromProductDetails,
};
