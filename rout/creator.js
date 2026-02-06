const express=require("express")
const asynchandler=require('express-async-handler')
const mongoose= require('mongoose')
const Creator=require('../model/Creator')
const joi= require('joi')
const auth= require('../middlewear/auth')
const router= express.Router();
const isAdmain= require('../middlewear/isAdmain')
/*
validetion for creat
*/
const scemahForCreat= joi.object({
    name:joi.string().required().max(20).min(4),
    workAS:joi.string().required().max(20).min(4).valid("actor","actress","director","author","writer","scripter"),
    description:joi.string().max(1000).min(4),
    gender:joi.string().max(20).min(4).valid("male","female")
})
/*
validetion for ubdate
*/
const scemahForUbdate= joi.object({
    name:joi.string().max(20).min(4),
    workAS:joi.string().max(20).min(4).valid("actor","actress","director","author","writer","scripter"),
    description:joi.string().max(1000).min(4),
    gender:joi.string().max(20).min(4).valid("male","female")
})
/*
creat new  creator
post

*/
router.post('/',auth,isAdmain,asynchandler(async(req,res)=>{
    const {error}=scemahForCreat.validate(req.body)
    if(error){res.status(400).json(error.details[0].message)}
const creator= await new Creator({
    name:req.body.name,
    workAS:req.body.workAS,
    gender:req.body.gender,
    image:req.body.image,
    description:req.body.description
})
const rus=await creator.save()
res.status(201).json(rus)
}))
/*
update
put
*/
router.put('/:id',auth,isAdmain,asynchandler(async(req,res)=>{
    const {error}=scemahForUbdate.validate(req.body)
    if(error){res.status(400).json(error.details[0].message)}
    const vaildCheck= mongoose.Types.ObjectId.isValid(req.params.id)
    if(!vaildCheck){res.status(500).json("invaild id")}
    const check=await Creator.findById(req.params.id)
    if(check){
    const creator=await Creator.findByIdAndUpdate(req.params.id,{$set:{
        name:req.body.name,
        workAS:req.body.workAS,
        gender:req.body.gender,
        description:req.body.description,
        image:req.body.image
 } },{new:true})
 res.status(200).json(creator);}
 else{res.status(404).json("the id not found")}
}))
/*
get creator by id 
get
*/ 
router.get('/:id',asynchandler(async(req,res)=>{
     const vaildCheck= mongoose.Types.ObjectId.isValid(req.params.id)
    if(!vaildCheck){res.status(500).json("invaild id")}
    const check=await Creator.findById(req.params.id)
    if(check){
    const creator= await Creator.findById(req.params.id)
    res.status(200).json(creator)}
 else{res.status(404).json("the id not found")}


}))
/*
get creator
get
*/ 
router.get('/',asynchandler(async(req,res)=>{
    //name==
    if(req.query.name){
    const creator= await Creator.find({name:{$eq:req.query.name}})
    res.status(200).json(creator)}
    //workAS=jop
      else  if(req.query.workAS){
    const creator= await Creator.find({workAS:{$eq:req.query.workAS}})
    res.status(200).json(creator)}
    else{
        res.status(400).json("bad requst")
    }
}))

module.exports=router