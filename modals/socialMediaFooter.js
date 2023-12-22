const mongoose=require("mongoose")

const socailMediaSchema=mongoose.Schema({
      Link:{
        type:String,
        required:true
      },
      status:{
        type:Boolean,
        required:true
      },
      image:{
        type:String,
        required:true,
      },
      footer_image_key:{
        type:String,
        required:true
      }
},{timestamps:true})

mongoose.model("socialmedia",socailMediaSchema)