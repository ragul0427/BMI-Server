const mongoose=require("mongoose")

const scratchSchema=mongoose.Schema({
    number:{
        type:String,
        required:true
    },
    status:{
        type:Boolean,
        default:false,
    }
})

module.exports=mongoose.model("scratchCard",scratchSchema)