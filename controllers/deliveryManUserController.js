const User = require("../modals/DeliveryManUser");

const createDeliveryUser = async (req, res) => {
  try {
    const { userName } = req.body;
    const isFindUser = await User.find({ userName });
    console.log(isFindUser, "siisjud");
    if (isFindUser.length !== 0) {
      console.log("true");
      return res.status(500).send({ message: "User already exists" });
    } else {
      const result = await User.create({ ...req.body });
      return res.status(200).send({ message: result });
    }
  } catch (e) {
    console.log(e);
  }
};

const getDeliveryUser = async (req, res) => {
  try {
    const result = await User.find({});
    return res.status(200).send({ data: result });
  } catch (e) {
    return res
      .status(500)
      .send("Something went wrong while fetching delivery users");
  }
};

const updateDeliveryUser = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(req.body,"body")
    const result = await User.findByIdAndUpdate(id, { ...req.body });
    return res.status(200).send({ data: result });
  } catch (e) {
    console.log(e);
  }
};

module.exports = { createDeliveryUser, getDeliveryUser, updateDeliveryUser };
