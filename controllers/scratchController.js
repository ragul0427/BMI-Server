const Scratch = require("../modals/scratchCard.modal");

const createScratch = async (req, res) => {
  try {
    console.log(req.body)
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

module.exports = {
  createScratch,
  getScratch,
};
