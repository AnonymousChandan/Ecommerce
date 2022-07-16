const { default: mongoose } = require("mongoose")
const moongose=require("mongoose")
const signupSchema=new moongose.Schema({
    username:{
        type:String,
        required:true
    },
    phone_number:{
        type:Number,
        required:true,
        
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    }
})
const signupmodel=mongoose.model("usersignup",signupSchema)
module.exports=signupmodel