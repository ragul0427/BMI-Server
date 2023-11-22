const product = require("../modals/productModal");

const createProduct = async (req, res) => {
  try {
    const result = await product.create({ ...req.body.formData });
    return res.status(200).send({ data: result });
  } catch (err) {
    return res.status(500).send("Something went wrong while creating products");
  }
};

const getProduct = async (req, res) => {
  try {
    const result = await product.find({});
    return res.status(200).send({ data: result });
  } catch (e) {
    return res.status(500).send("Something went wrong while fetching Products");
  }
};

const updateProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await product.findByIdAndUpdate(id, { ...req.body });
    return res.status(200).send({ data: result });
  } catch (e) {
    return res.status(500).send("Something went wrong while updating product");
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    await product.findByIdAndDelete(id);
    return res.status(200).send("Category deleted");
  } catch (e) {
    return res.status(500).send("Something went wrong while delete product");
  }
};

module.exports = {
  createProduct,
  getProduct,
  deleteProduct,
  updateProduct,
};
