const feedback = require("../modals/feedbackModal");
const _ = require("lodash");

const createFeedback = async (req, res) => {
  try {
    const result = await feedback.create({ ...req.body });
    return res.status(200).send({ data: result });
  } catch (err) {
    return res.status(500).send("Something went wrong while creating feedback");
  }
};
const getFeedback = async (req, res) => {
  try {
    const result = await feedback.find({});
    return res.status(200).send({ data: result });
  } catch (e) {
    return res.status(500).send("Something went wrong while fetching feedback");
  }
};
const updateFeedback = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await feedback.findByIdAndUpdate(id, { ...req.body });
    return res.status(200).send({ data: result });
  } catch (e) {
    return res.status(500).send("Something went wrong while updating feedback");
  }
};
const deleteFeedback = async (req, res) => {};

const addMyfeedback = async (req, res) => {
  try {
    console.log(req.body);
    const formData = {
      userName: _.get(req, "body.userDetails.user", ""),
      mobileNumber: _.get(req, "body.userDetails.phoneNumber", ""),
      message: _.get(req, "body.feedback", ""),
      ratings: _.get(req, "body.rating", ""),
    };
    const result = await feedback.create(formData);
    return res.status(200).send({ data: result });
  } catch (err) {
    console.log(err);
    return res.status(500).send("Something went wrong while creating feedback");
  }
};

const getMyfeedback = async (req, res) => {
  try {
    const result = await feedback.find({
      mobileNumber: _.get(req, "body.userDetails.phoneNumber", ""),
    });
    console.log(result);
    return res.status(200).send({ data: result });
  } catch (err) {
    console.log(err);
    return res.status(500).send("Something went wrong while creating feedback");
  }
};

const getAllfeedback = async (req, res) => {
  try {
    const result = await feedback.find({ options: "yes" });
    return res.status(200).send({ data: result });
  } catch (e) {
    return res.status(500).send("Something went wrong");
  }
};

module.exports = {
  createFeedback,
  updateFeedback,
  deleteFeedback,
  getFeedback,
  addMyfeedback,
  getMyfeedback,
  getAllfeedback,
};
