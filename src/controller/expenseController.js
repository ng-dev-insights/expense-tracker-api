import { HTTP_STATUS } from "../constant/httpStatus.js";
import { createExpenses, expenses, getExpenseById, filterExpensesByCategory } from "../data/expenses.js";
import { ApiResponses } from "../utils/apiResponses.js";

export function getAllExpenses(req, res) {
    const { category } = req.query;

    if (!category) {
        return res.status(HTTP_STATUS.BAD_REQUEST).send(new ApiResponses(null, 'Category cannot be empty'))
    }

    if (category) {
        const filteredData = filterExpensesByCategory(category);
        return res.status(HTTP_STATUS.OK).send(new ApiResponses(filteredData));
    }

    return res.status(HTTP_STATUS.OK).send(new ApiResponses(expenses));
}

export function getExpensesById(req, res) {
    const id = Number(req.params.id);
    const expense = getExpenseById(id);

    if (!expense) {
        return res.status(HTTP_STATUS.NOT_FOUND).send(new ApiResponses(null, "Expense Not Found"));

    }

    return res.status(HTTP_STATUS.OK).send(new ApiResponses(expense));
}

export function createNewExpenses(req, res) {
    const { amount, category, description, date } = req.body;

    if (typeof (amount) !== 'number' || amount <= 0) {
        return res.status(HTTP_STATUS.BAD_REQUEST).send(new ApiResponses(null, 'Invalid amount'));
    }
    if (!category && typeof category !== 'string') {
        return res.status(HTTP_STATUS.BAD_REQUEST).send(new ApiResponses(null, 'Invalid category'));
    }
    if (!description && typeof description !== 'string') {
        return res.status(HTTP_STATUS.BAD_REQUEST).send(new ApiResponses(null, 'Invalid description'));
    }
    if (!date && typeof date !== 'string') {
        return res.status(HTTP_STATUS.BAD_REQUEST).send(new ApiResponses(null, 'Invalid date'));
    }

    const newExpense = createExpenses({ amount, category, description, date });

    return res.status(HTTP_STATUS.CREATED).send(new ApiResponses(newExpense));
}