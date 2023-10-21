const express = require("express");
const router = express.Router();
const userController = require('../controller/user.controller')
 const {validationSchma} = require('../middelware/validationSchma')
 const verfyToen = require('../middelware/verfyToen');
router.get('/',verfyToen,userController.getAllUser);
router.post('/register',userController.Register);
router.post('/login',userController.Login);


module.exports = router;