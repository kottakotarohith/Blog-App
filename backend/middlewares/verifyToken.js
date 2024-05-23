const jsonwebtoken = require("jsonwebtoken")
require('dotenv').config()


//token verification middleware function
const verifyToken = (req,res,next)=>{

    //get bearer token
    const bearerToken = req.headers.authorization
    if(!bearerToken){
        return res.send({message:'UnAuthorized request . Please login to confirm'})
    }
    //extract only token
    const  token = bearerToken.split(' ')[1]
    // console.log(token)
    

    try{
        //verify the token using the same secret key
        jsonwebtoken.verify(token,process.env.SECRET_KEY)
        next()
    }catch(err){
        //sending error to error handler middleware in server.js
        next(err)
    }

}


module.exports= verifyToken;