const mongoose=require('mongoose')
const userSchema=mongoose.Schema({
    email:{
    type:String,    
    required:true,
    minlength:10,
    maxlength:200,
    unique:true,
    trim:true
},
userName:{
    type:String,
    required:true,
    minlength:6,
    maxlength:200,
    unique:true,
    trim:true
},
password:{
    type:String,
    required:true,
    minlength:6,
    maxlength:200,
    trim:true
},
isAdmain:{
    type:Boolean,
    default:false
},
})
const User=mongoose.model("User",userSchema)
module.exports= User