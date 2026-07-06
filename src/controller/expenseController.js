import { HTTP_STATUS } from "../constant/httpStatus.js";
import { createExpenses, expenses, getExpenseById, filterExpensesByCategory, updateExpensesById, deleteExpenseById, patchExpensesById } from "../data/expenses.js";
import { ApiResponse } from "../utils/apiResponses.js";

export function getAllExpenses(req, res) {
    const { category } = req.query;

    if (category !== undefined && category.trim() === '') {
        return res.status(HTTP_STATUS.BAD_REQUEST).json(new ApiResponse(null, 'Category cannot be empty'))
    }

    if (category) {
        const filteredData = filterExpensesByCategory(category);
        return res.status(HTTP_STATUS.OK).json(new ApiResponse(filteredData));
    }

    return res.status(HTTP_STATUS.OK).json(new ApiResponse(expenses));
}

export function getExpensesById(req, res) {
    const id = Number(req.params.id);
    const expense = getExpenseById(id);

    if (!expense) {
        return res.status(HTTP_STATUS.NOT_FOUND).json(new ApiResponse(null, "Expense Not Found"));

    }

    return res.status(HTTP_STATUS.OK).json(new ApiResponse(expense));
}

export function createNewExpenses(req, res) {
    const { amount, category, description, date } = req.body;

    const error = validateFields({ amount, category, description, date })
    if (error) {
        return res.status(HTTP_STATUS.BAD_REQUEST).json(new ApiResponse(null, error));
    }

    const newExpense = createExpenses({ amount, category, description, date });

    return res.status(HTTP_STATUS.CREATED).json(new ApiResponse(newExpense));
}

export function updateExpenses(req, res) {
    const id = Number(req.params.id);
    const { amount, category, description, date } = req.body;

    if (!id) {
        return res.status(HTTP_STATUS.BAD_REQUEST).json(new ApiResponse(null, 'Invalid expense id'));
    }

    const error = validateFields({ amount, category, description, date })
    if (error) {
        return res.status(HTTP_STATUS.BAD_REQUEST).json(new ApiResponse(null, error));
    }

    const updatedExpenses = updateExpensesById(id, { amount, category, description, date });

    if (!updatedExpenses) {
        return res.status(HTTP_STATUS.NOT_FOUND).json(new ApiResponse(null, 'Expense not found'));
    }
    return res.status(HTTP_STATUS.OK).json(new ApiResponse(updatedExpenses));
}

export function deleteExpense(req, res) {
    const id = Number(req.params.id);

    if (!id) {
        return res.status(HTTP_STATUS.BAD_REQUEST).json(new ApiResponse(null, 'Invalid expense id'));
    }

    const deletedExpense = deleteExpenseById(id);

    if (!deletedExpense) {
        return res.status(HTTP_STATUS.NOT_FOUND).json(new ApiResponse(null, 'Expense Not Found'))
    }

    return res.status(HTTP_STATUS.OK).json(new ApiResponse(null, `Expense of id ${deletedExpense.id} Deleted SuccessFully`));
}

export function patchExpenses(req, res) {
    const id = Number(req.params.id);
    const { amount, category, description, date } = req.body;

    let updated = {};

    if (amount !== undefined) {
        if (typeof amount !== 'number' || amount <= 0) {
            return res.status(HTTP_STATUS.BAD_REQUEST).json(new ApiResponse(null, 'Invalid amount'));
        }
        updated.amount = amount;
    }

    if (category !== undefined) {
        if (typeof category !== 'string' || category.trim() === '') {
            return res.status(HTTP_STATUS.BAD_REQUEST).json(new ApiResponse(null, 'Invalid category'));
        }
        updated.category = category;
    }

    if (description !== undefined) {
        if (typeof description !== 'string' || description.trim() === '') {
            return res.status(HTTP_STATUS.BAD_REQUEST).json(new ApiResponse(null, 'Invalid description'));
        }
        updated.description = description;
    }

    if (date !== undefined) {
        if (typeof date !== 'string' || isNaN(Date.parse(date))) {
            return res.status(HTTP_STATUS.BAD_REQUEST).json(new ApiResponse(null, 'Invalid date'));
        }
        updated.date = date;
    }

    if (Object.keys(updated).length === 0) {
        return res.status(HTTP_STATUS.BAD_REQUEST).json(new ApiResponse(null, 'No updates provided'));
    }

    const patchExpense = patchExpensesById(id, updated);

    if (!patchExpense) {
        return res.status(HTTP_STATUS.NOT_FOUND).json(new ApiResponse(null, 'Expense not found'));
    }
    return res.status(HTTP_STATUS.OK).json(new ApiResponse(patchExpense, 'Expense updated successfully'));
}

function validateFields({ amount, category, description, date }) {
    if (typeof amount !== 'number' || amount <= 0) return 'Invalid amount';
    if (typeof category !== 'string' || !category) return 'Invalid category';
    if (typeof description !== 'string' || !description) return 'Invalid description';
    if (typeof date !== 'string' || isNaN(Date.parse(date)) || !date) return 'Invalid date';
    return null;
}