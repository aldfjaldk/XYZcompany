import mongoose from "mongoose";
const customerSchema = new mongoose.Schema({
    useremail:{
        type:String,
        required:true,
    },
    firstname: {
        type:String,
        required:true,
    },
    customeremail:{
        type:String,
        required:true,
    },
    companyname:{
        type:String,
        required:true
    },
    workphone:{
        type:String,
        required:true
    },
    receivables:{
        type:String,
        required:true
    }
})

export default mongoose.model('customers',customerSchema)