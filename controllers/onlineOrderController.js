const onlineOrder = require("../modals/onlineOrderModal");

const createOnlineOrder = async (req, res) => {
  try {
    const result = await onlineOrder.create({ ...req.body });
    return res.status(200).send({ data: result });
  } catch (err) {
    return res
      .status(500)
      .send("Something went wrong while creating online order");
  }
};
const getOnlineOrder = async (req, res) => {
  try {
    const result = await onlineOrder.find({}).sort({ createdAt: -1 });
    return res.status(200).send({ data: result });
  } catch (err) {
    return res
      .status(500)
      .send("Something went wrong while fetching online order");
  }
};
const updateOnlineOrder = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await onlineOrder.findByIdAndUpdate(id, { ...req.body });
    return res.status(200).send({ data: result });
  } catch (e) {
    return res
      .status(500)
      .send("Something went wrong while updating online order");
  }
};

const deleteOnlineOrder = async (req, res) => {};

module.exports = {
  createOnlineOrder,
  getOnlineOrder,
  deleteOnlineOrder,
  updateOnlineOrder,
};
