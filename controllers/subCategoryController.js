const subCategory = require("../modals/subCategoryModal");

const createSubCategory = async (req, res) => {
  try {
    const result = await subCategory.create({ ...req.body.formData });
    return res.status(200).send({ data: result });
  } catch (err) {
    return res.status(500).send("Something went wrong while creating subcategory");
  }
};
const getSubCategory = async (req, res) => {
 
  try {
    const result = await subCategory.find({});
    return res.status(200).send({ data: result });
  } catch (e) {
    return res.status(500).send("Something went wrong while fetching subcategory");
  }
};
const updateSubCategory = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await subCategory.findByIdAndUpdate(id, { ...req.body });
    return res.status(200).send({ data: result });
  } catch (e) {
    return res.status(500).send("Something went wrong while updating subcategory");
  }
};

const deleteSubCategory = async (req, res) => {
  
  try {
    const { id } = req.params;
    await subCategory.findByIdAndDelete(id);
    return res.status(200).send("SubCategory deleted");
  } catch (e) {
    return res.status(500).send("Something went wrong while deleting subcategory");
  }
};

module.exports = {
  createSubCategory,
  deleteSubCategory,
  getSubCategory,
  updateSubCategory,
};
