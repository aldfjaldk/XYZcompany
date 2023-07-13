import mongoose from "mongoose";

const expenseSchema = new mongoose.Schema({
    date: {
        type: date,
        required: true
    },
    expense: {
        type: String,
        required: true
    },
    sac: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    
    paymentthrough: {
        type: String,
        required: true
    },
    vendor: {
        type: String,
        required: true
    },
    gsttype: {
        type: String,
        required: true
    },
    destinationofsupply: {
        type: String,
        required: false
    },
    tax: {
        type: String,
        required: false
    },
    taxamount: {
        type: Number,
        required: true
    },
    invoice: {
        type: String,
        required: true
    },
    note: {
        type: String,
        required: true
    },
    file: {
        type: document,
        required: true
    
    }
}, { timestamps: true })

export default mongoose.model("AddExpense", expenseSchema);
