const mongoose=require("mongoose")

const userSchema=mongoose.Schema({
    user:{
        type:String,
        required:true,
    },
    phoneNumber:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    address:{
        type:String,
        required:true,
    },
    status:{
        type:String,
        required:true
    }
},{timestamps:true})

module.exports=mongoose.model('user',userSchema)