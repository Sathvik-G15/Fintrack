import mongoose from 'mongoose';

const BudgetSchema = new mongoose.Schema({
  category: { type: String, required: true },
  amount: { type: Number, required: true },
  monthYear: { type: String, required: true }, // format: "YYYY-MM"
}, {
  timestamps: true,
});

BudgetSchema.index({ category: 1, monthYear: 1 }, { unique: true }); 


export default mongoose.model('Budget', BudgetSchema);
