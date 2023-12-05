const Scratch = require("../modals/scratchCard.modal");
const _ = require("lodash");

const createScratch = async (req, res) => {
  try {
    const { number } = req.body;
    const isNumber = await Scratch.find({ number });

    if (isNumber.length !== 0) {
      return res.status(404).send({ data: "This number already exists..." });
    } else {
      const result = await Scratch.create({ ...req.body });
      return res.status(200).send({ data: result });
    }
  } catch (err) {
    return res.status(500).send("Something went wrong while creating video");
  }
};

const getScratch = async (req, res) => {
  try {
    const { search } = req.query;
    

    if (search === "all") {
      const result = await Scratch.find({});
      return res.status(200).send({ data: result });
    } else if (search === "expired" || search === "notexpired") {
      const result = await Scratch.find({
        expired: search === "expired" ? true : false,
      });
      return res.status(200).send({ data: result });
    } else if (search === "winner" || search === "notwinner") {
      const result = await Scratch.find({
        status: search === "winner" ? true : false,
      });
      return res.status(200).send({ data: result });
    }
  } catch (e) {
    return res.status(500).send("Something went wrong while fetching video");
  }
};

const checkScrachCardDetails = async (req, res) => {
  try {
    console.log(_.get(req, "body.card_number", ""));

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

    if (_.get(validate, "[0].status", false)) {
      let formdata = {
        order_id: _.get(req, "body.order_id", ""),
        contact_number: _.get(req, "body.contact_number", ""),
        userId: _.get(req, "body.userDetails._id", ""),
        expired: true,
      };
      await Scratch.findByIdAndUpdate(
        { _id: _.get(validate, "[0]._id", false) },
        formdata
      );
      return res.status(200).send({ data: "success" });
    } else {
      let formdata = {
        order_id: _.get(req, "body.order_id", ""),
        contact_number: _.get(req, "body.contact_number", ""),
        userId: _.get(req, "body.userDetails._id", ""),
        expired: true,
      };
      await Scratch.findByIdAndUpdate(
        { _id: _.get(validate, "[0]._id", false) },
        formdata
      );
      return res.status(200).send({ data: "failed" });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).send("Something went wrong while fetching video");
  }
};

const checkMyContestDetails = async (req, res) => {
  try {
    const result = await Scratch.find({
      userId: _.get(req, "body.userDetails._id", ""),
    }).sort({ createdAt: -1 });
    return res.status(200).send({ data: result });
  } catch (e) {
    return res.status(500).send("Something went wrong while fetching video");
  }
};

module.exports = {
  createScratch,
  getScratch,
  checkScrachCardDetails,
  checkMyContestDetails,
};
