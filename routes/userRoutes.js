const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const jwtUtils = require('../utils/jwtUtils')


router.post('/signup', userController.signUp);
router.post('/login', userController.signIn);
router.get('/me',jwtUtils.authenticateJWT, userController.profile);
router.get('/my-courses' ,jwtUtils.authenticateJWT, userController.myCourses);

module.exports = router;