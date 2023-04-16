const mongoose = require('mongoose')

const transcriptSchema = new mongoose.Schema({

    referenceId:    {type: Number, required: true, unique: true},
    degreeType:     {type: String, required: true},
    institution:    {type: String, required: true},
    matricNumber:   {type: String, required: true},
    yearOfAdmission: {type: Date, required: true},
    program:        {type: String, required: true},
    requestedFor:   {type: String},
    modeOfDelivery: {type: String},
    uploadUrl:      {type: String},
    isSubmitted:    {type: Boolean, default: false},
    isVerified:     {type: Boolean, default: false},
    isPaid:         {type: Boolean},
    isApproved:     {type: Boolean, default: false},
    isQuerried:     {type: Boolean, default: false},
    isPending:      {type: Boolean, default: true},
    createdBy:      {type: String},
    verifiedBy:     {type: String},
    approvedBy:     {type: String},
    querriedBy:     {type: String},
    declinedBy:     {type: String}

}, {timestamps: true})

const Transcript = mongoose.model('Transcript', transcriptSchema)

module.exports = Transcript