const banner = require("../modals/bannerModal");
const _ = require("lodash");

const createbanner = async (req, res) => {
  try {
    const result = await banner.create({ ...req.body.formData });
    return res.status(200).send({ data: result });
  } catch (err) {
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
    const result = await banner.findByIdAndUpdate(id, { ...req.body });
    return res.status(200).send({ data: result });
  } catch (e) {
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
