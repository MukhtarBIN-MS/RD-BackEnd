const jwt = require('jsonwebtoken')
const User = require('../models/user')

exports.isAuth = async (req, res, next) => {
    const { authorization } = req.headers

    if(!authorization){
        res.status(401).json({message: 'Authorization token required'})
    }

    const token = authorization.split(' ')[1]

    try {
        const {_id} = jwt.verify(token, process.env.SECRET_KEY)
        
        req.user = await User.findOne({ _id }).select('_id')  
        next()

    } catch (error) {
        console.log(error)
        res.status(401).json({error: 'Request is unauthorized'})
    }
}

module.exports = exports
