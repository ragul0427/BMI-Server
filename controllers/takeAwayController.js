const takeAway=require("../modals/takeAwayModal")


const createTakeAwayOrder=async(req,res)=>{
    try {
        const result = await takeAway.create({ ...req.body });
        return res.status(200).send({ data: result });
      } catch (err) {
        return res.status(500).send("Something went wrong while creating takeAway order");
      }
}
const getTakeAwayOrder=async(req,res)=>{
    try {
        const result = await takeAway.find({});
        return res.status(200).send({ data: result });
      } catch (err) {
        return res.status(500).send("Something went wrong while fetching takeAway order");
      }
}
const updateTakeAwayOrder=async(req,res)=>{
    const { id } = req.params;
    try {
      const result = await takeAway.findByIdAndUpdate(id, { ...req.body });
      return res.status(200).send({ data: result });
    } catch (e) {
      return res.status(500).send("Something went wrong while updating takeAway order");
    }
}


module.exports={createTakeAwayOrder,getTakeAwayOrder,updateTakeAwayOrder}
