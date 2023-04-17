// requiring dependencies
const dbConnect = require('../models')
const Transcript = require('../models/transcript')

// getting all transcripts from database
exports.getAllTranscripts = async (req, res) => {
    
    try {
        
        const allTranscripts = await Transcript.find({})
        return res.status(200).json(allTranscripts)

    } catch (error) {
        return res.status(400).json(error.message)
    }
}


// sending a new transcript request
exports.requestTranscript = async (req, res) => {
    
    // destructuring request body to get all parameter
    const {
        referenceId,
        degreeType,
        institution,
        matricNumber,
        yearOfAdmission,
        program,
        requestedFor,
        modeOfDelivery,
        uploadUrl,

    } = req.body

    // checking if any of the required fields are missing and throwing error for catching
    if( !degreeType || !institution ||!matricNumber || !yearOfAdmission || !program || !requestedFor || !modeOfDelivery){
        throw Error('All fields are required')
    }

    // function to generate refernceId
    const generateReferenceId = () => {  

    }

    try {
        
        // sending a create request to server
        const newRequest = await Transcript.create({
            referenceId,
            degreeType,
            institution,
            matricNumber,
            yearOfAdmission,
            program,
            requestedFor,
            modeOfDelivery
        })
        
        // returning json and message if successful
        return res.status(201).json({message: 'Request sucessfully sent', json: newRequest})

    } catch (error) {
        // returning error if any
        return res.status(400).json(error.message)
    }
}

// exporting all functions to global via exports
module.exports = exports