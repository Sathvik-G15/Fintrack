import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TransactionForm from '../components/TransactionForm';
import TransactionList from '../components/TransactionList';
import styles from '../components/CSS/Transactions.module.css';

export default function Transactions() {
  const [transactions, setTransactions] = useState([]);

  const fetchTransactions = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/transactions`);
      setTransactions(res.data);
    } catch (err) {
      console.error('Failed to fetch transactions:', err);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  return (
    <div className={styles.transactionsContainer}>
      <h1>Transactions</h1>
      <TransactionForm onTransactionAdded={fetchTransactions} />
      <TransactionList transactions={transactions} onChange={fetchTransactions} />
    </div>
  );
}
