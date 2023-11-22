const banner = require("../modals/bannerModal");

const createbanner = async (req, res) => {
  try {
    const result = await banner.create({ ...req.body.formData });
    return res.status(200).send({ data: result });
  } catch (err) {
    return res.status(500).send("Something went wrong while creating banner");
  }
};
const getbanner = async (req, res) => {
  try {
    const result = await banner.find({});
    return res.status(200).send({ data: result });
  } catch (e) {
    return res.status(500).send("Something went wrong while fetching banner");
  }
};
const updatebanner = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await banner.findByIdAndUpdate(id, { ...req.body });
    return res.status(200).send({ data: result });
  } catch (e) {
    return res.status(500).send("Something went wrong while updating banner");
  }
};
const deletebanner = async (req, res) => {
  try {
    const { id } = req.params;
    await banner.findByIdAndDelete(id);
    return res.status(200).send("Category deleted");
  } catch (e) {
    return res.status(500).send("Something went wrong while deleting banner");
  }
};

module.exports = { createbanner, deletebanner, getbanner, updatebanner };
