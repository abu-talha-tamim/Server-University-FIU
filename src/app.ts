import express, { Request, Response } from 'express';
import cors from 'cors';
import router from './app/routes';
import globalErrorHandler from './app/middlewares/globalErrorhandler';
import cookieParser from 'cookie-parser';

const app = express();


app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: 'http://localhost:5173' }));

// Main API routes
app.use('/api/v1', router);


app.get('/', (req: Request, res: Response) => {
    res.send('Server is running...');
});

// Global error handler
app.use(globalErrorHandler);

// Not Found middleware
app.use(globalErrorHandler);

export default app;
