const express=require("express")
const mongoose=require("mongoose")
const multer = require("multer")()
const userController=require("./user/routes/user")
const orderController=require("./user/routes/order")
const cartController =require("./user/routes/cart")
const itemControlert=require("./user/routes/item")
require("dotenv").config()
const cors =require("cors")
const app=express()
app.listen(process.env.PORT || 3001,(err)=>{
    if(!err){
        console.log("Server started at port 3001")
    }
    else{
        console.log(err)
    }
})
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(multer.array())
app.use(cors())
// const notnavigated=["/user/signup","/user/login"]
// app.use((req,res,next)=>{
//     notnavigated.forEach((data)=>{
//         if(req.url.includes(data)){
//             next()
//         }
//     })
//     const user=jwt.verify(req.headers.authorization,process.env.SECRET_KEY)
//     next()
// })
mongoose.connect("mongodb+srv://chandan:chandan123@cluster0.ca5ux.mongodb.net/Ecommerce?retryWrites=true&w=majority",(data)=>{
    console.log("connected to database")
},(err)=>{
    console.log(err)
})
app.get("/",(req,res)=>{
    res.send("Ecommerce Backend")
})
app.use("/user",userController)
app.use("/order",orderController)
app.use("/cart",cartController)
app.use("/item",itemControlert)
