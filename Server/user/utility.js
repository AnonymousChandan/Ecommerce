const bcrypt=require("bcryptjs")
const signupmodal=require("./modals/signupmodal")
const checkExtinguisher=async(username)=>{
    let isValid=false
    await signupmodal.find({username:username}).then((userdata)=>{
        if(userdata.length){
            isValid=true
        }
    }).catch((err)=>{
        console.log(err)
    })
    return isValid
}
const generatePassworddHash=(password)=>{
    const salt=10
    return new Promise((resolve,reject)=>{
        bcrypt.genSalt(salt).then((hashSalt)=>{
              bcrypt.hash(password,hashSalt).then((passwordHash)=>{
                  resolve(passwordHash)
              })
             })
    })
  
}
module.exports={checkExtinguisher,generatePassworddHash}