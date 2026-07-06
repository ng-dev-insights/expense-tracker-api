import express from 'express';
import morgan from 'morgan';
import expenseRoutes from './routes/expenseRoutes.js';
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './config/swagger.js';

const app = express();
app.use(morgan('dev'));
app.use(express.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));


app.get('/health', (req, res) => {
    return res.json({ status: 'ok' });
})

app.use('/expenses', expenseRoutes);


export default app;