const express = require('express');
const roleController  = require('../controllers/roleController');
const userConntroller  = require('../controllers/userController');

const router = express.Router();

router.post('/addRole', roleController.addRole);
router.post('/signup', userConntroller.register);
router.post('/signin', userConntroller.signIn);
router.post('/signupAdmin', userConntroller.registerAdmin);
router.post('/signinAdmin', userConntroller.signInAdmin);



module.exports = router;
