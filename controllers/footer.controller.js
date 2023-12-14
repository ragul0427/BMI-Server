const Footer = require("../modals/footerModal");
const createFooter = async (req, res) => {
  try {
    const isFooter = await Footer.find({});
    const {id}=req.query
    if (isFooter.length > 0) {
        const result = await Footer.findByIdAndUpdate(id, { ...req.body });
        return res.status(200).send({ data: result });
    } else {
      const result = await Footer.create({ ...req.body });
      return res.status(200).send({ data: result });
    }
  } catch (err) {
    console.log(err);
  }
};

const getFooter = async (req, res) => {
  try {
    const result = await Footer.find({});
    return res.status(200).send({ data: result });
  } catch (err) {
    console.log(err);
  }
};

module.exports = { createFooter, getFooter };
