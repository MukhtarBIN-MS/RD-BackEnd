// requiring dependencies
const mongoose = require('mongoose'),
    bcrypt = require('bcryptjs'),
    validator = require('validator')

//modelling user schema 
const userSchema = new mongoose.Schema({
    name: {type: String},
    email: {type: String, required: true},
    matricNumber: {type: String, required: true},
    password: {type: String, required: true}

}, {timestamps: true})



// signup user function
userSchema.statics.signup = async function (email, matricNumber, password) {

    // check if all inputs are filled
    if(!email || !password || !matricNumber) {
        throw Error('all fields are required')
    }

    // using validator to validate email
    if(!validator.isEmail(email)){
        throw Error('email is not valid')
    }
    
    // using validator to check if password is strong
    if(!validator.isStrongPassword(password)){
        throw Error ('password not strong enough')
    }

    // checking if email already exists in database
    const exists = await this.findOne({email})

    // throwing error if email exists
    if(exists){
        throw Error('Email already in use')
    }

    // generating salt to hash password
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    // creating new user in database
    const user = await this.create({email, matricNumber, password: hash})

    // returning the saved user
    return user
}

const User = mongoose.model('User', userSchema)

module.exports = User