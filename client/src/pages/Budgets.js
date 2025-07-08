import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import BudgetComparisonChart from '../components/BudgetComparisionChart';
import styles from '../components/CSS/Budgets.module.css';

export default function Budgets() {
  const [budgets, setBudgets] = useState({});
  const [transactions, setTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [monthYear, setMonthYear] = useState(() => {
    const now = new Date();
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
  });
  const [noBudgetsForMonth, setNoBudgetsForMonth] = useState(false);
  const [copying, setCopying] = useState(false);

  useEffect(() => {
    const fetchBudgets = async () => {
      try {
        console.log(`${process.env.REACT_APP_API_URL}/budgets?monthYear=${monthYear}`);
       const res = await axios.get(`${process.env.REACT_APP_API_URL}/budgets?monthYear=${monthYear}`);
       
        const data = res.data || {};
        setBudgets(data);
        setNoBudgetsForMonth(Object.keys(data).length === 0);
      } catch (err) {
        console.error('Failed to fetch budgets', err);
        setBudgets({});
        setNoBudgetsForMonth(true);
      }
    };

    const fetchTransactions = async () => {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/transactions`);
      setTransactions(res.data);
    };

    fetchBudgets();
    fetchTransactions();
  }, [monthYear]);

  useEffect(() => {
    const filtered = transactions.filter(tx => {
      const date = new Date(tx.date);
      const ym = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
      return ym === monthYear;
    });
    setFilteredTransactions(filtered);
  }, [transactions, monthYear]);

  const handleCopyFromPreviousMonth = async () => {
  setCopying(true);
  try {
    const prevMonthDate = new Date(`${monthYear}-01`);
    prevMonthDate.setMonth(prevMonthDate.getMonth() - 1);
    const prevMonthYear = `${prevMonthDate.getFullYear()}-${String(prevMonthDate.getMonth() + 1).padStart(2, '0')}`;

    const res = await axios.get(`${process.env.REACT_APP_API_URL}/budgets?monthYear=${prevMonthYear}`);
    const previousBudgets = res.data || {};

    if (!Object.keys(previousBudgets).length) {
      alert('No budgets found for the previous month.');
      return;
    }

    // Filter out categories that already exist in current month to avoid conflict
    const newBudgets = {};
    for (const [category, amount] of Object.entries(previousBudgets)) {
      if (!budgets[category]) {
        newBudgets[category] = amount;
      }
    }

    if (Object.keys(newBudgets).length === 0) {
      alert('All categories from previous month already exist in current month.');
      return;
    }

    await axios.put(`${process.env.REACT_APP_API_URL}/budgets`, {
      monthYear,
      budgets: newBudgets,
    });

    alert('Budgets copied from previous month.');
    setBudgets({ ...budgets, ...newBudgets });
    setNoBudgetsForMonth(false);
  } catch (err) {
    console.error('Failed to copy budgets:', err.response?.data || err.message);
    alert('Error copying budgets. Check console for details.');
  } finally {
    setCopying(false);
  }
};



  return (
    <div className={styles.budgetsContainer}>
      <h1>Budgets</h1>

      <Link to="/budgets/set">
        <button className={styles.setButton}>Set Budget</button>
      </Link>

      <label htmlFor="monthFilter" className={styles.filterLabel}>
        Filter by month:
      </label>
      <input
        id="monthFilter"
        type="month"
        value={monthYear}
        onChange={e => setMonthYear(e.target.value)}
        className={styles.filterInput}
      />

      {noBudgetsForMonth && (
        <div style={{ marginTop: '1rem' }}>
          <p style={{ color: '#c0392b', fontWeight: 'bold' }}>
            ⚠️ No budgets set for {monthYear}
          </p>
          <button
            onClick={handleCopyFromPreviousMonth}
            disabled={copying}
            style={{
              marginTop: '0.5rem',
              backgroundColor: '#6c63ff',
              color: '#fff',
              padding: '0.5rem 1rem',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
            }}
          >
            {copying ? 'Copying...' : 'Copy from previous month'}
          </button>
        </div>
      )}

      {!noBudgetsForMonth && (
        <>
          
          <BudgetComparisonChart
            budgets={budgets}
            transactions={filteredTransactions}
          />
        </>
      )}
    </div>
  );
}
