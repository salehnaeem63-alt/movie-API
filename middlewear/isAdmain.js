const asynchandler= require('express-async-handler')
const User=require("../model/User")
const isAdmain=async(req,res,next)=>{
const user = await User.findOne({email:req.user.email})
if(user.isAdmain&&user){
    next()
}
else{
    return res.status(500).json("you re not admain only admin can do")
}
}
module.exports=isAdmain