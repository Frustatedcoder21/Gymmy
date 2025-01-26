const mongoose=require('mongoose');

const subscriptionSchema=mongoose.Schema({
    name:{
        type:String,
        required:[true,'enter required fields']
    },
    duration:{
        type:String,
        required:[true,'enter required fields'],
        enum:[1,30,90,180,360]
    },
    price:{
        type:String,
        required:[true,'enter required fields']
    }
})
module.exports=mongoose.model('Subscription',subscriptionSchema)