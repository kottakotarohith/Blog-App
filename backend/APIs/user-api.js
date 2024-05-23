//creating mini express userApp
const exp = require('express');
const userApp = exp.Router();
const commonApp = require('./common-api')
const bcryptjs = require('bcryptjs')
const expressAsyncHandler = require('express-async-handler')
const jwt = require('jsonwebtoken')
const verifyToken = require('../middlewares/verifyToken')
require('dotenv').config()

let usersCollection
let articlesCollection
//get usersCollection object
userApp.use((req, res, next) => {
    usersCollection = req.app.get('usersCollection')
    articlesCollection = req.app.get('articlesCollection')
    next()
})

//user registration route
userApp.post('/user', expressAsyncHandler(async (req, res) => {

    //get new user data from client
    const newUser = req.body;
    //check if username is already existing or not
    const dbUser = await usersCollection.findOne({ username: newUser.username })
    if (dbUser != null) {
        res.send({ message: "the username is already taken" })
    } else {
        //hash the password
        const hashedPassword = await bcryptjs.hash(newUser.password, 7)
        //replace password with hashed password
        newUser.password = hashedPassword
        //adding the user data to db
        await usersCollection.insertOne(newUser)
        //send res
        res.send({ message: "new user created" })
    }

}))

//user login route
userApp.post('/login', expressAsyncHandler(async (req, res) => {
    //user credentials
    const userCredentials = req.body
    //checking if user exists
    const dbUser = await usersCollection.findOne({ username: userCredentials.username })
    if (dbUser == null) {
        res.send({ message: "invalid username" })
    } else {
        const passwordMatch = await bcryptjs.compare(userCredentials.password, dbUser.password)
        if (!passwordMatch) {
            res.send({ message: "invalid password" })
        } else {
            const signedToken = jwt.sign({ username: dbUser.username }, process.env.SECRET_KEY, { expiresIn: '1d' })
            res.send({ message: "login successful", token: signedToken, user: dbUser })
        }
    }
}))

//user viewing articles
userApp.get('/articles',verifyToken, expressAsyncHandler(async (req,res)=>{

    
    //get all articles
    let articlesList =await  articlesCollection.find({status:true}).toArray()
    //send res
    res.send({message:"articles",payload:articlesList})

}))

//writing comment
userApp.post('/comment/:articleId',verifyToken, expressAsyncHandler(async (req,res)=>{

    //get comment obj
    const commentObj = req.body;
    const articleIdFromUrl = (+req.params.articleId)
    //insert comment obj to articles by articleId
    let result = await articlesCollection.updateOne({articleId:articleIdFromUrl},{$addToSet:{comments:commentObj}})
    //send res
    console.log(result)
    res.send({message:"comment posted"})

}))


//exporting userApp
module.exports = userApp;
