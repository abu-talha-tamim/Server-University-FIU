
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import { CourseServices } from './course.service';
import sendResponse from '../../utils/sendResponse';
import { AcademicFacultyServices } from '../academicFaculty/academicFaculty.service';



const createCourse = catchAsync(async (req, res) => {
    const result = await CourseServices.createCourseIntoDB(
        req.body,
    );

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Course is created successfully',
        data: result,
    });
});

const getAllCourses = catchAsync(async (req, res) => {
    const result = await CourseServices.getAllCoursesFromDB(req.query);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Course are retrieved successfully',
        data: result,
    });
});
const getSingleCourses = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result =
        await CourseServices.getSingleCourseFromDB(id);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Course is retrieved successfully',
        data: result,
    });
});
const deleteCourses = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result =
        await CourseServices.deleteCourseFromDB(id);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Course is delete successfully',
        data: result,
    });
});

const updateCourse = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await CourseServices.updateCourseIntoDB(id, req.body);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'course is updated successfully',
        data: result,
    });
});

export const CourseControllers = {
    createCourse,
    getAllCourses,
    getSingleCourses,
    deleteCourses,
    updateCourse,

};