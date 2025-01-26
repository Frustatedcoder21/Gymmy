const mongoose=require('mongoose');

const userSchema=mongoose.Schema({

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
    phone:{
        type:String,
        required:[true,"enter the required fields"]
    },
    password:{
        type:String,
        required:[true,"enter the required fields"]
    },
    membership:{
       type:[
         {subscribed:{
            type:Boolean,
            default:false
        },
        subscriptionplan:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'Subscription'
        },
        startdate:{
            type:String
        },
        enddate:{
            type:String
        }
    }
],
        default:[]
    }
},{timestamps:true})

module.exports=mongoose.model('User',userSchema);