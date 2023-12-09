const { getDateAfterDays } = require("../helper/date_helper");
const Scratch = require("../modals/scratchCard.modal");
const _ = require("lodash");

const createScratch = async (req, res) => {
  try {
    console.log(req.body);
    const result = await Scratch.create({ ...req.body });
    return res.status(200).send({ data: result });
  } catch (err) {
    return res.status(500).send("Something went wrong while creating video");
  }
};

const getScratch = async (req, res) => {
  try {
    const result = await Scratch.find({});
    return res.status(200).send({ data: result });
  } catch (e) {
    return res.status(500).send("Something went wrong while fetching video");
  }
};

const checkScrachCardDetails = async (req, res) => {
  try {
    const validate = await Scratch.find({
      number: _.get(req, "body.card_number", ""),
    });

    if (_.isEmpty(validate)) {
      return res
        .status(500)
        .send({ messsage: "The Scratch number your entered is not valid." });
    }

    if (_.get(validate, "[0].expired", false)) {
      return res
        .status(500)
        .send({ messsage: "The scratch card has already been utilized." });
    }

    const ex_date = getDateAfterDays(30);
    let formdata = {
      order_id: _.get(req, "body.order_id", ""),
      contact_number: _.get(req, "body.contact_number", ""),
      userId: _.get(req, "body.userDetails._id", ""),
      expired: true,
      expireDate: ex_date,
    };

    await Scratch.findByIdAndUpdate(
      { _id: _.get(validate, "[0]._id", false) },
      formdata
    );
    let result = _.get(validate, "[0].status", false) ? "success" : "failed";
    return res.status(200).send({ data: result });
  } catch (err) {
    console.log(err);
    return res.status(500).send("Something went wrong");
  }
};

const checkMyContestDetails = async (req, res) => {
  try {
    const result = await Scratch.find({
      userId: _.get(req, "body.userDetails._id", ""),
      status: true,
    }).sort({ expireDate: -1 });
    return res.status(200).send({ data: result });
  } catch (e) {
    return res.status(500).send("Something went wrong ");
  }
};

module.exports = {
  createScratch,
  getScratch,
  checkScrachCardDetails,
  checkMyContestDetails,
};
