const inventory=require("../modals/inventoryModal")

const createInventory=async(req,res)=>{
    try {
        const result = await inventory.create({ ...req.body.formData });
        return res.status(200).send({ data: result });
      } catch (err) {
        return res.status(500).send("Something went wrong while creating inventory");
      }
}
const getInventory=async(req,res)=>{
    try {
        const result = await inventory.find({});
        return res.status(200).send({ data: result });
      } catch (e) {
        return res.status(500).send("Something went wrong while fetching inventory");
      }
}
const updateInventory=async(req,res)=>{
    const { id } = req.params;
    try {
      const result = await inventory.findByIdAndUpdate(id, { ...req.body });
      return res.status(200).send({ data: result });
    } catch (e) {
      return res.status(500).send("Something went wrong while updating inventory");
    }
}
const deleteInventory=async(req,res)=>{
  try {
    const { id } = req.params;
      await inventory.findByIdAndDelete(id);
      return res.status(200).send("Category deleted");    
  } catch (e) {
    return res.status(500).send("Something went wrong while deleting inventory");
  }
}


module.exports={createInventory,getInventory,deleteInventory,updateInventory}