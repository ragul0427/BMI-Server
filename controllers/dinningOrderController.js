const dinning = require("../modals/dinningOrder");

const createDinningOrder = async (req, res) => {
  try {
    const result = await dinning.create({ ...req.body });
    return res.status(200).send({ data: result });
  } catch (err) {
    return res
      .status(500)
      .send("Something went wrong while creating dinning order");
  }
};
const getDinningOrder = async (req, res) => {
  try {
    const result = await dinning.find({});
    return res.status(200).send({ data: result });
  } catch (err) {
    return res
      .status(500)
      .send("Something went wrong while fetching dinning order");
  }
};

const updateDinningOrder = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await dinning.findByIdAndUpdate(id, { ...req.body });
    return res.status(200).send({ data: result });
  } catch (e) {
    return res
      .status(500)
      .send("Something went wrong while updating dinning order");
  }
};

module.exports = {
  createDinningOrder,
  getDinningOrder,
  updateDinningOrder,
};
