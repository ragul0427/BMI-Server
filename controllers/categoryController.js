const { isEmpty, get } = require("lodash");
const category = require("../modals/categoryModal");
const subCategory = require("../modals/subCategoryModal");
const fs = require("fs");
const Product = require("../modals/productModal");
const { uploadToCloud } = require("../helper/uploadToS3");
const s3 = require("../helper/s3config");

const createCategory = async (req, res) => {
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
      await category.create({
        name: req.body.name,
        status: req.body.status,
        image: data.Location,
      });
      return res.status(200).send({ url: data.Location });
    });
    console.log(req.body, "lwdkwo");
  } catch (err) {
    return res.status(500).send("Something went wrong while creating category");
  }
};

const getCategory = async (req, res) => {
  try {
    const result = await category.find({});
    return res.status(200).send({ data: result });
  } catch (e) {
    return res.status(500).send("Something went wrong while fetching category");
  }
};

const updateCategory = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await category.findByIdAndUpdate(id, { ...req.body });
    return res.status(200).send({ data: result });
  } catch (e) {
    return res.status(500).send("Something went wrong while updating category");
  }
};

const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    await category.findByIdAndDelete(id);
    return res.status(200).send("Category deleted");
  } catch (e) {
    return res.status(500).send("Something went wrong while deleting category");
  }
};

// web
const getAllCusines = async (req, res) => {
  try {
    let { search } = JSON.parse(req.params.id);
    let where = { status: true };

    if (search) {
      where.name = { $regex: search, $options: "i" };
    }
    console.log(JSON.parse(req.params.id), where);
    const result = await category.find(where);
    return res.status(200).send({ data: result });
  } catch (e) {
    return res.status(500).send("Something went wrong while deleting category");
  }
};

const getAllCusinessFilter = async (req, res) => {
  try {
    const result = await category.find({ status: true });
    let target_id;
    if (req.params.id === "empty") {
      target_id = get(result, "[0]._id", "");
    } else {
      target_id = req.params.id;
    }
    const subcategory = await subCategory.find({
      categoryId: target_id,
      status: true,
    });
    let resultData = { categoryData: result, subCategoryData: subcategory };
    return res.status(200).send({ data: resultData });
  } catch (err) {
    console.log(err);
    return res.status(500).send("Something went wrong while deleting category");
  }
};

const getFilteredProducts = async (req, res) => {
  try {
    let { cat, subCat } = JSON.parse(req.params.id);
    let where = {};

    if (cat !== "" && subCat !== "") {
      where.categoryId = cat;
      where.subCategoryId = subCat;
      where.status = true;
    } else if (cat !== "") {
      where.categoryId = cat;
      where.status = true;
    }

    const productData = await Product.find(where);
    return res.status(200).send({ data: productData });
  } catch (e) {
    return res.status(500).send("Something went wrong while deleting category");
  }
};

module.exports = {
  createCategory,
  getCategory,
  updateCategory,
  deleteCategory,
  getAllCusines,
  getAllCusinessFilter,
  getFilteredProducts,
};
