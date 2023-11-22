const feedback=require("../modals/feedbackModal")

const createFeedback=async(req,res)=>{
    try {
        const result = await feedback.create({ ...req.body });
        return res.status(200).send({ data: result });
      } catch (err) {
        return res.status(500).send("Something went wrong while creating feedback");
      }
}
const getFeedback=async(req,res)=>{
    try {
        const result = await feedback.find({});
        return res.status(200).send({ data: result });
      } catch (e) {
        return res.status(500).send("Something went wrong while fetching feedback");
      }
}
const updateFeedback=async(req,res)=>{
    const { id } = req.params;
    try {
      const result = await feedback.findByIdAndUpdate(id, { ...req.body });
      return res.status(200).send({ data: result });
    } catch (e) {
      return res.status(500).send("Something went wrong while updating feedback");
    }
}
const deleteFeedback=async(req,res)=>{

}

module.exports={createFeedback,updateFeedback,deleteFeedback,getFeedback}