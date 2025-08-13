import { NextFunction, Request, Response } from 'express';
import { ZodObject, ZodRawShape } from 'zod';
import catchAsync from '../utils/catchAsync';

type AnyZodObject = ZodObject<ZodRawShape>;
const validateRequest = (schema: AnyZodObject) => {
    return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        await schema.parseAsync({
            body: req.body,
            cookies: req.cookies,
        });

        next();
    });
};

export default validateRequest;