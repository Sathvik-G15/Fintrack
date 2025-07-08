import React, { useState } from 'react';
import axios from 'axios';
import styles from './CSS/TransactionList.module.css';

export default function TransactionList({ transactions, onChange }) {
  const [editId, setEditId] = useState(null);
  const [editData, setEditData] = useState({});

  const handleDelete = async (id) => {
    await axios.delete(`${process.env.API_URL}/transactions/${id}`);
    onChange();
  };

  const startEdit = (tx) => {
    setEditId(tx._id);
    setEditData({ ...tx });
  };

  const handleEditChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  const saveEdit = async () => {
    await axios.put(`${process.env.API_URL}/transactions/${editId}`, {
      ...editData,
      amount: parseFloat(editData.amount),
    });
    setEditId(null);
    onChange();
  };

  const cancelEdit = () => {
    setEditId(null);
    setEditData({});
  };

  return (
    <div className={styles.list}>
      <h2>All Transactions</h2>
      {transactions.length === 0 ? (
        <p>No transactions found.</p>
      ) : (
        <ul>
          {transactions.map(tx => (
            <li key={tx._id}>
              {editId === tx._id ? (
                <div className={styles.editForm}>
                  <input
                    type="text"
                    name="description"
                    value={editData.description}
                    onChange={handleEditChange}
                  />
                  <input
                    type="number"
                    name="amount"
                    value={editData.amount}
                    onChange={handleEditChange}
                  />
                  <input
                    type="date"
                    name="date"
                    value={editData.date?.slice(0, 10)}
                    onChange={handleEditChange}
                  />
                  <input
                    type="text"
                    name="category"
                    value={editData.category}
                    onChange={handleEditChange}
                  />
                  <button onClick={saveEdit}>Save</button>
                  <button onClick={cancelEdit}>Cancel</button>
                </div>
              ) : (
                <div>
                  <strong>{tx.description}</strong> — ${tx.amount} on {new Date(tx.date).toLocaleDateString()}
                  <br />
                  <span className={styles.category}>Category: {tx.category || 'Uncategorized'}</span>
                </div>
              )}

              <div className={styles.actions}>
                {editId !== tx._id && <button onClick={() => startEdit(tx)}>Edit</button>}
                <button onClick={() => handleDelete(tx._id)}>Delete</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
