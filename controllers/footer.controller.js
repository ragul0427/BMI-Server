const Footer = require("../modals/footerModal");
const { uploadToCloud,deleteFileInCloud,deleteFileInLocal } = require("../helper/uploadToS3");
const s3 = require("../helper/s3config");
const fs = require("fs");
const { isEmpty, get } = require("lodash");

const createFooter = async (req, res) => {
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
     
      await Footer.create({
        name: req.body.name,
        status: req.body.status,
        link: req.body.link,
        image: data.Location,
        footer_image_key:data.key
      });
      return res.status(200).send({ url: data.Location });
    });
  } catch (err) {
    console.log(err);
  }
};

const getFooter = async (req, res) => {
  try {
    const result = await Footer.find({});
    return res.status(200).send({ data: result });
  } catch (err) {
    console.log(err);
  }
};

const updateFooter = async (req, res) => {
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
        await Footer.findByIdAndUpdate(id, {
          name: req.body.name,
          status: req.body.status,
          link: req.body.link,
          image: data.Location,
          footer_image_key: data.key,
        });
        deleteFileInCloud(get(req.body, "image_key"));
        return res.status(200).send({ Message: "data updated successfully" });
      });
    } else {
      
      await Footer.findByIdAndUpdate(id, {
        name: get(req, "body.name", ""),
        status: get(req, "body.status", ""),
        image: get(req, "body.image_key", ""),
      });
    }
  } catch (e) {
    return res
      .status(500)
      .send("Something went wrong while updating subcategory");
  }
};

const deleteFooter = async (req, res) => {
  try {
    const { id } = req.params;
    await Footer.findByIdAndDelete(id);
    deleteFileInCloud(get(req,"body.image"))
    return res.status(200).send("SubCategory deleted");
  } catch (e) {
    return res
      .status(500)
      .send("Something went wrong while deleting subcategory");
  }
};

module.exports = { createFooter, getFooter, updateFooter, deleteFooter };
