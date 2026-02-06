const express=require('express')
const asynchandler=require('express-async-handler')
const mongoose=require('mongoose')
const User=require('../model/User')
const joi =require('joi')
const bcrypt=require('bcrypt')
const auth= require('../middlewear/auth')
const router=express.Router()
const jwt= require('jsonwebtoken')
// validtion
const registerVaild= joi.object({
    email:joi.string().required()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
    userName:joi.string().alphanum().min(3).max(30).required(),
    password:joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
    repeat_password: joi.ref('password')

}).with('password', 'repeat_password')
//login validtion
const loginVaild= joi.object({
    email:joi.string().required()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
    password:joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
})
/*
regester

*/
router.post('/register',asynchandler(async(req,res)=>{
        const SECRYTKEY="SECRYTKEY552166"

//validtion
 const {error}= registerVaild.validate(req.body)
 if(error){return res.status(400).json(error.details[0].message)}
// check if the email already exsit
 const checkExsit= await User.findOne({email:req.body.email})
 if(checkExsit){ return res.status(400).json("the user is already exsit")}
// check if the username already exsit
  const checkExsitUser= await User.findOne({userName:req.body.userName})
 if(checkExsitUser){return res.status(400).json("the username is already exsit")}
 // hash the password
 const salt = await bcrypt.genSalt(10)
 req.body.password= await bcrypt.hash(req.body.password,salt)

const user= await new User({
    email:req.body.email,
    userName:req.body.userName,
    password:req.body.password
})
const rus =await user.save()
const token=jwt.sign({id:user.id,email:user.email,isAdmain:user.isAdmain},SECRYTKEY,{ expiresIn: '1y' })
const{password,...Other}=user._doc
return res.status(200).json({...Other,token})
}))
/*
login
post
*/
router.post('/login', asynchandler(async(req, res) => {
    const SECRYTKEY = "SECRYTKEY552166"
    
    // validation
    const {error} = loginVaild.validate(req.body)
    if(error) {
        return res.status(400).json(error.details[0].message)
    }
    
    const user = await User.findOne({email: req.body.email})
    if(!user) {
        return res.status(400).json("the email or password is wrong")
    }
    
    const isPassword = await bcrypt.compare(req.body.password, user.password)
    if(!isPassword) {
        return res.status(400).json("the email or password is wrong")
    }
    
    const token = jwt.sign({id: user._id, email: user.email,isAdmain:user.isAdmain}, SECRYTKEY, {expiresIn: '1d'})
    
    // IMPORTANT: Return user data explicitly
    const userData = {
        _id: user._id,
        email: user.email,
        userName: user.userName,
        isAdmain: user.isAdmain
    }
    
    console.log('Sending user data:', userData) // Debug log
    
    return res.status(200).json({
        ...userData,
        token: token
    })
}))
module.exports=router