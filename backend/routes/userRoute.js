const express=require('express');
const router=express.Router();
const userController=require('../controller/userController')
router.post('/signup',userController.signup)
router.post('/login',userController.login)
router.post('/subscription',userController.subscription)
router.post('/forgotpassword',userController.forgotPassword)
router.get('/details',userController.userDetails)
router.get('/plan/details',userController.planDetails)
module.exports=router