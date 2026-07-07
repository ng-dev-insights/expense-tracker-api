export const expenses = [
  { id: 1, amount: 250, category: 'food', description: 'groceries', date: '2026-07-01' },
  { id: 2, amount: 1200, category: 'rent', description: 'monthly rent', date: '2026-07-01' }
];

export function getExpenseById(id) {
  return expenses.find(expense => expense.id === id);
}

export function createExpenses(data) {
  const newExpenses = {
    id: expenses.length ? expenses[expenses.length - 1].id + 1 : 1,
    ...data
  };
  expenses.push(newExpenses);
  return newExpenses;
}

export async function filterExpensesByCategory(category) {
  const results = await pool.query('Select * from expenses where category= $1', [category.trim()]);
  return results.rows;
}

export async function getAllExpensesFromDb() {
  const results = await pool.query('Select * from expenses');
  return results.rows;
}

export function updateExpensesById(id, data) {
  const index = expenses.findIndex(expense => expense.id === id);
  if (index === -1) {
    return null;
  }
  expenses[index] = { id, ...data };
  return expenses[index];
}

export async function deleteExpenseById(id) {
  const expense = await pool.query('Delete from expenses where id=$1 RETURNING *', [id]);

  if (expense.rows.length === 0) {
    return null;
  }

  return expense.rows[0];
}

export function patchExpensesById(id, data) {
  const index = expenses.findIndex(expense => expense.id === id);
  if (index === -1) {
    return null;
  }

  const expense = expenses[index];
  expenses[index] = { ...expense, ...data };
  return expenses[index];
}