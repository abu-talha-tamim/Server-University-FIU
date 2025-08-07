import express, { Request, Response } from 'express';
import cors from 'cors';

import notFound from './app/middlewares/notFound';
import router from './app/routes';
import globalErrorHandler from './app/middlewares/globalErrorhandler';

const app = express();


app.use(express.json());
app.use(cors());

// Main API routes
app.use('/api/v1', router);


app.get('/', (req: Request, res: Response) => {
    res.send('Server is running...');
});

// Global error handler
app.use(globalErrorHandler);

// Not Found middleware
app.use(notFound);

export default app;
