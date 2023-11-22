const video=require("../modals/videoModal")

const createVideo=async(req,res)=>{
    try {
        const result = await video.create({ ...req.body.formData });
        return res.status(200).send({ data: result });
      } catch (err) {
        return res.status(500).send("Something went wrong while creating video");
      }
}
const getVideo=async(req,res)=>{
    try {
        const result = await video.find({});
        return res.status(200).send({ data: result });
      } catch (e) {
        return res.status(500).send("Something went wrong while fetching video");
      }
}
const updateVideo=async(req,res)=>{
    const { id } = req.params;
    try {
      const result = await video.findByIdAndUpdate(id, { ...req.body });
      return res.status(200).send({ data: result });
    } catch (e) {
      return res.status(500).send("Something went wrong while updating video");
    }
}
const deleteVideo=async(req,res)=>{
    try {
        const { id } = req.params;
          await video.findByIdAndDelete(id);
          return res.status(200).send("Category deleted");    
      } catch (e) {
        return res.status(500).send("Something went wrong while deleting video");
      }
}

module.exports={createVideo,deleteVideo,getVideo,updateVideo}