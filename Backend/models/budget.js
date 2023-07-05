import mongoose from 'mongoose';

const budgetSchema = new mongoose.Schema({
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
  },
  user: {
    type:String
  }
});

const Budget = mongoose.model('Budget', budgetSchema);

export default Budget;
