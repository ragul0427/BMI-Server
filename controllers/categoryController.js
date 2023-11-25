const { isEmpty } = require("lodash");
const category = require("../modals/categoryModal");
const subCategory = require("../modals/subCategoryModal");
const Product = require("../modals/productModal");

const createCategory = async (req, res) => {
  try {
    const result = await category.create({ ...req.body.formData });
    return res.status(200).send({ data: result });
  } catch (err) {
    return res
      .status(500)
      .send("Something went wrong while creating inventory");
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
    const result = await category.find({status:true});
    return res.status(200).send({ data: result });
  } catch (e) {
    return res.status(500).send("Something went wrong while deleting category");
  }
};

const getAllCusinessFilter = async (req, res) => {
  try {
    const result = await category.find({status:true});
    const subcategory = await subCategory.find({ categoryId: req.params.id,status:true });
    let resultData = { categoryData: result, subCategoryData: subcategory };
    return res.status(200).send({ data: resultData });
  } catch (e) {
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
