import mongoose from 'mongoose';

const newpaymentSchema = new mongoose.Schema({
  customerName: {
    type: String,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  paymentdate: {
    type: Date,
    required: true
  },
  paymentMode: {
    type: String,
    required: true
  },
  deliveryMethod: {
    type: String,
    required: true
  },
  taxdeducted: {
    type: Number,
    required: true
  },
  customerNotes:{
    type:String,
    required:true
  },
  transactionid: {
    type:String
  }
});

const addpayment = mongoose.model('addpayment', newpaymentSchema);

export default addpayment;
