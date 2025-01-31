const express=require('express');
const router=express.Router();
const adminController=require('../controller/adminController')
router.post('/signup',adminController.signup)
router.post('/login',adminController.login)
router.post('/createplan',adminController.createPlan)
router.get('/alluser',adminController.allUser)
router.get('/details',adminController.adminDetails)
router.delete('/user/:id',adminController.deleteUser)
router.delete('/plan/:id',adminController.planDelete)
router.post('/store/createitem',adminController.createItem)
router.put('/store/item/:id',adminController.itemUpdate)
router.delete('/store/item/:id',adminController.itemDelete)
module.exports=router