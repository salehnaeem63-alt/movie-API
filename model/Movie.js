const mongoose=require("mongoose")
const Creator = require("./Creator")
const User = require("./User")
const { required, number } = require("joi")
const movieSchema= mongoose.Schema({
name:{
    type:String,
    trim:true,
    maxLength:200,
    minLength:4,
    required:true
},
numStar:{  
    type:Number,
    required:true,
    min:0,
    max:10
},
creator:[{type:mongoose.Schema.Types.ObjectId,ref:"Creator"}],
country:{
    type:String,
    trim:true,
    maxLength:200,
    minLength:2,
    required:true
},
language:{    
    type:String,
    trim:true,
    maxLength:200,
    minLength:2,
    required:true},
description:{    
    type:String,
    trim:true,
    maxLength:2000,
    minLength:4,
    required:true},
comment:[{
    user:{type:mongoose.Schema.Types.ObjectId,ref:"User"},
    data:{  
    type:String,
    trim:true,
    maxLength:500,
    minLength:1,
        }
}],
    ratings: [{
        user: {
            type: String,
            required: true
        },
        rating: {
            type: Number,
            required: true,
            min: 1,
            max: 10
        },
        ratedAt: {
            type: Date,
            default: Date.now
        }
    }],
year:{ 
    type:Number,
    required:true,
    min:1900,
    max:2100},
time:{
    hours:{
    type:Number,
    required:true,
    min:0,
    max:3},
    minutes:{
    type:Number,
    required:true,
    min:0,
    max:59},},
    count:{ type:Number},
    image:{
        type:String
    }

},{ timestamps: true })
const Movie= mongoose.model("Movie",movieSchema)
module.exports=Movie