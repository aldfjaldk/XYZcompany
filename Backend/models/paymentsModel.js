import mongoose from "mongoose";
const paymentSchema = new mongoose.Schema({
    useremail:{
        type:String,
        required:true,
    },
    paymentDate: {
        type:String,
        required:true,
    },
    paymentNumber:{
        type:String,
        required:true,
    },
    reference:{
        type:String,
        required:true
    },
    vendorname:{
        type:String,
        required:true
    },
    paymentMode:{
        type:String,
        required:true
    },
    paymentMade:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    paidThrough:{
        type:String,
        required:true
    }
})

export default mongoose.model('payments',paymentSchema)
