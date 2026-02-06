const express=require("express")
const app= express()
const mongoose=require('mongoose')
const path = require('path');
const cors = require('cors')


 mongoose.connect("mongodb://127.0.0.1:27017/moviesrate")
.then(()=>{console.log("conecet to mongoo db")})
.catch((error)=>{console.log(error)})
app.use(express.json())
app.use('/image', express.static(path.join(__dirname, 'image')));
app.use(cors())

app.use("/api/creator",require('./rout/creator'))
app.use("/api/movie",require('./rout/movie'))
app.use("/api/user",require('./rout/user'))
app.use("/api/image",require('./rout/image'))




app.listen(5000,console.log("server is ruing in port 5000"))
