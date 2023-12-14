const mongoose=require("mongoose")

const footerSchema=mongoose.Schema({
    locationLink:String,
    instagram:String,
    linkedin:String,
    facebook:String,
    youtube:String,
    whatsapp:String,

})

module.exports=mongoose.model("footerSettings",footerSchema)