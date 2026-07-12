import { pool } from '../config/dbConnection.js';

export async function getExpenseById(id) {
  const expense = await pool.query('select * from expenses where id = $1', [id]);
  return expense.rows[0];
}

export async function createExpenses(data) {
  const { category, amount, description, date } = data;

  const newExpenses = await pool.query('INSERT INTO expenses (category,amount,description,date) VALUES($1,$2,$3,$4) RETURNING *', [category, amount, description, date])

  return newExpenses.rows[0];
}

export async function filterExpensesByCategory(category) {
  const results = await pool.query('Select * from expenses where category= $1', [category.trim()]);
  return results.rows;
}

export async function getAllExpensesFromDb() {
  const results = await pool.query('Select * from expenses');
  return results.rows;
}

export async function updateExpensesById(id, data) {
  const { category, amount, description, date } = data;

  const updateData = await pool.query('UPDATE expenses SET category = $1, amount = $2, description = $3, date = $4 WHERE id = $5 RETURNING *', [category, amount, description, date, id])

  if (updateData.rows.length === 0) {
    return null;
  }

  return updateData.rows[0];
}

export async function deleteExpenseById(id) {
  const expense = await pool.query('Delete from expenses where id=$1 RETURNING *', [id]);

  if (expense.rows.length === 0) {
    return null;
  }

  return expense.rows[0];
}

export async function patchExpensesById(id, data) {
  const fields = Object.keys(data);
  const updatedData = fields.map((field, index) => `${field} = $${index + 1}`);
  const setClause = updatedData.join(', ');
  const values = Object.values(data);

  const query = `UPDATE expenses SET ${setClause} WHERE id = $${fields.length + 1} RETURNING *`;
  const params = [...values, id];

  const updateData = await pool.query(query, params);

  if (updateData.rows.length === 0) {
    return null;
  }

  return updateData.rows[0];
}