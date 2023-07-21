import mongoose from "mongoose";
const vendorSchema = new mongoose.Schema({
    useremail:{
        type:String,
        required:true,
    },
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
    },
    sourceofsupply:{
        type:String,
        required:true,
    },
    openingbalance: {
        type:String,
        required:true,
    },
    paymentterms:{
        type:String,
        required:true,
    },
    website:{
        type:String,
        required:true
    },
    GSTtreatment:{
        type:String,
        required:true
    },
    tds:{
        type:String,
        required:true
    }
})

export default mongoose.model('vendors',vendorSchema)