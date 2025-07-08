import express from 'express';
import Budget from '../models/Budget.js';

const router = express.Router();

// Get all budgets
router.get('/', async (req, res) => {
  let { monthYear } = req.query;

  // ✅ Default to current month if not provided
  if (!monthYear) {
    const now = new Date();
    monthYear = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
  }

  try {
    const budgets = await Budget.find({ monthYear });
    const result = {};
    budgets.forEach(b => {
      result[b.category] = b.amount;
    });
    res.json(result);
  } catch (err) {
    console.error('Error loading budgets:', err);
    res.status(500).json({ error: 'Failed to load budgets' });
  }
});



// Save or update all budgets
router.put('/', async (req, res) => {
  const { monthYear, budgets } = req.body;

  if (!monthYear || !budgets || typeof budgets !== 'object') {
    return res.status(400).json({ error: 'monthYear and budgets required' });
  }

  try {
    const ops = Object.entries(budgets).map(([category, amount]) => {
      return Budget.findOneAndUpdate(
        { category, monthYear },
        { amount },
        { upsert: true, new: true }
      );
    });

    await Promise.all(ops);
    res.sendStatus(200);
  } catch (err) {
    console.error('Error saving budgets:', err);
    res.status(500).json({ error: 'Failed to save budgets' });
  }
});



export default router;
