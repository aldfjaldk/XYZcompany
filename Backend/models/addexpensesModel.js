import mongoose from "mongoose";

const expensesSchema = new mongoose.Schema({
    date: {
        type: Date,
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
        required: true
    },
    tax: {
        type: String,
        required: false
    },
    taxamount: {
        type: Number,
        required: false
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
        type: Document,
        required: true
    }
}, { timestamps: true })

export default mongoose.model("nAddExpenses", expensesSchema);
