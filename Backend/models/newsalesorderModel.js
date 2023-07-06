import mongoose from "mongoose";

const salesSchema = new mongoose.Schema({
    customerName: {
        type: String,
        required: true
    },
    salesOrder: {
        type: String,
        required: true
    },
    referenceNumber: {
        type: Number,
        required: true
    },
    salesOrderDate: {
        type: Date,
        required: true
    },
    expectedShipmentDate: {
        type: Date,
        required: true
    },
    paymentTerms: {
        type: String,
        required: true
    },
    deliveryMethod: {
        type: String,
        required: true
    },
    customerNotes: {
        type: String,
        required: true
    },
    grandTotal: {
        type: Number,
        required: false
    },
    salesOrderAttachment: {
        type: Document,
        required: false
    },
    item: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    rate: {
        type: Number,
        required: true
    },
    discount: {
        type: Number,
        required: true
    },
    amount: {
        type: Number,
        required: false
    }
},{timestamps:true})

export default mongoose.model("newSalesOrder", salesSchema);