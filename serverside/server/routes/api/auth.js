const express = require('express');
const router = express.Router();
const userController = require('../../controllers/user.controller');
const {verifyAuth} = require('../../middleware/authm');

// In your routes/user.js
router.post('/login', userController.login); // Add this line for login route
router.post('/register',userController.register);

// router.post('/logout',userController.logout);

module.exports = router;
 


