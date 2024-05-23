//creating mini express authorApp
const exp = require('express');
const authorApp = exp.Router();
const commonApp = require('./common-api')
const bcryptjs = require('bcryptjs')
const expressAsyncHandler = require('express-async-handler')
const jwt = require('jsonwebtoken');
const { AutoEncryptionLoggerLevel, ReturnDocument } = require('mongodb');
const verifyToken = require('../middlewares/verifyToken')
require('dotenv').config()


let authorsCollection
let articlesCollection
//get authorsCollection  and articlesCollection Object
authorApp.use((req,res,next)=>{
    authorsCollection = req.app.get('authorsCollection')
    articlesCollection = req.app.get('articlesCollection')
    next()
})


//author registration route
authorApp.post('/author',expressAsyncHandler( async (req,res)=>{

    //get author details
    const newAuthor = req.body
    //check if author name is already existing or not
    const dbAuthor = await authorsCollection.findOne({username : newAuthor.username})
    if(dbAuthor!=null){
        res.send({message:"author name already existing"})
    }else{
        //hash the password
        const hashedPassword = await bcryptjs.hash(newAuthor.password, 7)
        //replace password with hashed password
        newAuthor.password = hashedPassword
        //adding the user data to db
        await authorsCollection.insertOne(newAuthor)
        //send res
        res.send({ message: "new author created" })
    }

}))

//author login route
authorApp.post('/login', expressAsyncHandler(async (req, res) => {
    const authorCredentials = req.body;
    const dbAuthor = await authorsCollection.findOne({ username: authorCredentials.username });
    //checking if author exists
    if (!dbAuthor) {
        res.send({ message: "invalid author username" });
    } else {
        const passwordMatch = await bcryptjs.compare(authorCredentials.password, dbAuthor.password);
        if (!passwordMatch) {
            res.send({ message: "invalid password" });
        } else {
            const signedToken = jwt.sign({ username: dbAuthor.username }, process.env.SECRET_KEY, { expiresIn: '1d' });
            res.send({ message: "login successful", token: signedToken, user: dbAuthor });
        }
    }
}));


//add article by author
authorApp.post('/article',verifyToken, expressAsyncHandler(async(req,res)=>{

    //get article data
    const newArticle = req.body
    //post to article collection
    await articlesCollection.insertOne(newArticle)
    //send res
    res.send({message:"new article created"})

}))

//modify the article by author
authorApp.put('/article', verifyToken,expressAsyncHandler( async(req,res)=>{

    //get modified article
    const modifiedArticle = req.body
    //update article by id
    let result = await articlesCollection.updateOne({articleId:modifiedArticle.articleId},{$set:{...modifiedArticle}})
    //sending the latest article
    let latestArticle = await articlesCollection.findOne({articleId:modifiedArticle.articleId})
    //send res
    res.send({message:"article modified" , article :latestArticle})

}))

//view  articles of author
authorApp.get('/articles/:username',verifyToken, expressAsyncHandler( async (req,res)=>{

    //get author name from url
    const author = req.params.username
    //get articles of the author
    const articlesList = await articlesCollection.find({username:author}).toArray()
    // console.log(articlesList)
    res.send({message: `articles of ${author}` , payload: articlesList})

}))

//delete article of author (soft delete) by article id
authorApp.put('/article/:articleId',verifyToken, expressAsyncHandler(async (req,res)=>{
    
    //get article id
    const articleIdFromURL = (+req.params.articleId)
    //get article
    const articleToDelete = req.body
    
    if(articleToDelete.status==true){
        let modifiedArt= await articlesCollection.findOneAndUpdate({ articleId: articleIdFromURL},{$set:{...articleToDelete,status:false}},{ returnDocument: 'after' })
        // console.log(modifiedArt.status)
        res.send({message:"article deleted", payload : modifiedArt.status ,  article : modifiedArt})
     }
     if(articleToDelete.status==false){
         let modifiedArt= await articlesCollection.findOneAndUpdate({ articleId: articleIdFromURL},{$set:{...articleToDelete,status:true}},{ returnDocument: 'after' })
        //  console.log(modifiedArt)
         res.send({message:"article restored", payload : modifiedArt.status , article : modifiedArt})
     }

}))


//exporting authorApp
module.exports = authorApp;