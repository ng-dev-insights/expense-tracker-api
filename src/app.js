import express from 'express';
import morgan from 'morgan';
import expenseRoutes from './routes/expenseRoutes.js';

const app = express();
app.use(morgan('dev'));
app.use(express.json());


app.get('/health', (req, res) => {
    return res.json({ status: 'ok' });
})

app.use('/expenses', expenseRoutes);


export default app;