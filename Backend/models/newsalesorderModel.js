import mongoose from "mongoose";

const salesSchema = new mongoose.Schema({
    customerName: {
        type: String,
        required: true
    },
    salesOrder: {
        type: String,
        required: true,
        unique: true
    },
    referenceNumber: {
        type: Number,
        required: true,
        unique: true
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
        required: true
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
    },
    email: {
        type: String,
        required: true
    }
},
    {
        collection: 'newSalesOrder'
    }
)

const newSalesOrder = mongoose.model("newSalesOrder", salesSchema);
export default newSalesOrder;