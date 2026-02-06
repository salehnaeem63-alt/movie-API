const express=require('express')
const joi=require('joi')
const mongoose=require('mongoose')
const Movie=require('../model/Movie')
const asynchandler= require('express-async-handler')
const auth= require('../middlewear/auth')
const router= express.Router()
const isAdmain= require('../middlewear/isAdmain')
/*
creat new movie
post
*/
router.post('/',auth,isAdmain,asynchandler(async(req,res)=>{
const movie= await new Movie({
    name:req.body.name,
    numStar:0,
    creator:req.body.creator,
    country:req.body.country,
    language:req.body.language,
    description:req.body.description,
    year:req.body.year,
    time:{
        hours:req.body.time.hours,
        minutes:req.body.time.minutes
    }
    ,count:1,
    image:req.body.image
})
const rsu=await movie.save();
res.status(201).json(rsu)

}))
/*
creat new comment
put
*/
router.put('/comment/:id', auth, asynchandler(async(req,res)=>{
     const vaildCheck= mongoose.Types.ObjectId.isValid(req.params.id)
        if(!vaildCheck){return res.status(500).json("invaild id")}
    
    const movie = await Movie.findById(req.params.id)
    if (!movie) {
        return res.status(404).json("movie not found")
    }

    // Use the actual user ID from the authenticated user
    const newComment = {
        user: req.user.id, // Use the authenticated user's ID
        data: req.body.comment.data
    }

    const updatedMovie = await Movie.findByIdAndUpdate(
        req.params.id,
        {$push: { comment: newComment }},
        {new: true}
    )
    
    res.status(201).json(updatedMovie)
}))
/*
reating the movie
put
*/
/*router.put('/rate/:id',auth,asynchandler(async(req,res)=>{
     const vaildCheck= mongoose.Types.ObjectId.isValid(req.params.id)
        if(!vaildCheck){res.status(500).json("invaild id")}
    const check= await Movie.findById(req.params.id)
    if (!check) {
        res.status(404).json("not found")
    }
const oldStar=check.numStar
const oldCount=check.count
const newStar=(oldStar+req.body.numStar)/(oldCount+1)
const movie= await Movie.findByIdAndUpdate(req.params.id,{$set:{
    numStar:newStar,
    count:oldCount+1
}},{new:true})
res.status(200).json(movie)

}))*/
/*
/*
rate the movie (ONE TIME PER USER)
put
*/
router.put('/rate/:id', auth, asynchandler(async(req, res) => {
    const vaildCheck = mongoose.Types.ObjectId.isValid(req.params.id)
    if(!vaildCheck) {
        return res.status(500).json("invalid id")
    }
    
    const movie = await Movie.findById(req.params.id)
    if (!movie) {
        return res.status(404).json("movie not found")
    }
    
    // Check if user already rated this movie
    const userId = req.user.id
    const alreadyRated = await Movie.findOne({
        _id: req.params.id,
        'ratings.user': userId
    })
    
    if (alreadyRated) {
        return res.status(400).json("You have already rated this movie")
    }
    
    // Validate rating value
    if (!req.body.numStar || req.body.numStar < 1 || req.body.numStar > 10) {
        return res.status(400).json("Rating must be between 1 and 10")
    }
    
    // Add new rating to ratings array
    movie.ratings.push({
        user: userId,
        rating: req.body.numStar
    })
    
    // Calculate new average
    const totalRatings = movie.ratings.length
    const sumOfRatings = movie.ratings.reduce((sum, r) => sum + r.rating, 0)
    movie.numStar = sumOfRatings / totalRatings
    movie.count = totalRatings
    
    await movie.save()
    
    res.status(200).json(movie)
}))
/*
get Highest rated
get
*/
router.get('/top',asynchandler(async(req,res)=>{
 const arrayMovie= await Movie.find().sort({numStar:-1})
    res.status(200).json(arrayMovie)
}))
/*
get
get
*/
router.get('/',asynchandler(async(req,res)=>{
    //by the name
    if (req.query.name) {
        const arrayMovie= await Movie.find({name:{$eq:req.query.name}})
        if(arrayMovie.length>0){  return  res.status(200).json(arrayMovie)}
       return res.status(404).json("not found")
    }
    //by the year
     if (req.query.year) {
        const arrayMovie= await Movie.find({year:{$eq:req.query.year}}).sort({numStar:-1})
          if(arrayMovie.length>0){   return res.status(200).json(arrayMovie)}
      return  res.status(404).json("not found")
    }
    //by the creator
     if (req.query.creator) {
            //check the validtion 
            const check=mongoose.Types.ObjectId.isValid(req.query.creator)
            if (!check) {  return res.status(500).json("invalid id") }

            const arrayMovie= await Movie.find({creator:{$eq:req.query.creator}}).sort({numStar:-1})
        //check if it is not empty
        if(arrayMovie.length>0){
              return   res.status(200).json(arrayMovie)
            }
       return res.status(404).json("not found")
    }
   return res.status(404).json("bad requst")
 
}))






/*
get movie by id
get
*/
router.get('/:id', asynchandler(async(req,res)=>{
    const vaildCheck= mongoose.Types.ObjectId.isValid(req.params.id)
    if(!vaildCheck){return res.status(500).json("invaild id")}
    
    const movie = await Movie.findById(req.params.id).populate('creator')
    if (!movie) {
        return res.status(404).json("movie not found")
    }
    res.status(200).json(movie)
}))
/**** */
/*
update movie
put
*/
router.put('/:id', auth, isAdmain, asynchandler(async(req,res)=>{
    const vaildCheck = mongoose.Types.ObjectId.isValid(req.params.id)
    if(!vaildCheck) {
        return res.status(500).json("invalid id")
    }
    
    const check = await Movie.findById(req.params.id)
    if(!check) {
        return res.status(404).json("movie not found")
    }
    
    let creators = [];
    if (req.body.creator && Array.isArray(req.body.creator)) {
        creators = req.body.creator;
    }
    
    const movie = await Movie.findByIdAndUpdate(req.params.id, {
        $set: {
            name: req.body.name,
            country: req.body.country,
            language: req.body.language,
            description: req.body.description,
            year: req.body.year,
            time: req.body.time,
            creator: creators
        }
    }, {new: true})
    
    res.status(200).json(movie)
}))

module.exports=router