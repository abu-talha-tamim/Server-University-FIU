import z from "zod";

const createAcademicFacultyValidationSchema = z.object({
    body: z.object({
        name: z
            .string()
            .nonempty({ message: 'Academic faculty name is required and must be a string' }),
    }),
});
const updateAcademicFacultyValidationSchema = z.object({
    body: z.object({
        name: z
            .string()
            .nonempty({ message: 'Academic faculty name is required and must be a string' }),
    }),
});



export const AcademicFacultyValidation = {
    createAcademicFacultyValidationSchema,
    updateAcademicFacultyValidationSchema,
}



