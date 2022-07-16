const mongoose=require("mongoose")
const orderSchema =new mongoose.Schema({
    username:{
        type:String,
        require:true
    },
    order_id:{
        type:String,
        require:true
    },
    order_type:{
        type:String,
        require:true
    },
    item_id:{
        type:String,
        require:true
    },
    order_status:{
        type:String,
        require:true
    }

})
const orderModal=mongoose.model("order",orderSchema)
module.exports=orderModal