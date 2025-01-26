const mongoose=require('mongoose');

const adminSchema=mongoose.Schema({
     firstname:{
            type:String,
            required:[true,"enter the required fields"]
        },
        lastname:{
            type:String,
            required:[true,"enter the required fields"]
        },
        email:{
            type:String,
            required:[true,"enter the required fields"]
        },
        password:{
            type:String,
            required:[true,"enter the required fields"]
        },
        phone:{
            type:String,
            required:[true,"enter the required fields"]
        },
        user:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'User'
        }
    },{timestamps:true})
    
    module.exports=mongoose.model('Admin',adminSchema);
