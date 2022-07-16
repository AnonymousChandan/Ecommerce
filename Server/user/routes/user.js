const express=require("express")

const signUpmodal=require("../modals/signupmodal")
const {checkExtinguisher,generatePassworddHash}=require("../utility")
const bcrypt=require("bcryptjs")
const jwt=require("jsonwebtoken")
const signupmodel = require("../modals/signupmodal")
const router=express.Router()
router.post("/login",(req,res)=>{
    signUpmodal.find({username:req.body.username}).then((userdata)=>{
        if(userdata.length){
            bcrypt.compare(req.body.password,userdata[0].password).then((val)=>{
                if(val){
                    const authToken=jwt.sign(userdata[0].username,process.env.SECRET_KEY)
                    res.status(200).send({authToken})
                }else{
                    res.status(400).send("Invalid Password")
                }
            })
        }
        else{
            res.status(400).send("Invalid user")
        }
    })
})
router.post("/signup", async(req,res)=>{
    if(await checkExtinguisher(req.body.username)){
        res.status(400).send("Username exist. Please try with another username")
    }
     else{
        generatePassworddHash(req.body.password).then((passwordHash)=>{
            signupmodel.create({username:req.body.username,phone_number:req.body.phoneNumber,email:req.body.email,password:passwordHash}).then((data)=>{
                res.status(200).send(`${req.body.username} Created Successfully`)
            }).catch((err)=>{
                res.status(400).send(err.message)
            })
        })
    }
})
router.post("./logout",(req,res)=>{
    res.status(200).send("logout Works")
})
router.put("/updatepassword",(req,res)=>{
    signUpmodal.find({username:req.body.username}).then((user)=>{
        if(user.length){
            bcrypt.compare(req.body.oldpassword,user[0].password).then((isMatch)=>{
                if(isMatch){
                    generatePassworddHash(req.body.newpassword).then((passwordHashed)=>{
                        signUpmodal.updateOne({username:req.body.username},{password:passwordHashed}).then(()=>{
                            res.status(200).send(` Password updated Successfully`)
                        }).catch((err)=>{
                            res.status(400).send(err)
                        })
                    })
                    
                }else{
                    res.status(400).send("Old password is incorrect")
                }
            })
        }else{
            res.status(400).send("Invalid user")
        }
    })
})
module.exports=router