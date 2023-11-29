const User = require("../modals/userModal");
const jwt = require("jsonwebtoken");
const _ = require("lodash");

const getUser = async (req, res) => {
  try {
    const { phoneNumber } = req.body;
    const user = await User.findOne({ phoneNumber });

    if (!user) {
      const createUser = await User.create({ ...req.body });
      const token = jwt.sign(
        {
          userId: createUser._id,
          name: createUser.user,
          email: createUser.email,
        },
        process.env.SECRET_KEY,
        { expiresIn: "10000h" }
      );
      res.status(200).send({ message: token });
    }

    const token = jwt.sign(
      { userId: user._id, name: user.user, email: user.email },
      process.env.SECRET_KEY,
      { expiresIn: "10000h" }
    );
    res.status(200).send({ message: token });
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({});
    return res.status(200).send({ message: users });
  } catch (err) {
    console.log(err);
  }
};

// web
const careteSignUp = async (req, res) => {
  try {
    const result = await User.find({ phoneNumber: req.body.phoneNumber });
    if (!_.isEmpty(result)) {
      return res
        .status(500)
        .send({ message: "This phone number has already been used." });
    }
    await User.create(req.body);
    return res.status(200).send({ message: "success" });
  } catch (err) {
    console.log(err);
    return res.status(500).send({ message: "Something went wrong" });
  }
};

const getOneUserdata = async (req, res) => {
  try {
    const result = await User.find({ phoneNumber: `${req.params.number}` });

    return res.status(200).send({ data: result });
  } catch (err) {
    console.log(err);
    return res.status(500).send({ message: "Something went wrong" });
  }
};

const makeUserToken = async (req, res) => {
  try {
    const result = await User.find({ phoneNumber: `${req.body.number}` });
    let tokenConstraints = {
      id: _.get(result, "[0]._id", ""),
    };
    const token = jwt.sign(tokenConstraints, process.env.SECRET_KEY, {});
    await User.findByIdAndUpdate(
      { _id: _.get(result, "[0]._id", "") },
      { tokenRef: token }
    );
    res.status(200).send({ data: token, message: "Start Your Journey" });
  } catch (err) {
    console.log(err);
    return res.status(500).send({ message: "Something went wrong" });
  }
};

const checkTokenStatus = async (req, res) => {
  try {

    let clientdata = {
      username: _.get(req, "body.userDetails.user", ""),
      phonenumber: _.get(req, "body.userDetails.phoneNumber", ""),
    };
 
    return res.status(200).send({ data: clientdata });
  } catch (err) {
    console.log(err);
    return res.status(500).send({ message: "Something went wrong" });
  }
};

const makeLogoutUser = async (req, res) => {
  try {
    await User.findByIdAndUpdate(
      { _id: _.get(req, "body.userDetails._id", "") },
      { tokenRef: "" }
    );
    return res.status(200).send({ message: "success" });
  } catch (err) {
    console.log(err);
    return res.status(500).send({ message: "Something went wrong" });
  }
};

module.exports = {
  getUser,
  getAllUsers,
  careteSignUp,
  getOneUserdata,
  makeUserToken,
  checkTokenStatus,
  makeLogoutUser,
};
