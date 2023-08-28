import mongoose from "mongoose";

const currencySchema = new mongoose.Schema({
    date: {
        type:String,
        required:true,
    },
    amount_to_convert:{
        type:String,
        required:true,
    },
    from:{
        type:String,
        required:true,
    } ,
    to:{
        type:String,
        required:true,
    } ,
    notes: {
        type:String,
        required:true,
    },
    
})

export default mongoose.model('currencys',currencySchema)

