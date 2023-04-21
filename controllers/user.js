// requiring packages
require('dotenv').config()
const User = require('../models/user'),
    dbConnect = require('../models'),
    jwt = require('jsonwebtoken')

// function to generate token
const createToken = (_id) => {
    return jwt.sign({_id}, process.env.SECRET_KEY, {expiresIn: '1d'})
}    

// Test Sample for API

exports.sayHello = () =>{
    let Name = 'Mukhtar';
    console.log(Hello `${Name}`)
}

//function to register new user 
exports.registerUser = async (req, res) => {

    let {name, email, matricNumber, password} = req.body

   try {
    
        const user = await User.signup(name, email, matricNumber, password)

        // create a token
        const token = createToken(user._id)

        res.status(200).json({user, token}) 

   } catch (error) {
        res.status(400).json({error: error.message})
   }
}

// login logic for User
exports.loginUser = async (req, res)=>{

    const {email, password} = req.body 

    try {
    
        const user = await User.login(email, password)

        // create a token
        const token = createToken(user._id)

        res.status(200).json({user, token}) 

    } catch (error) {
         res.status(400).json({error: error.message})
    }   
   
}

module.exports = exports
