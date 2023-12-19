const subCategory = require("../modals/subCategoryModal");
const {
  uploadToCloud,
  deleteFileInCloud,
  deleteFileInLocal,
} = require("../helper/uploadToS3");
const s3 = require("../helper/s3config");
const fs = require("fs");
const { get } = require("lodash");

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
        name:get(req.body, 'name', ''),
        status:get(req.body, 'status', ''),
        categoryName:get(req.body, 'categoryName', ''),
        categoryId:get(req.body, 'categoryId', ''),
        image:get(data, 'Location', ''),
        subcategory_image_key:get(data, 'key', ''),
      });
      return res.status(200).send({ url: data.Location });
    });
  } catch (err) {
    return res
      .status(500)
      .send("Something went wrong while creating subcategory");
  }
};

const getSubCategory = async (req, res) => {
  try {
    const result = await subCategory.find({});
    return res.status(200).send({ data: result });
  } catch (e) {
    return res
      .status(500)
      .send("Something went wrong while fetching subcategory");
  }
};



const updateSubCategory = async (req, res) => {
  const { id } = req.params;
  try {
    if (get(req, "file", false)) {
      console.log("true", id, req.body);
      const result = uploadToCloud(req);
      s3.upload(result, async (err, data) => {
        const file = req.file;
        if (err) {
          return res.status(500).send(err);
        }
        deleteFileInLocal(file);
        console.log(data.Location);
        await subCategory.findByIdAndUpdate(id, {
          name: get(req.body, "name", ""),
          status: get(req.body, "status", ""),
          categoryName: get(req.body, "categoryName", ""),
          categoryId: get(req.body, "categoryId", ""),
          image: data.Location,
          subcategory_image_key: data.key,
        });
        deleteFileInCloud(get(req, "image_key"));
        return res.status(200).send({ Message: "data updated successfully" });
      });
    } else {
      console.log("false");
      await subCategory.findByIdAndUpdate(id, {
        name: get(req, "body.name", ""),
        status: get(req, "body.status", ""),
        image: get(req, "body.image_key", ""),
      });
      return res.status(200).send({ Message: "created successfully" });
    }
  } catch (e) {
    return res.status(500).send("Something went wrong while updating category");
  }
};

const deleteSubCategory = async (req, res) => {
  try {
    const { id } = req.params;
    await subCategory.findByIdAndDelete(id);
    deleteFileInCloud(get(req.body, "image"));
    return res.status(200).send("SubCategory deleted");
  } catch (e) {
    return res
      .status(500)
      .send("Something went wrong while deleting subcategory");
  }
};

module.exports = {
  createSubCategory,
  deleteSubCategory,
  getSubCategory,
  updateSubCategory,
};
