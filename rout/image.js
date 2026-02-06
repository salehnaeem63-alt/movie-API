const multer= require('multer')
const express= require('express')
const path= require("path")
const router=express.Router()
const asynchandler=require('express-async-handler')

 const storage= multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,path.join(__dirname,"../image"))

    },
    filename:function(req,file,cb){
        cb(null,new Date().toISOString().replace(/:/g,'-')+file.originalname)
    }

 })
 const uplode =multer({storage})
 router.post('/uplode',uplode.single('image'),asynchandler(async(req,res)=>{
res.status(201).json("the image hase been uploded")
 }))
 module.exports= router