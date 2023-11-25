const Table = require("../modals/table");

const createTable = async (req, res) => {
  try {
    const result = await Table.create({ ...req.body.formData });
    return res.status(200).send({ data: result });
  } catch (err) {
    return res.status(500).send("Something went wrong while creating table");
  }
};

const getTable = async (req, res) => {
  try {
    const result = await Table.find({}).sort({ tableNo: 1 });
    return res.status(200).send({ data: result });
  } catch (e) {
    return res.status(500).send("Something went wrong while fetching table");
  }
};

const updateTable = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await Table.findByIdAndUpdate(id, { ...req.body });
    return res.status(200).send({ data: result });
  } catch (err) {
    return res.status(500).send("Something went wrong while updating table");
  }
};

const deleteTable = async (req, res) => {
  try {
    const { id } = req.params;
    await Table.findByIdAndDelete(id);
    return res.status(200).send("table deleted");
  } catch (err) {
    return res.status(500).send("Something went wrong while deleting table");
  }
};

const getAllTables = async (req, res) => {
  try {
    const result = await Table.find({});
    return res.status(200).send({ data: result });
  } catch (err) {
    return res.status(500).send("Something went wrong while deleting table");
  }
};

module.exports = {
  createTable,
  deleteTable,
  getTable,
  updateTable,
  getAllTables,
};
