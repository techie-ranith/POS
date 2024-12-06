const express = require('express');
const { signUpUser } = require('../controllers/auth/signup');
const { login }=require('../controllers/auth/login')
const router = express.Router();


router.post('/signup', signUpUser);
router.post('/login', login);

module.exports = router;
