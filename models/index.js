require('dotenv').config()
const mongoose = require('mongoose')


mongoose.connect(process.env.LOCALE_URI, { useNewUrlParser: true, useUnifiedTopology: true})
        .then(() => {
            console.log('Database server successfully connected')
        })
        .catch((error)=>{
            console.log(error.message)
        })
