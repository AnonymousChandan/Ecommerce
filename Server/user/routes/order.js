const express=require("express")
const orderModal=require('../modals/orderModel')
const jwt=require("jsonwebtoken")
const router=express.Router()
router.get("/",(req,res)=>{
    try{
        const user=jwt.verify(req.headers.authorization,process.env.SECRET_KEY)
        res.status(200).send(user)
    }catch(err){
        res.status(400).send("User not authorised")
    }
})
router.post("/add", (req, res)=> {
    orderModal.create({username: req.body.username, order_id: req.body.orderid, order_type: req.body.ordertype
    ,item_id: req.body.itemid}).then(()=> {
        res.status(200).send("Older placed Successfully")
    }).catch((err)=> {
        res.status(403).send(err)
    })
});
router.delete("/cancel/:id",(req,res)=>{
    orderModal.deleteOne({order_id:req.params.id}).then((data)=>{
        res.status(200).send("Order cancelled successfully")
    }).catch((err)=>{
        res.status(400).send(err)
    })
})
module.exports=router