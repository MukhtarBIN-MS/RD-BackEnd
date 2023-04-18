// requiring dependencies
require('dotenv').config()
const express = require('express'),
        app = express(),
        dbConnect = require('./models'),
        bodyParser = require('body-parser'),
        transcriptRoutes = require('./routes/transcript'),
        userRoutes = require('./routes/user'),
        adminRoutes = require('./routes/admin')

//using bodyParser to access request body & parameter 
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

// loging request patch and methos to console
app.use((req, res, next)=>{
    console.log(req.path, req.method)
    next()
})

// using routes to reach various collections via controllers
app.use('/api-v1/transcripts', transcriptRoutes)
app.use('/api-v1/users', userRoutes)
app.use('/api-v1/admin', adminRoutes)

//port to serve application on 
app.listen(process.env.PORT ,()=>{
    console.log(`RecordDigita is serving on port ${process.env.PORT}`)
})