export const expenses = [
  { id: 1, amount: 250, category: 'food', description: 'groceries', date: '2026-07-01' },
  { id: 2, amount: 1200, category: 'rent', description: 'monthly rent', date: '2026-07-01' }
];

export function getExpenseById(id) {
  return expenses.find(expenses => expenses.id === id);
}

export function createExpenses(data) {
  const newExpenses = {
    id: expenses.length ? expenses[expenses.length - 1].id + 1 : 1,
    ...data
  };
  expenses.push(newExpenses);
  return newExpenses;
}

export function filterExpensesByCategory(category) {
  return expenses.filter(expenses => expenses.category.toLowerCase() === category.trim().toLowerCase());
}