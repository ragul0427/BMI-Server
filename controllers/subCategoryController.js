const subCategory = require("../modals/subCategoryModal");
const { get } = require("lodash");
const helpers = require("../utils/helpers");
const { v4: uuidv4 } = require("uuid");

const createSubCategory = async (req, res) => {
  try {
    const maximumCount=10
    const {categoryName}=req.body;
    const subCategoryCount=await subCategory.countDocuments({categoryName})

    if (subCategoryCount >= maximumCount) {
      return res.status(400).send(`Your ${categoryName} limit reached. Cannot create more ${categoryName}.`);
    }

    const subCuisinePhto = req.file;
    if (subCuisinePhto) {
      const path = `SubCuisines/${uuidv4()}/${subCuisinePhto.filename}`;
      await helpers.uploadFile(subCuisinePhto, path);
      if (path) {
        await helpers.deleteS3File(path);
      }
      const image=helpers.getS3FileUrl(path)
      helpers.deleteFile(subCuisinePhto);
      await subCategory.create({
        name:get(req.body, 'name', ''),
        status:get(req.body, 'status', ''),
        categoryName:get(req.body, 'categoryName', ''),
        categoryId:get(req.body, 'categoryId', ''),
        image:image,
       
      });
      return res.status(200).send({message:"Subcuisine created successfully"});
     
    }
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
    const imageUrl=req.body.image
    if (get(req, "file", false)) {
      const subCuisinePhto = req.file;
      if (subCuisinePhto) {
        const path = `SubCuisines/${uuidv4()}/${subCuisinePhto.filename}`;
        await helpers.uploadFile(subCuisinePhto, path);
        if (imageUrl) {
          await helpers.deleteS3File(imageUrl);
        }
        const image = helpers.getS3FileUrl(path);
        helpers.deleteFile(subCuisinePhto);
        await subCategory.findByIdAndUpdate(id,{
          name:get(req.body, 'name', ''),
          status:get(req.body, 'status', ''),
          categoryName:get(req.body, 'categoryName', ''),
          categoryId:get(req.body, 'categoryId', ''),
          image:image,
        })  

        return res
          .status(200)
          .send({ message: "Cusines updated successfully" });
      }
    } else {
      await subCategory.findByIdAndUpdate(id, {
        name: get(req, "body.name", ""),
        status: get(req, "body.status", ""),
        categoryName: get(req.body, "categoryName", ""),
        categoryId: get(req.body, "categoryId", ""),
        image: get(req, "body.image", ""),
      });
      return res.status(200).send({ Message: "subcuisine updated successfully" });
    }
  } catch (e) {
    console.log(e)
    return res.status(500).send("Something went wrong while updating category");
  }
};

const deleteSubCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const {image}=req.body
    await subCategory.findByIdAndDelete(id);
    await helpers.deleteS3File(image);
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
