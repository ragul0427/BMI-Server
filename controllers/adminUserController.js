const Admin = require("../modals/adminUserModal");
const jwt = require("jsonwebtoken");

const getUser = async (req, res) => {
  try {
    const { name, password } = req.body.values;
    const user = await Admin.findOne({ name });

    if (!user) {
      return res.status(400).send({ message: "User not found" });
    }

    if (user.password !== password) {
      return res.status(400).send({ message: "Incorrect password" });
    }

    const token = jwt.sign(
      { userId: user._id, name: user.name },
      process.env.SECRET_KEY,
      { expiresIn: "10000h" }
    );
    res.status(200).send({ message: token });
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const createUser = async (req, res) => {
  try {
    const result=await Admin.create({ ...req.body });
    return res.status(200).send({ message: result });
  } catch (err) {
    console.log(err);
  }
};

module.exports = { getUser, createUser };
