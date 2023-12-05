const Scratch = require("../modals/scratchCard.modal");

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
    console.log(search, "ajsn");

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

module.exports = {
  createScratch,
  getScratch,
};
