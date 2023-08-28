import mongoose from "mongoose";

const currencySchema = new mongoose.Schema({
    date: {
        type: String,
        required: true,
    },
<<<<<<< HEAD
    amount_to_convert:{
        type:String,
        required:true,
=======
    amount_to_convert: {
        type: Number,
        required: true,
    },
    from: {
        type: String,
        required: true,
    },
    to: {
        type: String,
        required: true,
>>>>>>> e315508a27083aee1e6dd3b7e01dc4aa4445a498
    },
    notes: {
        type: String,
        required: true,
    },

})

export default mongoose.model('currencys', currencySchema)

