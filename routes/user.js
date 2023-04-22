const express = require('express'),
    router = express.Router(),
    controllers = require('../controllers/user')

router.route('/')
    .get()
    .post(controllers.loginUser)

router.route('/signup')
    .post(controllers.registerUser)

router.get('/hello', controllers.sayHello);

module.exports = router
