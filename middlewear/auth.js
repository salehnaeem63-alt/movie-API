const asynchandler=require('express-async-handler')
const jwt=require('jsonwebtoken')

const auth=(req,res,next)=>{
const token = req.headers["authorization"]
  if (!token) {
    return res.status(403).json({ message: 'No token provided' });
  }
const cleratoken=token.split(' ')[1]
jwt.verify(cleratoken,"SECRYTKEY552166",(err,decoded)=>{
        if (err) {
      return res.status(401).json({ message: 'Invalid or expired token' });
    }
req.user=decoded
next()
})
}
module.exports=auth