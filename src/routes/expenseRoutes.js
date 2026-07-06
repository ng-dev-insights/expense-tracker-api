import express from 'express';
import { getAllExpenses, getExpensesById, createNewExpenses } from '../controller/expenseController.js';


const router = express.Router();

router.get('/', getAllExpenses);
router.get('/:id', getExpensesById);
router.post('/', createNewExpenses);

export default router;