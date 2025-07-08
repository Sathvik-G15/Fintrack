import express from 'express';
import Transaction from '../models/Transaction.js';

const router = express.Router();

// GET all
router.get('/', async (req, res) => {
  const transactions = await Transaction.find().sort({ date: -1 });
  res.json(transactions);
});

// POST create
router.post('/', async (req, res) => {
  const newTx = new Transaction(req.body);
  const saved = await newTx.save();
  res.status(201).json(saved);
});

// PUT update
router.put('/:id', async (req, res) => {
  const updated = await Transaction.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
});

// DELETE
router.delete('/:id', async (req, res) => {
  await Transaction.findByIdAndDelete(req.params.id);
  res.sendStatus(204);
});

export default router;
