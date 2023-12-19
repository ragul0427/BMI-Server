const mongoose=require("mongoose")

const footerSchema=mongoose.Schema({
   name:{
    type:String,
    required:true,
   },
   status:{
    type:Boolean,
    required:true,
   },
   link:{
    type:String,
    required:true
   },
  image:{
   type:String,
   required:true
  },
  footer_image_key:{
    type:String,
  }
},{timestamps:true})

module.exports=mongoose.model("footerSettings",footerSchema)