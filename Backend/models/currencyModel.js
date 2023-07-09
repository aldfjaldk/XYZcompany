import mongoose from "mongoose";

const currencySchema = new mongoose.Schema({
    date: {
        type:String,
        required:true,
    },
    amount_to_convert:{
        type:Numbers,
        required:true,
    },
    gain_or_loss:{
        type:String,
        required:true,
    } ,
    notes: {
        type:String,
        required:true,
    },
    
})

export default mongoose.model('currencys',currencySchema)

