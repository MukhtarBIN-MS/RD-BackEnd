// requiring packages
require('dotenv').config()
const User = require('../models/user'),
    dbConnect = require('../models'),
    jwt = require('jsonwebtoken')

// function to generate token
const createToken = (_id) => {
    return jwt.sign({_id}, process.env.SECRET_KEY, {expiresIn: '1d'})
}    

//function to register new user 
exports.registerUser = async (req, res) => {

    let {email, matricNumber, password} = req.body

   try {
    
        const user = await User.signup(email, matricNumber, password)

        // create a token
        const token = createToken(user._id)

        res.status(200).json({email, token}) 

   } catch (error) {
        res.status(400).json({error: error.message})
   }
}

module.exports = exports
