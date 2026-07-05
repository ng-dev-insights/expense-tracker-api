import express from 'express';
import morgan from 'morgan';

const app = express();
app.use(morgan('dev'));
app.use(express.json());


app.get('/health', (req, res) => {
    return res.json({ status: 'ok' });
})

export default app;