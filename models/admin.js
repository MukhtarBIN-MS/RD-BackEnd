require('dotenv').config()
const mongoose = require('mongoose'),
    validator = require('validator'),
    nodemailer = require('nodemailer'),
    bcrypt = require('bcryptjs'),
    smtpTransport = require('nodemailer-smtp-transport')

const adminSchema = new mongoose.Schema({
    name: {type: String},
    email: {type: String, required: true},
    password: {type: String},
    portfolio: {type: String},
    role: {type: String},
    title: {type: String},
    staffId: {type: String},
    institution: {type: String},
    tier: {type: String},
    isAdmin: {type: Boolean, default: true},
    isActive: {type: Boolean, default: true}
})


// function to signup an admin
adminSchema.statics.signup = async function (email, institution, role) {
    // check if all inputs are filled
    if(!email || !institution || !role) {
        throw Error('all fields are required')
    }

    // using validator to validate email
    if(!validator.isEmail(email)){
        throw Error('email is not valid')
    }
    
    // checking if email already exists in database
    const exists = await this.findOne({email})

    // throwing error if email exists
    if(exists){
        throw Error('Email already in use')
    }

    // creating new user in database
    const admin = await this.create({email, institution, role})

    // returning the saved user
    return admin
}

// function to setup password
adminSchema.statics.setPassword = async function (id, password) {

    // finding admin in database
    const admin = await this.findById({_id: id})

    if(!admin){
        throw Error('resource does not exist, await invite from Super admin')
    }

    // using validator to check if password is strong
     if(!validator.isStrongPassword(password)){
        throw Error ('password not strong enough')
    }

    // generating salt to hash password
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    const updatedAdmin = await this.findByIdAndUpdate(id, {password: hash})
    
    return updatedAdmin
}

// sending email to staff
adminSchema.statics.sendEmail = async function (email, message) {
    let transport = nodemailer.createTransport(smtpTransport({
        host: 'smtp.gmail.com',
        secure: true,
        port: 465,
        auth: {
            user: process.env.EMAIL_USERNAME,
            pass: process.env.EMAIL_PASSWORD
        }
    }))

    const info = await transport.sendMail({
        from: process.env.EMAIL_USERNAME,
        to: email,
        subject: 'INVITATION: RecordDigita Signup invite',
        text: message
    }, (err, sent)=>{
        if(err){
            console.log('error send email')     
        }else{
            console.log('succesfully sent', sent)
        }
    })
}

const Admin = mongoose.model('Admin', adminSchema)

module.exports = Admin