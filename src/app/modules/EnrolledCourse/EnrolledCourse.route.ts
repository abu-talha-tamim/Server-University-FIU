import express from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { EnrolledCourseValidations } from './EnrolledCourse.validaton';
import { EnrolledCourseController } from './EnrolledCourse.controller';
const router = express.Router();
router.post(
    '/create-enrolled-course',
    auth('student'),
    validateRequest(
        EnrolledCourseValidations.createEnrolledCourseValidationZodSchema,
    ),
    EnrolledCourseController.createEnrolledCourse,
);

router.patch(
    '/update-enrolled-course/:id',
    auth('faculty'),
    validateRequest(
        EnrolledCourseValidations.updateEnrolledCourseMarksValidationZodSchema,
    ),
    EnrolledCourseController.updateEnrolledCourseMarks,
);
export const EnrolledCourseRoutes = router;