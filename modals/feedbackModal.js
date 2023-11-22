const mongoose=require("mongoose");

const feedbackSchema=mongoose.Schema({
    userName:{
        type:String,
        required:true,
    },
    mobileNumber:{
        type:String,
        required:true,
    },
    message:{
        type:String,
        required:true
    },
    ratings:{
        type:String,
        required:true
    },
    suggestions:{
        type:String,
        required:true,
    },
    options:{
        type:String,
        required:true
    }
},{timestamps:true})

module.exports=mongoose.model("feedback",feedbackSchema)