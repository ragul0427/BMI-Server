const fs = require("fs");
const { v4: uuidv4 } = require("uuid");
const s3 = require("./s3config");

const uploadToCloud = (req) => {
  try {
    const file = req.file;
    const params = {
      Bucket: process.env.AWS_BUCKET,
      Key: uuidv4() + file.originalname,
      ACL: "public-read",
      Body: fs.createReadStream(file.path),
    };
    return params;
  } catch (err) {
    console.log(err);
  }
};

const deleteFileInLocal = (file) => {
  try {
    fs.unlinkSync(file.path);
  } catch (err) {
    return err;
  }
};

const deleteFileInCloud = (key) => {
  try {
    const params = {
      Bucket: process.env.AWS_BUCKET,
      Key: key,
    };
    s3.deleteObject(params, (err, data) => {
      if (err) {
        return err;
      }
    });
  } catch (err) {
    return err;
  }
};

module.exports = { uploadToCloud, deleteFileInLocal, deleteFileInCloud };
