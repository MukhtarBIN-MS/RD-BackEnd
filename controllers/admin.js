require('dotenv').config()
const Admin = require('../models/admin'),
    dbConnect = require('../models'),
    jwt = require('jsonwebtoken')

// function to generate token
const createToken = (_id) => {
    return jwt.sign({_id}, process.env.SECRET_KEY, {expiresIn: '1d'})
}    


exports.getAllAdmins = async (req, res) => {
    try {
        
        const allAdmins = await Admin.find({})
        res.status(200).json(allAdmins)

    } catch (error) {
        res.status(400).json({error: error.message})
    }
}


exports.registerAdmin = async (req, res) => {
    let {email, institution, role} = req.body

   try {
    
        const admin = await Admin.signup(email, institution, role)

        // create a token
        const token = createToken(admin._id)

        res.status(200).json({admin, token}) 

   } catch (error) {
        res.status(400).json({error: error.message})
   }
}

exports.setPassword = async (req, res) => {
    let {id} = req.params
    const {password} = req.body

    try {
        const admin = await Admin.setPassword(id, password)
        res.status(200).json({admin})

    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

module.exports = exports