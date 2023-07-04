import mongoose from 'mongoose';

const budgetSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  expense: {
    type: Object,
    required: true
  },
  period: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  }
});

const Budget = mongoose.model('Budget', budgetSchema);

export default Budget;
