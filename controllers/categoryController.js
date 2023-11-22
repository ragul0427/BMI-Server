const { isEmpty } = require("lodash");
const category = require("../modals/categoryModal");
const subCategory=require("../modals/subCategoryModal")

const createCategory = async (req, res) => {
  try {
    const result = await category.create({ ...req.body.formData });
    return res.status(200).send({ data: result });
  } catch (err) {
    return res.status(500).send("Something went wrong while creating inventory");
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

module.exports = {
  createCategory,
  getCategory,
  updateCategory,
  deleteCategory,
};
