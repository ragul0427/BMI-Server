const _ = require("lodash");
const User = require("../modals/userModal");
const {
  uploadToCloud,
  deleteFileInLocal,
  deleteFileInCloud,
} = require("../helper/uploadToS3");
const s3 = require("../helper/s3config");

const updateProfile = async (req, res) => {
  try {
    const result = uploadToCloud(req);
    s3.upload(result, async (err, data) => {
      const file = req.file;
      if (err) {
        return res
          .status(500)
          .send({ message: "failed to update user profile" });
      }
      deleteFileInLocal(file);
      await User.findByIdAndUpdate(
        { _id: _.get(req, "body.userDetails._id", "") },
        { user_image: data.Location, user_image_key: data.key }
      );
      deleteFileInCloud(_.get(req, "body.user_image_key", ""));
      return res.status(200).send({ url: data.Location });
    });
  } catch (err) {
    console.log(err);
    return res.status(500).send({ message: "failed to update user profile" });
  }
};

module.exports = { updateProfile };
