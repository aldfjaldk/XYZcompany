import mongoose from "mongoose";
const BillsPage = new mongoose.Schema({

    VendorName: {
        type: String,
        required: true
    },
    billNumber: {
        type: String,
        required: true
    },
    order: {
        type: String,
        required: true
    },
    billDate: {
        type: Date,
        required: true
    },
    duedate: {
        type: Date,
        required: true
    },
    terms: {
        type: String,
        required: true
    },
    reference:{
        type: String,
        required: true
    },
    items:{
        type:Array,
    },
    subTotalInput: {
        type: Number,
        required: false
    },
    grandInput: {
        type:Number
    },
    user_email: {
    type:String
  },
  discountPercentage:{
    type:Number
},  
taxDropdown:{
    type:Number
}}
)


const Billspage  =  mongoose.model("BillsPage", BillsPage);


export default Billspage;