const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
const usermodel=require('../models/userModel')
const subscriptionmodel=require('../models/subscriptionModel')
const Errorhandler = require('../utility/errorHandler');
const subscriptionModel = require('../models/subscriptionModel');
const nodemailer=require('nodemailer')
const signup=async(req,res,next)=>{
    const {firstname,lastname,email,password,phone}=req.body;
   try{
    const existingUser=await usermodel.findOne({email});
    if(existingUser){
        return res.status(400).json({
            success:false,
            message:"User already exists"
        })
    }else{
        bcrypt.genSalt(10, async function(err, salt) {
            await bcrypt.hash(password, salt,async function(err, hash) {
             
                
                const user=await usermodel.create({
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
        message:"user created successfully"
     })
  
     
    }
}catch(error){
    next(new Errorhandler('interal server error',500))
}
}
const login=async(req,res,next)=>{
    const {email,password}=req.body;
    try{
        const existingUser=await usermodel.findOne({email})
        if(!existingUser){
            return res.status(404).json({
                success:false,
                message:'something went wrong'
            })
        }else{
            bcrypt.compare(password,existingUser.password,function(err,result){
              if(result==true){
                const token= jwt.sign({email},'secret')
                 res.json({
                    success:true,
                    token
                 })
                 
              }else{
                res.status(400).json({
                    success:false,
                    message:'something went wrong'
                })
              }
              
            })
        }
    }catch(error){
        next(new Errorhandler(error.message,500))
    }
    

}
const subscription=async(req,res,next)=>{
const {token}=req.headers;
if(!token){
    return res.status(400).json({
        success:false,
        message:'log in to get the subscription'
    })
}
const {subscribed,subscription_id}=req.body
const decode=jwt.verify(token,'secret')
const user=await usermodel.findOne({email:decode.email})
if(!user){
    return res.status(400).json({
        success:false,
        message:'user not found'
    })
}else{
    if(subscribed){
        const timestamp=Date.now();
        let startdate=new Date(timestamp);
        startdate=startdate.toLocaleDateString();
        
        const plan=await subscriptionModel.findOne({_id:subscription_id})
        const timestamp2=Date.now()+plan.duration*86400*1000;
        let enddate=new Date(timestamp2)
        enddate=enddate.toLocaleDateString();
        let currentdate=Date.now().toLocaleString();
        if(currentdate<enddate){
            user.membership.pop()
            await user.save();
        }
       if(user.membership.length==0 ||Date.now()>timestamp2) {
        user.membership.push({
            subscribed,
            subscriptionplan:subscription_id,
            startdate,
            enddate

        })
        await user.save();
        res.json({
            success:true,
            message:'subscribed the plan'
        })
    }else{
        res.status(400).json({
            success:false,
            message:"subscription already exists"
        })
    }
    }
}
}
const forgotPassword=async(req,res,next)=>{
    const {email}=req.body;
    const existingUser=await usermodel.findOne({email});
    if(!existingUser){
        return res.status(404).json({
            success:false,
            message:'User not found'
        })
    }else{
        const sendEmail=async()=>{
            try{
              const transporter=nodemailer.createTransport({
                service:'gmail',
                secure:false,
                auth:{
                    user:'mayankp2k1@gmail.com',
                    pass:'vmio rywa aqmb dbaa'
                }
              }) 
              const mailOptions={
                from:'"Gymmy"',
                to:email,
                subject:'Hello from gymmy request for password change',
                text:`you can reset your password click at the link http//:link/${existingUser._id}}`
              } ;
              const info= await transporter.sendMail(mailOptions);
              res.json({
                success:true,
                message:'email sent successfully'
              })
            }catch(error){
                next(new Errorhandler('internal server error ',500))
            }
        }
        sendEmail();

    }
}
const userDetails=async(req,res,next)=>{
    const token=req.headers.token;
    const decode=jwt.verify(token,'secret');

    const email=decode.email;
    try{
    const user=await usermodel.findOne({email}).populate('membership.subscriptionplan').select('-password');
    if(user){
        res.json({
            success:true,
            user
        })
    }else{
        res.status(404).json({
            success:false,
            message:"User not found"
        })
    }
    }catch(error){
       next(new Errorhandler('internal server error',500))
    }

}
const planDetails=async(req,res,next)=>{
    try{
        const plans=await subscriptionmodel.find();
        if(plans){
        res.json({
            success:true,
            plans
        })
    }else{
       next(new Errorhandler("plans not found",404))
    }
    }catch(error){
       next(new Errorhandler("internal server error",500))
    }
    
}

module.exports={signup,login,subscription,forgotPassword,userDetails,planDetails}