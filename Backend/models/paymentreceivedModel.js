import mongoose from "mongoose";
const newprSchema = new mongoose.Schema({
    useremail:{
        type:String,
        required:true,
    },
    por:{
        type:String,
        required:true
    },
    date: {
        type:String,
        required:true,
    },
    reference:{
        type:String,
        required:true,
    },
    amount:{
        type:String,
        required:true
    },
    edd:{
        type:String,
        required:true
    },
    vendor:{
        type:String,
        required:true
    },
    customer:{
        type:String,
        required:true
    }
    
})

export default mongoose.model('newprs',newprSchema)