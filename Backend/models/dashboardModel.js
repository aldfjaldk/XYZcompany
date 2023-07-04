import mongoose from "mongoose";

const dashboardSchema = new mongoose.Schema({
  email: String,
  income: [Number],
  amountToPay: Number,
  amountToReceive: Number,
  currentBalance: Number,
  overDue: Number,
  expenses: Number,
  followers: Number,
  projects: Number,
  records: Number,
  expenseArr: [Number]
});

const Dashboard = mongoose.model('dashboard', dashboardSchema);

export default Dashboard;
