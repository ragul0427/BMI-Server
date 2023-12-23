const footer = require("../modals/footerModal");
const { get } = require("lodash");
const helpers = require("../utils/helpers");

const createFooter = async (req, res) => {
  try {
    const isFooter = await footer.find({});

    if (isFooter.length === 0) {
      console.log("true");
      const logo = req.file;
      if (logo) {
        const path = `Footer/Logo${Date.now()}/${logo.filename}`;

        await helpers.uploadFile(logo, path);
        if (path) {
          await helpers.deleteS3File(path);
        }
        const image = helpers.getS3FileUrl(path);
        helpers.deleteFile(logo);
        await footer.create({
          name: get(req, "body.name"),
          email: get(req, "body.email"),
          contactNumber: get(req, "body.number"),
          address: get(req, "body.address"),
          logo: image,
          colors:get(isFooter,"[0].colors")
          
        });

        return res.status(200).send({ message: "Footer created successfully" });
      }
    } else {
      
      const logo = req.file;
      if (logo) {
        const path = `Footer/Logo${Date.now()}/${logo.filename}`;
        await helpers.uploadFile(logo, path);
        if (path) {
          await helpers.deleteS3File(isFooter[0].logo);
        }
       
        const image = helpers.getS3FileUrl(path);
        helpers.deleteFile(logo);
        await footer.findByIdAndUpdate(isFooter[0]._id, {
          name: get(req, "body.name"),
          email: get(req, "body.email"),
          contactNumber: get(req, "body.number"),
          address: get(req, "body.address"),
          logo: image,
          colors:get(isFooter,"[0].colors")
        });

        return res.status(200).send({ message: "Footer Updated successfully" });
      } else {
        console.log("false",get(req, "body.colors"));
        await footer.findByIdAndUpdate(isFooter[0]._id, {
          name: get(req, "body.name"),
          email: get(req, "body.email"),
          contactNumber: get(req, "body.number"),
          address: get(req, "body.address"),
          logo: isFooter.logo,
          colors: get(req, "body.colors") === undefined
          ? get(isFooter, "[0].colors")
          : get(req, "body.colors"),
          content:get(req,"body.content"),
        });

        return res.status(200).send({ message: "Footer Updated successfully" });
      }
    }
  } catch (err) {
    console.log(err);
  }
};

const getFooter = async (req, res) => {
  try {
    const result = await footer.find({});
    return res.status(200).send({ data: result });
  } catch (err) {
    console.log(err);
  }
};

module.exports = { createFooter, getFooter };
