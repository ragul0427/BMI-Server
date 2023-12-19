const mongoose = require("mongoose");

const subCategorySchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  categoryName: {
    type: String,
    required: true,
  },
  status:{
    type:Boolean,
    required:true
  },
  categoryId:{
    type:String,
    required:true,
  },
  subcategory_image_key:{
    type:String,
}
});

module.exports=mongoose.model('subcategory',subCategorySchema)
