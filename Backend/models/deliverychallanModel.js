import mongoose from "mongoose";
const deliveryChallanSchema = new mongoose.Schema({

    customerName: {
        type: String,
        required: true
    },
    deliveryChallan: {
        type: String,
        required: true
    },
    referenceNumber: {
        type: Number,
        required: true
    },
    deliveryChallanDate: {
        type: Date,
        required: true
    },
    challanType: {
        type: String,
        required: true
    },
    warehouseName: {
        type: String,
        required: true
    },
    subTotal: {
        type: Number,
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
    tax: {
        type: Number,
        required: true
    },
    amount: {
        type: Number,
        required: false
    }
})

export default mongoose.model("deliveryChallans", deliveryChallanSchema);
