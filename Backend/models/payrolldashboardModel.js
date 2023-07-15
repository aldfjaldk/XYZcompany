import mongoose from "mongoose";

const payrolldashboardSchema = new mongoose.Schema({
  email: String,
  epfAmount: Number,
  esiAmount: Number,
  tdsAmount: Number,
  activeEmployeesCount: Number,
  totalCostArr: [Number]
});

const PayrollDashboard = mongoose.model('payrollDashboard', payrolldashboardSchema);

export default PayrollDashboard;
