// requiring dependencies
require('dotenv').config()
const express = require('express'),
        app = express(),
        dbConnect = require('./models')


//port to serve application on 
app.listen(process.env.PORT ,()=>{
    console.log(`RecordDigita is serving on port ${process.env.PORT}`)
})