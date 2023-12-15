const _ = require("lodash");
const fs = require("fs");
const User = require("../modals/userModal");
const { uploadToCloud } = require("../helper/uploadToS3");
const s3 = require("../helper/s3config");

const moveToCloud = async (req, res) => {
  try {
    const result = uploadToCloud(req);
    s3.upload(result, async (err, data) => {
      const file = req.file;
      if (err) {
        return res.status(500).send(err);
      }
      fs.unlink(file.path, (unlinkErr) => {
        if (unlinkErr) {
        }
      });
      await User.findByIdAndUpdate(
        { _id: _.get(req, "body.userDetails._id", "") },
        { user_image: data.Location }
      );
      return res.status(200).send({ url: data.Location });
    });
  } catch (err) {
    console.log(err);
    return res.status(500).send({ message: "failed to update user profile" });
  }
};

module.exports = { moveToCloud };
