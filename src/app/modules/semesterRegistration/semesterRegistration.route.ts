import express from 'express'
import validateRequest from '../../middlewares/validateRequest';
import { SemesterRegistrationValidation } from './semesterRegistration.validation';
import { SemesterRegistrationController } from './semesterRegistration.controller';
const router = express.Router();

router.post(
    '/create-semester-registration',
    validateRequest(
        SemesterRegistrationValidation.createSemesterRegistrationValidationSchema,
    ),
    SemesterRegistrationController.createSemesterRegistration,
);

router.get(
    '/:id',
    SemesterRegistrationController.getSingleSemesterRegistration,
);

router.patch(
    '/:id',
    validateRequest(
        SemesterRegistrationValidation.updateSemesterRegistrationValidationSchema,
    ),
    SemesterRegistrationController.updateSemesterRegistration,
);

router.get(
    '/:id',
    SemesterRegistrationController.getSingleSemesterRegistration,
);

router.delete(
    '/:id',
    SemesterRegistrationController.deleteSemesterRegistration,
);

router.get('/', SemesterRegistrationController.getAllSemesterRegistrations);

export const semesterRegistrationRoutes = router;