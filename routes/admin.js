const express = require('express'),
    router = express.Router(),
    controllers = require('../controllers/admin')

router.route('/')
    .get(controllers.getAllAdmins)
    .post(controllers.loginAdmin)

router.route('/signup')
    .post(controllers.registerAdmin)

router.route('/:id')
    .get()
    .patch(controllers.setPassword)

module.exports = router
