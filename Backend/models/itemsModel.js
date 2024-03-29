import mongoose from "mongoose";
const itemSchema = new mongoose.Schema({
    useremail:{
        type:String,
        required:true,
    },
    fullname: {
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true
    },
    stock:{
        type:String,
        required:true
    },
    hsncode:{
        type:String,
        required:true
    },
    sku:{
        type:String,
        required:true
    },
    unit:{
        type:String,
        required:true
    },
    tax:{
        type:String,
        required:true
    },
    sp:{
        type:String,
        required:true
    },
    account:{
        type:String,
        required:true
    }
})

export default mongoose.model('items',itemSchema)
