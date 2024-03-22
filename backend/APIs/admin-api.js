//creating mini express adminApp
const exp = require('express');
const adminApp = exp.Router();


adminApp.get('/test-admin',(req,res)=>{
    res.send({message:"this is from admin"})
})


//exporting adminApp
module.exports = adminApp;