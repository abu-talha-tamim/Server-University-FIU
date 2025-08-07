import z from 'zod';

const createAcademicDepartmentValidationSchema = z.object({
    body: z.object({
        name: z
            .string()
            .nonempty({ message: 'Name is required and must be a string' }),
        academicFaculty: z
            .string()
            .nonempty({ message: 'Faculty is required and must be a string' }),
    }),
});

const updateAcademicDepartmentValidationSchema = z.object({
    body: z.object({
        name: z
            .string()
            .nonempty({ message: 'Name must be a non-empty string' })
            .optional(),
        academicFaculty: z
            .string()
            .nonempty({ message: 'Faculty must be a non-empty string' })
            .optional(),
    }),
});

export const AcademicDepartmentValidation = {
    createAcademicDepartmentValidationSchema,
    updateAcademicDepartmentValidationSchema,
};
