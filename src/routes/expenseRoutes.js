import express from 'express';
import { getAllExpenses, getExpensesById, createNewExpenses, updateExpenses, deleteExpense, patchExpenses } from '../controller/expenseController.js';


const router = express.Router();

/**
 * @swagger
 * /expenses:
 *   get:
 *     summary: Get all expenses
 *     parameters:
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of expenses
 */
router.get('/', getAllExpenses);

/**
 * @swagger
 * /expenses/{id}:
 *   get:
 *     summary: Get an expense by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Expense found
 *       404:
 *         description: Expense not found
 */
router.get('/:id', getExpensesById);

/**
 * @swagger
 * /expenses:
 *   post:
 *     summary: Create a new expense
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - amount
 *               - category
 *               - description
 *               - date
 *             properties:
 *               amount: { type: number }
 *               category: { type: string }
 *               description: { type: string }
 *               date: { type: string }
 *     responses:
 *       201:
 *         description: Expense created successfully
 *       400:
 *         description: Validation failed
 */
router.post('/', createNewExpenses);



router.put('/:id', updateExpenses);

/**
 * @swagger
 * /expenses/{id}:
 *   delete:
 *     summary: Delete an expense
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Expense deleted
 *       404:
 *         description: Expense not found
 */
router.delete('/:id', deleteExpense);

/**
 * @swagger
 * /expenses/{id}:
 *   patch:
 *     summary: Partially update an existing expense (only send fields to change)
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               amount: { type: number }
 *               category: { type: string }
 *               description: { type: string }
 *               date: { type: string }
 *     responses:
 *       200:
 *         description: Expense updated
 *       400:
 *         description: Validation failed or no fields provided
 *       404:
 *         description: Expense not found
 */
router.patch('/:id', patchExpenses);

export default router;