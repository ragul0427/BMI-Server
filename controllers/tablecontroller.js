const Table = require("../modals/table");
const {
  uploadToCloud,
  deleteFileInLocal,
  deleteFileInCloud,
} = require("../helper/uploadToS3");
const s3 = require("../helper/s3config");
const fs = require("fs");
const { isEmpty, get } = require("lodash");

const createTable = async (req, res) => {
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
      await Table.create({
        seatsAvailable: req.body.seatsAvailable,
        tableNo: req.body.tableNo,
        image: data.Location,
        table_image_key:data.key
      });
      return res.status(200).send({ url: data.Location });
    });
    console.log(req.body.tableNo, "enkjek");
  } catch (err) {
    console.log(err, "err");
    return res.status(500).send("Something went wrong while creating table");
  }
};

const getTable = async (req, res) => {
  try {
    const result = await Table.find({}).sort({ tableNo: 1 });
    return res.status(200).send({ data: result });
  } catch (e) {
    return res.status(500).send("Something went wrong while fetching table");
  }
};

const updateTable = async (req, res) => {
  try {
    const {id}=req.params
    console.log(req.file,"file")
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
        await Table.findByIdAndUpdate(id, {
          seatsAvailable: req.body.seatsAvailable,
          tableNo: req.body.tableNo,
          image: data.Location,
          table_image_key: data.key,
        });
        deleteFileInCloud(get(req.body, "image_key"));
        return res.status(200).send({ Message: "data updated successfully" });
      });
    } else {
      console.log("false");
      console.log(req.body)
      await Table.findByIdAndUpdate(id, {
        seatsAvailable: req.body.seatsAvailable,
        tableNo: req.body.tableNo,
        image: req.body.image,
        table_image_key: req.body.image_key,
      });
      return res.status(200).send({ Message: "created successfully" });
    }
  } catch (err) {
    return res.status(500).send("Something went wrong while updating table");
  }
};

const deleteTable = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(req.body.image,"image")
    await Table.findByIdAndDelete(id);
    deleteFileInCloud(get(req.body, "image"));
    return res.status(200).send("table deleted");
  } catch (err) {
    return res.status(500).send("Something went wrong while deleting table");
  }
};

const getAllTables = async (req, res) => {
  try {
    const result = await Table.find({});
    return res.status(200).send({ data: result });
  } catch (err) {
    return res.status(500).send("Something went wrong while deleting table");
  }
};

module.exports = {
  createTable,
  deleteTable,
  getTable,
  updateTable,
  getAllTables,
};
