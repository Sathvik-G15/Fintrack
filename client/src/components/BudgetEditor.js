import React, { useState } from 'react';
import styles from './CSS/BudgetEditor.module.css';

const categoryOptions = ['Food', 'Rent', 'Transport', 'Utilities', 'Entertainment', 'Other'];

export default function BudgetEditor({ budgets = {}, onChange, onSave }) {
  const [newBudget, setNewBudget] = useState({ category: '', amount: '' });

  const handleAddBudget = (e) => {
    e.preventDefault();
    const { category, amount } = newBudget;

    if (!category || !amount) return alert('Please enter both fields');
    if (budgets[category]) return alert('This category already exists.');

    onChange(category, parseFloat(amount));
    setNewBudget({ category: '', amount: '' });
  };

  return (
    <div className={styles.editor}>
      <h2>Edit Budgets</h2>

      {Object.keys(budgets).length === 0 && (
        <p style={{ fontStyle: 'italic', color: '#666' }}>
          No budgets set for this month.
        </p>
      )}

      <form>
        {Object.entries(budgets).map(([category, amount]) => (
          <div key={category} className={styles.row}>
            <label>{category}</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => onChange(category, parseFloat(e.target.value))}
              min="0"
            />
          </div>
        ))}
      </form>

      <h3>Add New Budget</h3>
      <form className={styles.newBudgetForm} onSubmit={handleAddBudget}>
        <select
          value={newBudget.category}
          onChange={(e) => setNewBudget({ ...newBudget, category: e.target.value })}
        >
          <option value="">Select Category</option>
          {categoryOptions
            .filter((cat) => !budgets[cat])
            .map((cat, idx) => (
              <option key={idx} value={cat}>
                {cat}
              </option>
            ))}
        </select>

        <input
          type="number"
          placeholder="Amount"
          value={newBudget.amount}
          onChange={(e) => setNewBudget({ ...newBudget, amount: e.target.value })}
          min="0"
        />

        <button type="submit">Add Budget</button>
      </form>

      <button className={styles.saveBtn} onClick={onSave}>
        Save Budgets
      </button>
    </div>
  );
}
