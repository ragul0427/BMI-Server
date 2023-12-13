const fs = require("fs");
const _ = require("lodash");
const s3 = require("./s3config");

const uploadToCloud = (req) => {
  const file = req.file;
  const params = {
    Bucket: process.env.AWS_BUCKET,
    Key: file.originalname,
    ACL: "public-read",
    Body: fs.createReadStream(file.path),
  };

  return params;
};

module.exports = { uploadToCloud: uploadToCloud };
