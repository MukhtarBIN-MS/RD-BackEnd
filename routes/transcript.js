// requiring dependencies
const express = require('express'),
        router = express.Router()

router.route('/')
    .get()
    .post()
    
router.route('/:id')
    .get()
    .patch()
    .delete()

//  exporting router to global state
module.exports = router    


