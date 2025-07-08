import React, { useState } from 'react';
import axios from 'axios';
import styles from './CSS/TransactionForm.module.css';

const categoryOptions = ['Food', 'Rent', 'Transport', 'Utilities', 'Entertainment', 'Other'];

export default function TransactionForm({ onTransactionAdded }) {
  const [form, setForm] = useState({
    amount: '',
    description: '',
    date: '',
    category: 'Other',
  });

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const { amount, description, date } = form;
    if (!amount || !description || !date) return alert('Please fill in all required fields');

    await axios.post(`${process.env.REACT_APP_API_URL}/transactions`, {
      ...form,
      amount: parseFloat(form.amount),
    });

    setForm({ amount: '', description: '', date: '', category: 'Other' });
    onTransactionAdded();
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <input
        type="number"
        name="amount"
        value={form.amount}
        onChange={handleChange}
        placeholder="Amount"
        required
      />
      <input
        type="text"
        name="description"
        value={form.description}
        onChange={handleChange}
        placeholder="Description"
        required
      />
      <input
        type="date"
        name="date"
        value={form.date}
        onChange={handleChange}
        required
      />
      <select name="category" value={form.category} onChange={handleChange}>
        {categoryOptions.map((cat, i) => (
          <option key={i} value={cat}>{cat}</option>
        ))}
      </select>
      <button type="submit">Add Transaction</button>
    </form>
  );
}
