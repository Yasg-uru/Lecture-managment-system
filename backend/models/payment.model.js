const mongoose=require('mongoose');
const paymentschema=mongoose.Schema({
    razorpay_order_id:{
        type:String ,
        required:true
    },
    razorpay_payment_id:{
        type:String,
        required:true
    },
    razorpay_signature:{
        type:String,
        required:true
    }
},{
    timestamps:true
})
const paymentmodel=mongoose.model('payment',paymentschema);
module.exports=paymentmodel;

