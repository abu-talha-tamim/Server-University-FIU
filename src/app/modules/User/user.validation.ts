
import z from "zod";


export const userValidationSchema = z.object({

    password: z
        .string({
            message: 'Password must be a string',
        })
        .min(6, 'Password must be at least 6 characters')
        .max(20, 'Password can not be more than 20 characters')
        .optional(),

});

export const UserValidation = {
    userValidationSchema,
};

