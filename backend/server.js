//creating express application
const exp = require("express")
const app = exp()
require('dotenv').config()//process.env.PORT
const mongoClient = require('mongodb').MongoClient;
const path = require("path")

//deploy react build in server
app.use(exp.static(path.join(__dirname,'../client/build')))


//body parser
app.use(exp.json())

//connect to db
mongoClient.connect(process.env.DB_URL)
.then(client=>{
    //get db object
    const blogdb = client.db('blogdb')
    //get collection obj
    const usersCollection = blogdb.collection('usersCollection')
    const articlesCollection = blogdb.collection('articlesCollection')
    const authorsCollection = blogdb.collection('authorsCollection')
    //share collection obj with express app
    app.set('usersCollection',usersCollection)
    app.set('articlesCollection',articlesCollection)
    app.set('authorsCollection',authorsCollection)

    console.log("DataBase connection successful")

})
.catch(err=>console.log("Error in DataBase connection"))



//importing routes
const userApp = require('./APIs/user-api')
const adminApp = require('./APIs/admin-api')
const authorApp = require('./APIs/author-api')

//if path is  user-api then send the req to userApp
app.use('/user-api',userApp)
//if path is  author-api then send the req to authorApp
app.use('/author-api',authorApp)
//if path is  admin-api then send the req to adminApp
app.use('/admin-api',adminApp)


//deal with  refresh
app.use((req,res,next)=>{
    res.sendFile(path.join(__dirname,'../client/build/index.html'))
})

//express error handler
app.use((err,req,res,next)=>{
    res.send({message:"error occurred" , payload:err.message})
})


//assign port number
const port = process.env.PORT || 2721
app.listen(port,()=> console.log(`server running on port ${port}...`))