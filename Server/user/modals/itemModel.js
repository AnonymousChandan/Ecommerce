const mongoose=require("mongoose")
const itemSchema=mongoose.Schema({
    item_name:String,
    item_id:String,
    item_image:String,
    item_category:String,
    actual_prize:String,
    discounted_prize:String
})
const itemModel=mongoose.model("item",itemSchema)
module.exports=itemModel