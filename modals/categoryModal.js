const mongoose=require("mongoose")

const categorySchema=mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    status:{
        type:Boolean,
        required:true,
    },
    image:{
        type:String,
        require:true,
    }
},{timestamps:true})

module.exports=mongoose.model("category",categorySchema)