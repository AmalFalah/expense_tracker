import React, { useState, useEffect } from 'react';
import { expensesAPI } from '../services/api';
import '../styles/Expenses.css';

const ExpenseList = ({ refreshTrigger }) => {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchExpenses();
  }, [refreshTrigger]);

  const fetchExpenses = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await expensesAPI.getMonthlyExpenses();
      setExpenses(response.data);
    } catch (err) {
      setError('Failed to load expenses');
    } finally {
      setLoading(false);
    }
  };

  const getTotalAmount = () => {
    return expenses.reduce((total, expense) => total + expense.amount, 0).toFixed(2);
  };

  if (loading && expenses.length === 0) {
    return <div className="loading">Loading expenses...</div>;
  }

  return (
    <div className="expense-list-card">
      <h3>Monthly Expenses</h3>
      {error && <div className="error-message">{error}</div>}
      
      {expenses.length === 0 ? (
        <p className="no-expenses">No expenses found for this month</p>
      ) : (
        <>
          <div className="expenses-table">
            <table>
              <thead>
                <tr>
                  <th>Category</th>
                  <th>Amount</th>
                  <th>Description</th>
                  <th>Date</th>
                  <th>Added At</th>
                </tr>
              </thead>
              <tbody>
                {expenses.map((expense) => (
                  <tr key={expense.id}>
                    <td>{expense.category?.name || 'Unknown'}</td>
                    <td className="amount">{expense.amount.toFixed(2)}</td>
                    <td>{expense.description || '-'}</td>
                    <td>{new Date(expense.expense_date).toLocaleDateString()}</td>
                    <td>{new Date(expense.created_at).toLocaleTimeString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="total-section">
            <strong>Total: {getTotalAmount()}</strong>
          </div>
        </>
      )}
    </div>
  );
};

export default ExpenseList;
