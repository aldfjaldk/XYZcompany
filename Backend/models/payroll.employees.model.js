import mongoose, { mongo } from "mongoose";
const employeeSchema = new mongoose.Schema ({
    employeeName: {
        type: String,
        required: true
    },
    employeeID: {
        type: Number,
        required: true
    }
    //more fields to be added
})
export default mongoose.model("payroll.employees", employeeSchema);