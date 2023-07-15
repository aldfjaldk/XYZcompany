import mongoose from "mongoose";
const newexpenseSchema = new mongoose.Schema({
    useremail:{
        type:String,
        required:true,
    },
    eno:{
        type:String,
        required:true
    },
    date: {
        type:String,
        required:true,
    },
    expenseaccount:{
        type:String,
        required:true,
    },
    amount:{
        type:String,
        required:true
    },
    paidthrough:{
        type:String,
        required:true
    },
    vendor:{
        type:String,
        required:true
    },
    invoice:{
        type:String,
        required:true
    },
    customer:{
        type:String,
        required:true
    }
    
})

export default mongoose.model('newexpenses',newexpenseSchema)