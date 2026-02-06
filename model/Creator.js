const mongoose=require("mongoose")
const creatorschema=mongoose.Schema({
name:{
    type:String,
    required:true,
    trim:true,
    maxlength:50,
    minlength:4
},
workAS:{
    type:String,
    enum:["actor","actress","director","author","writer","scripter"],
    lowercase:true,
    required:true
},
gender:{
     type:String,
    enum:["male","female"],
    lowercase:true
},
image:{
type:String
},
description:{
    type:String,
    maxlength:200,
    minlength:0
}

}
,{timestamps:true})
const  Creator= mongoose.model("Creator",creatorschema)
module.exports= Creator;