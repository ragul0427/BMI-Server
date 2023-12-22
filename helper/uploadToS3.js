const fs = require("fs");
const { v4: uuidv4 } = require("uuid");
const s3 = require("./s3config");
const _ = require("lodash");

const uploadToCloud = (req,folderName, value = 1) => {
  try {
    let params;
    if (value === 2) {
      params = _.get(req, "files", []).map((res) => {
        return {
          Bucket: process.env.AWS_BUCKET,
          Key: `${folderName}/${uuidv4() + res.originalname}`,
          ACL: "public-read",
          Body: fs.createReadStream(res.path),
        };
      });
    } else {
      const file = req.file;
      params = {
        Bucket: process.env.AWS_BUCKET,
        Key: `${folderName}/${uuidv4() + file.originalname}`,
        ACL: "public-read",
        Body: fs.createReadStream(file.path),
      };
    }

    return params;
  } catch (err) {
    console.log(err);
  }
};

const deleteFileInLocal = (file, value = 1) => {
  try {
    if (value === 2) {
      console.log("enter")
      _.get(file, "files", []).map((res) => {
        fs.unlinkSync(res.path);
      });
    } else {
      fs.unlinkSync(file.path);
    }
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
