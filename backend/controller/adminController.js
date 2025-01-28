const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
const adminmodel=require('../models/adminModel');
const Errorhandler = require('../utility/errorHandler');
const subscriptionmodel=require('../models/subscriptionModel')
const userModel = require('../models/userModel');
const adminModel = require('../models/adminModel');
const subscriptionModel = require('../models/subscriptionModel');
const signup=async(req,res,next)=>{
    const {firstname,lastname,email,password,phone}=req.body;
   try{
    const existingAdmin=await adminmodel.findOne({email});
    if(existingAdmin){
        return res.status(400).json({
            success:false,
            message:"admin already exists"
        })
    }else{
        bcrypt.genSalt(10, async function(err, salt) {
            await bcrypt.hash(password, salt,async function(err, hash) {
                console.log(hash);
                
                const admin=await adminmodel.create({
                    firstname,
                    lastname,
                    email,
                    password:hash,
                    phone
                 })
            });
        });
  
    
     
     res.json({
        success:true,
        message:"admin created successfully"
     })
  
     
    }
}catch(error){
    next(new Errorhandler('interal server error',500))
}
}
const login=async(req,res,next)=>{
    const {email,password}=req.body;
    try{
        const existingAdmin=await adminmodel.findOne({email})
        if(!existingAdmin){
            return res.status(404).json({
                success:false,
                message:'something went wrong'
            })
        }else{
            bcrypt.compare(password,existingAdmin.password,function(err,result){
              if(result==true){
                const token= jwt.sign({email},'secret')
                 res.json({
                    success:true,
                    token
                 })
                 
              }
              
            })
        }
    }catch(error){
        next(new Errorhandler("internal server error",500))
    }
    

}
const createPlan=async(req,res,next)=>{
    const {token}=req.headers;
    
    if(!token){
        return res.status(400).json({
            success:false,
            message:'you need to login as admin'
        })
    }
    const {name,duration,price}=req.body
    
    
    try{
        const decode=jwt.verify(token,'secret');
    const admin=await adminmodel.findOne({email:decode.email});
    
    if(!admin){
        
        return res.status(400).json({
            success:false,
            message:'login as admin'
        })
    }else{
        
        const plan=await subscriptionmodel.create({
            name,
            duration,
            price
        })
        console.log(plan);
        
        
        res.json({
            success:true,
            message:'plan created successfully'
        })
    }}catch(error){
        next(new Errorhandler("internal server error",500))
    }
}
const allUser=async(req,res,next)=>{
    const {token}=req.headers;
    if(!token){
        return res.status(400).json({
            success:false,
            message:'please login as admin'
        })
    }
    
    const decode=jwt.verify(token,'secret');
    try{
        const admin=await adminmodel.findOne({email:decode.email});
        if(admin){
    const  users=await userModel.find().select('-password').populate('membership.subscriptionplan');
     res.json({
        success:true,
        users
     })}else{
        res.status(400).json({
            success:false,
            message:"you don't have admin access"
        })
     }
    }catch(error){
        next(new Errorhandler(error.message,500))
    }
    
}
const deleteUser=async(req,res,next)=>{
    const {token}=req.headers;
    if(!token){
        return res.status(400).json({
            success:false,
            message:'please login as admin'
        })
    }
    
    const decode=jwt.verify(token,'secret');
    const id=req.params.id
    try{
        const admin=await adminmodel.findOne({email:decode.email});
        if(admin){
    const  users=await userModel.findOneAndDelete({_id:id});
     res.json({
        success:true,
        message:'user deleted successfully'
     })}else{
        res.status(400).json({
            success:false,
            message:"you don't have admin access"
        })
     }
    }catch(error){
        next(new Errorhandler(error.message,500))
    }
    
}
const adminDetails=async(req,res,next)=>{
    const token=req.headers.token;
    const decode=jwt.verify(token,'secret');
    const email=decode.email;
    try {
        const admin=await adminmodel.findOne({email}).select('-password');
    if(!admin){
        
        res.status(404).json({
            success:false,
            message:"user not found"
        })
    }else{
        res.json({
            success:true,
            admin
        })
    }
    } catch (error) {
        next(new Errorhandler("internal server error",500))
    }
    
}
const planDelete=async(req,res,next)=>{
    const token=req.headers.token;
    const decode=jwt.verify(token,'secret');
    const email=decode.email;
    const id=req.params.id
    try {
        const admin=await adminmodel.findOne({email});
    if(!admin){
        
        res.status(404).json({
            success:false,
            message:"user not found"
        })
    }else{
        const post=await subscriptionmodel.findOneAndDelete({_id:id})
        res.json({
            success:true,
            message:"post deleted successfully"
        })
    }
    } catch (error) {
        next(new Errorhandler("internal server error",500))
    }
    
}

module.exports={login,signup,createPlan,allUser,deleteUser,adminDetails,planDelete}