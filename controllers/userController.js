const User = require("../modals/userModal");
const jwt = require("jsonwebtoken");

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

module.exports = { getUser, getAllUsers };
