
import { ZodError, } from "zod";
import { TErrorSources, TGenericErrorResponse } from "../interface/error";

const handleZodError = (err: ZodError): TGenericErrorResponse => {
    const errorSources: TErrorSources = err.issues.map((issue: ZodError["issues"][number]) => {
        const lastPathSegment =
            issue.path && issue.path.length > 0 ? String(issue.path[issue.path.length - 1]) : "";
        return {
            path: lastPathSegment,
            message: issue.message,
        };
    });

    const statusCode = 400;

    return {
        statusCode,
        message: 'Validation Error',
        errorSources,
    };
};

export default handleZodError;