const express=require('express');
const app=express();
const cors=require('cors')
const dotenv=require('dotenv');
const userRoutes=require('./routes/userRoute')
const connectDb=require('./config/db')
const adminRoutes=require('./routes/adminRoute')
dotenv.config({path:'./config/.env'});
connectDb();

const PORT=process.env.PORT ||3000;
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use('/api/user',userRoutes);
app.use('/api/admin',adminRoutes)


app.listen(PORT,()=>{
    console.log(`running on port ${PORT}`);
    
})
app.use((err,req,res,next)=>{
    res.status(err.statuscode).json({
        success:false,
        message:err.message
    })
    })