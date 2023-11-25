const jwt = require("jsonwebtoken");
const User = require("../modals/userModal");

const webTokenMiddleware = async (req, res, next) => {
  try {
    let reachit = req.headers["aizasycoxsewxv2t64dxca-wl8n8qfq0gzux1as"];
    const result = await User.findOne({ tokenRef: reachit });
    req.body.userDetails = result;
    next();
  } catch (err) {
    console.log(err);
    return res.status(500).send({ message: "Something went wrong" });
  }
};

module.exports = { webTokenMiddleware };
