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
    items:{
        type:Array,
    },
    subTotal: {
        type: Number,
        required: false
    },
    user_email: {
        type:String
    }
})


const dchallan  =  mongoose.model("deliverychallans", deliveryChallanSchema);


export default dchallan;