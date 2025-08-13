import { Router } from 'express';
import { UserRoutes } from '../modules/User/user.route';
import { StudentRoutes } from '../modules/student/student.route';
import { AcademicSemesterRoutes } from '../modules/academicSemester/academicSemester.route';
import { AcademicFacultyRoutes } from '../modules/academicFaculty/academicFaculty.route';
import { AcademicDepartmentRoutes } from '../modules/academicDepartment/academicDepartment.route';
import { FacultyRoutes } from '../modules/Faculty/faculty.route';
import { CourseRouters } from '../modules/Course/course.route';
import { semesterRegistrationRoutes } from '../modules/semesterRegistration/semesterRegistration.route';
import { offeredCourseRoutes } from '../modules/OfferedCourse/OfferedCourse.route';
import { AuthRoutes } from '../modules/Auth/auth.route';

const router = Router();

const moduleRoutes = [
    {
        path: '/users',
        router: UserRoutes,
    },
    {
        path: '/students',
        router: StudentRoutes,
    },
    {
        path: '/faculties',
        router: FacultyRoutes,
    },
    {
        path: '/academic-semesters',
        router: AcademicSemesterRoutes,
    },
    {
        path: '/academic-faculties',
        router: AcademicFacultyRoutes,
    },
    {
        path: '/academic-department',
        router: AcademicDepartmentRoutes,
    },
    {
        path: '/courses',
        router: CourseRouters,
    },
    {
        path: '/offered-course',
        router: offeredCourseRoutes,
    },
    {
        path: '/semester-registrations',
        router: semesterRegistrationRoutes,
    },
    {
        path: '/auth',
        router: AuthRoutes,
    },


];
moduleRoutes.forEach(route => router.use(route.path, route.router));

export default router;
