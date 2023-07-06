import mongoose from "mongoose";
const vendorSchema = new mongoose.Schema({
    vendorname: {
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    company:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:true
    },
    payables:{
        type:String,
        required:true
    }
})

export default mongoose.model('vendors',vendorSchema)