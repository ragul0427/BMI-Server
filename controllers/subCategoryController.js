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

    let maximumSubCategory=10;
    const {name}=req.body
    const subCategoryCount=await subCategory.countDocuments({})
    const existingCategory = await subCategory.aggregate([
      {
        $match: {
          name: { $eq: name }
        }
      }
    ]);

    if(existingCategory.length>0){
      return res.status(400).send(`Subcuisine with the name '${name}' already exists .`);
    }

    if (subCategoryCount >= maximumSubCategory) {
      return res.status(400).send(`Your Subcuisine limit reached. Cannot create more banners.`);
    }
    

    const result = uploadToCloud(req);
    s3.upload(result, async (err, data) => {
      const file = req.file;
      if (err) {
        return res.status(500).send(err);
      }
      deleteFileInLocal(file);
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
      console.log(req.body)
      await subCategory.findByIdAndUpdate(id, {
        name: get(req, "body.name", ""),
        status: get(req, "body.status", ""),
        categoryName: get(req.body, "categoryName", ""),
        categoryId: get(req.body, "categoryId", ""),
        image: get(req, "body.image", ""),
        subcategory_image_key: get(req, "body.subcategory_image_key")
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
