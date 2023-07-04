import mongoose from "mongoose";

const dashboardSchema = new mongoose.Schema({
  email: String,
  income: [Number], // Modified to an array of numbers
  amountToPay: Number,
  amountToReceive: Number,
  currentBalance: Number,
  overDue: Number,
  expenses: Number,
  followers: Number,
  projects: Number,
  records: Number,
  expenseArr: [Number] // New field: an array of numbers for expenses
});

const Dashboard = mongoose.model('dashboard', dashboardSchema);

export default Dashboard;
