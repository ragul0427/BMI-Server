const footer=require("../modals/footerModal")
const {get,isEmpty}=require("lodash")
const {
  uploadToCloud,
  deleteFileInCloud,
  deleteFileInLocal,
} = require("../helper/uploadToS3");
const s3 = require("../helper/s3config");

const createFooter=async(req,res)=>{
  try{
    const isFooter=await footer.find({})
    console.log(isFooter._id)

    if(!isEmpty(isFooter)){
     
    }
    // const result = uploadToCloud(req);
    // s3.upload(result, async (err, data) => {
    //   const file = req.file;
    //   if (err) {
    //     return res.status(500).send(err);
    //   }
    //   deleteFileInLocal(file);
    //   await footer.create({
    //     name: get(req,"body.name"),
    //     email: get(req,"body.email"),
    //     contactNumber: get(req,"body.email"),
    //     address: get(req,"body.address"),
    //     logo: data.Location,
    //     logo_image_key: data.key,
    //   });
    //   return res.status(200).send({ url: data.Location });
    // });
   
  }catch(err){
console.log(err)
  }
}

const getFooter=async(req,res)=>{
  try{
    const result=await footer.find({})
    return res.status(200).send({ data:result });
  }catch(err){
    console.log(err)
  }
}

module.exports={createFooter,getFooter}