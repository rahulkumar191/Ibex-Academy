const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const jwtUtils = require('../utils/jwtUtils');


router.post('/signup', adminController.signUp);
router.post('/login', adminController.signIn);
router.get('/me',jwtUtils.authenticateJWT, adminController.profile);

router.post("/create-course",jwtUtils.authenticateJWT, adminController.createCourse);
// router.post("/create-course", adminController.createCourse);
router.post("/add-instructor", adminController.addInstructor);

module.exports = router;