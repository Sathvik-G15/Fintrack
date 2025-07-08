import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BudgetEditor from '../components/BudgetEditor';
import styles from '../components/CSS/SetBudget.module.css';

export default function SetBudget() {
  const [monthYear, setMonthYear] = useState(() => {
    const now = new Date();
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
  });

  const [budgets, setBudgets] = useState({});

  useEffect(() => {
    const fetchBudgets = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_API_URL}/budgets?monthYear=${monthYear}`
        );
        setBudgets(res.data || {});
      } catch (err) {
        console.error('Failed to load budgets', err);
        setBudgets({});
      }
    };

    fetchBudgets();
  }, [monthYear]);

  const handleBudgetChange = (category, amount) => {
    setBudgets(prev => ({
      ...prev,
      [category]: amount,
    }));
  };

  const handleSave = async () => {
    try {
      await axios.put(`${process.env.REACT_APP_API_URL}/budgets`, {
        monthYear,
        budgets,
      });
      alert('Budgets saved successfully.');
    } catch (err) {
      console.error('Failed to save budgets', err);
      alert('Error saving budgets.');
    }
  };

  return (
    <div className={styles.setBudgetContainer}>
      <h1>Set Budget</h1>

      <label htmlFor="monthInput">Select Month:</label>
      <input
        type="month"
        id="monthInput"
        value={monthYear}
        onChange={e => setMonthYear(e.target.value)}
      />

      <BudgetEditor
        budgets={budgets || {}} // ✅ fallback
        onChange={handleBudgetChange}
        onSave={handleSave}
      />
    </div>
  );
}
