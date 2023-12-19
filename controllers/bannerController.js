const banner = require("../modals/bannerModal");
const _ = require("lodash");
const { uploadToCloud, deleteFileInLocal } = require("../helper/uploadToS3");
const s3 = require("../helper/s3config");
const fs = require("fs");

const createbanner = async (req, res) => {
  try {
    const result = uploadToCloud(req, 2);
    req.body.image = await Promise.all(
      result.map(async (res) => {
        let data = await s3.upload(res).promise();
        return {
          url: data.Location,
          key: data.Key,
        };
      })
    );
   
    deleteFileInLocal(req, 2);
    const write = await banner.create(req.body);
    return res.status(200).send({ data: write });
  } catch (err) {
    console.log(err);
    return res.status(500).send("Something went wrong while creating banner");
  }
};

const getbanner = async (req, res) => {
  try {
    const { search } = req.query;
    if (!search) {
      const result = await banner.find({});
      return res.status(200).send({ data: result });
    } else {
      const result = await banner.find({ name: search });
      return res.status(200).send({ data: result });
    }
  } catch (e) {
    return res.status(500).send("Something went wrong while fetching banner");
  }
};

const updatebanner = async (req, res) => {
  const { id } = req.params;

  try {
    const result = uploadToCloud(req, 2);
    const r = await Promise.all(
      result.map(async (res) => {
        let data = await s3.upload(res).promise();
        return {
          url: data.Location,
          key: data.Key,
        };
      })
    );
    deleteFileInLocal(req, 2);

    if (_.get(req, "body.rest", false)) {
      req.body.image = [...r, ...JSON.parse(req.body.rest)];
    } else {
      req.body.image = [...r];
    }
 console.log(req.body);
    const output = await banner.findByIdAndUpdate(id, req.body);
    return res.status(200).send({ data: output });
  } catch (e) {
    console.log(e)
    return res.status(500).send("Something went wrong while updating banner");
  }
};

const deletebanner = async (req, res) => {
  try {
    const { id } = req.params;
    await banner.findByIdAndDelete(id);
    return res.status(200).send("banner deleted");
  } catch (e) {
    return res.status(500).send("Something went wrong while deleting banner");
  }
};

const getSpecificBanner = async (req, res) => {
  try {
    let { id } = req.params;
    let uniqRef = id.split("_").join(" ");
    const result = await banner.find({ name: uniqRef });
    return res.status(200).send({ data: result });
  } catch (err) {
    console.log(err);
    return res.status(500).send("Something went wrong");
  }
};

const updateAdvertisementBanner = async (req, res) => {
  try {
    let { id } = req.body;
    let formData = {
      userId: _.get(req, "body.userDetails._id", ""),
      phoneNumber: _.get(req, "body.userDetails.phoneNumber", ""),
      userName: _.get(req, "body.userDetails.user", ""),
    };

    const result = await banner.findByIdAndUpdate(
      { _id: id },
      {
        $inc: { count: 1 },
        $push: {
          userDetails: formData,
        },
      }
    );
    return res.status(200).send({ data: result });
  } catch (e) {
    return res.status(500).send("Something went wrong ");
  }
};

module.exports = {
  createbanner,
  deletebanner,
  getbanner,
  updatebanner,
  getSpecificBanner,
  updateAdvertisementBanner,
};
