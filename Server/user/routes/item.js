const express=require("express")
const itemModel=require("../modals/itemModel")
const router=express.Router()
router.get("/",(req,res)=>{
    itemModel.find().then((itemData)=>{
        res.status(200).send({item:itemData})
    }).catch((err)=>{
        res.status(400).send(err)
    })
})
router.post("/add",(req,res)=>{
    itemModel.insertMany(req.body.items).then(()=>{
        res.status(200).send("Items added successfully")
    }).catch((err)=>{
        res.status(400).send(err)
    })
})
module.exports=router