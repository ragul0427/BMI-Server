const mongoose=require('mongoose');

const inventorySchema=mongoose.Schema({
    productName:{
        type:String,
        required:true,
    },
    category:{
        type:String,
        required:true,
    },
    arrivalDate:{
        type:String,
        required:true,
    },
    provided:{
        type:String,
        required:true
    },
    consumed:{
        type:Number,
        required:true
    },
    available:{
        type:Number,
        required:true
    }
})

module.exports=mongoose.model("inventory",inventorySchema)