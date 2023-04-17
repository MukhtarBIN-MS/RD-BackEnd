// requiring dependencies
const express = require('express'),
        router = express.Router(),
        controllers = require('../controllers/transcript')

router.route('/')
    .get(controllers.getAllTranscripts)
    .post(controllers.requestTranscript)
    
router.route('/:id')
    .get()
    .patch()
    .delete()

//  exporting router to global state
module.exports = router    


