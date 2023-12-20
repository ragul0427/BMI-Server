const mongoose=require("mongoose");

const adddressModal=mongoose.Schema({
    logo:{
        type:String,
        required:true,
    },
    contactNumber:{
        type:Number,
        required:true
    },
    address:{
        type:Number,
        required:true
    },
    email:{
        type:String,
        required:true,
    }

})

module.exports=mongoose.model("footeraddress",adddressModal)