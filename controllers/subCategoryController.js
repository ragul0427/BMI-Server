const subCategory = require("../modals/subCategoryModal");
const { uploadToCloud } = require("../helper/uploadToS3");
const s3 = require("../helper/s3config");
const fs = require("fs");

const createSubCategory = async (req, res) => {
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
      await subCategory.create({
        name: req.body.name,
        status: req.body.status,
        categoryName:req.body.categoryName,
        categoryId:req.body.categoryId,
        image: data.Location,
        
      });
      return res.status(200).send({ url: data.Location });
    });
    
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
