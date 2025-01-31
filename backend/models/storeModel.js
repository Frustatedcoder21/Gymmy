const mongoose=require('mongoose');

const storeSchema=mongoose.Schema({
    name:{
        type:String,
        required:[true,"please fill the essentials"]
    },
    stock:{
        type:Number,
        required:[true,"please fill the essentials"]
    },
    price:{
        type:Number,
        required:[true,"please fill the essentials"]
    }
})
module.exports=mongoose.model("Store",storeSchema)