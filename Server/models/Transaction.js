import mongoose from 'mongoose';

const TransactionSchema = new mongoose.Schema({
  amount: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,     
    default: 'Uncategorized',
  },
  date: {
    type: Date,
    required: true,
  },
});

export default mongoose.model('Transaction', TransactionSchema);
