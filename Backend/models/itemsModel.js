import mongoose from "mongoose";
const itemSchema = new mongoose.Schema({
    fullname: {
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    rate:{
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
    }
})

export default mongoose.model('items',itemSchema)