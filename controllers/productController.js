const product = require("../modals/productModal");
const Cart = require("../modals/cart.models.js");
const {
  uploadToCloud,
  deleteFileInCloud,
  deleteFileInLocal,
} = require("../helper/uploadToS3");
const s3 = require("../helper/s3config");
const fs = require("fs");
const { get } = require("lodash");

const createProduct = async (req, res) => {
  try {
    let maximumCuisines=500
    let totalMenu=7
    const {categoryName}=req.body;
    const {name}=req.body;
    const isCount=await product.countDocuments({categoryName})
    const totalMenuCount=await product.countDocuments({})
    
    const existingMenu = await product.aggregate([
      {
        $match: {
          name: { $eq: name }
        }
      }
    ]);

    if(existingMenu.length>0){
      return res.status(400).send(`Menu with the name '${name}' already exists .`);
    }

    if (isCount >= maximumCuisines) {
      return res.status(400).send(`Your ${categoryName} Menu limit reached. Cannot create more ${categoryName}.`);
    }

    if(totalMenuCount>=totalMenu){
      return res.status(400).send(`Your can't add more than 500 Menu.`);
    }
  

    const result = uploadToCloud(req);
    s3.upload(result, async (err, data) => {
      const file = req.file;
      if (err) {
        return res.status(500).send(err);
      }
      deleteFileInLocal(file);
      await product.create({
        name: req.body.name,
        status: req.body.status,
        discountPrice: req.body.discountPrice,
        offer: req.body.offer,
        price: req.body.price,
        categoryName: req.body.categoryName,
        subCategoryName: req.body.subCategoryName,
        categoryId: req.body.categoryId,
        subCategoryId: req.body.subCategoryId,
        image: data.Location,
        product_image_key: data.key,
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
    console.log(req.file, "file");
    if (get(req, "file", false)) {
      console.log("true", id, req.body);
      const result = uploadToCloud(req);
      s3.upload(result, async (err, data) => {
        const file = req.file;
        if (err) {
          return res.status(500).send(err);
        }
        deleteFileInLocal(file);

        await product.findByIdAndUpdate(id, {
          name: req.body.name,
          status: req.body.status,
          offer: req.body.offer,
          discountPrice: req.body.discountPrice,
          price: req.body.price,
          categoryName: req.body.categoryName,
          subCategoryName: req.body.subCategoryName,
          categoryId: req.body.categoryId,
          subCategoryId: req.body.subCategoryId,
          image: data.Location,
          product_image_key: data.key,
        });
        deleteFileInCloud(get(req.body, "image_key"));
        return res.status(200).send({ Message: "data updated successfully" });
      });
    } else {
      console.log("false");
      await product.findByIdAndUpdate(id, {
        name: req.body.name,
        status: req.body.status,
        offer: req.body.offer,
        price: req.body.price,
        categoryName: req.body.categoryName,
        subCategoryName: req.body.subCategoryName,
        categoryId: req.body.categoryId,
        subCategoryId: req.body.subCategoryId,
        product_image_key: get(req, "body.image_key", ""),
        image: get(req, "body.image", ""),
      });
      return res.status(200).send({ Message: "created successfully" });
    }
  } catch (e) {
    return res.status(500).send("Something went wrong while updating product");
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    await product.findByIdAndDelete(id);
    deleteFileInCloud(get(req.body, "image"));
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
      userRef: get(req, "body.userDetails._id", ""),
      productRef: get(req, "body.productRef", ""),
      orderRef: get(req, "body.orderRef", ""),
    };
    if (get(req, "body.bookingRef", "")) {
      where.bookingRef = get(req, "body.bookingRef", "");
    }

    const result = await Cart.find(where);
    
    if (!isEmpty(result)) {
      return res.status(200).send({ data: "already exist" });
    }

    const resultcart = await Cart.create(where);
    return res.status(200).send({ data: resultcart });
  } catch (e) {
    return res.status(500).send({ message: "Something went wrong" });
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
