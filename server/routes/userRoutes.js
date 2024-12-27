const express = require('express');
const { login }=require('../controllers/auth/login')
const {verifyToken}= require('../controllers/auth/verifyToken');
const router = express.Router();



router.post('/login', login);

router.post('/verify-token', verifyToken);


module.exports = router;
