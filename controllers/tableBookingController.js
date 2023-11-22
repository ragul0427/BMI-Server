const tableBooking=require("../modals/tableBookingModal")

const createTableBooking=async(req,res)=>{
    try {
        const result = await tableBooking.create({ ...req.body });
        return res.status(200).send({ data: result });
      } catch (err) {
        return res.status(500).send("Something went wrong while creating table booking");
      }
}
const getTableBooking=async(req,res)=>{
    try {
        const result = await tableBooking.find({});
        return res.status(200).send({ data: result });
      } catch (e) {
        return res.status(500).send("Something went wrong while fetching tableBooking");
      }
}
const updateTableBooking=async(req,res)=>{
    try {
        const { id } = req.params;
    
        const result = await tableBooking.findByIdAndUpdate(id, { ...req.body });
        return res.status(200).send({ data: result });
      } catch (err) {
        return res.status(500).send("Something went wrong while updating tableBooking");
      }
}

module.exports={createTableBooking,getTableBooking,updateTableBooking}