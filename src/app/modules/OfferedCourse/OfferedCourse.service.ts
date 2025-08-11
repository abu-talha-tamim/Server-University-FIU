import httpStatus from 'http-status';
import { TOfferedCourse } from './OfferedCourse.interface';
import { SemesterRegistration } from '../semesterRegistration/semesterRegistration.model';
import AppError from '../../errors/AppError';
import { AcademicFaculty } from '../academicFaculty/academicFaculty.model';
import { AcademicDepartment } from '../academicDepartment/academicDepartment.model';
import { Course } from '../Course/course.model';
import { Faculty } from '../Faculty/faculty.model';
import { OfferedCourse } from './OfferedCourse.model';
import { hasTimeConflict } from './OfferedCourse.utils';

const createOfferedCourseIntoDB = async (payload: TOfferedCourse) => {
    const {
        semesterRegistration,
        academicFaculty,
        academicDepartment,
        course,
        section,
        faculty,
        days,
        startTime,
        endTime,
    } = payload;
    // check if the semester register is exists
    const isSemesterRegistrationExits =
        await SemesterRegistration.findById(semesterRegistration);
    if (!isSemesterRegistrationExits) {
        throw new AppError(
            httpStatus.NOT_FOUND,
            'Semester registration not found !',
        );
    };
    const academicSemester = isSemesterRegistrationExits.academicSemester;
    const isAcademicFacultyExits = await AcademicFaculty.findById(academicFaculty);
    if (!isAcademicFacultyExits) {
        throw new AppError(httpStatus.NOT_FOUND, 'Academic Faculty not found !');
    }
    const isAcademicDepartmentExits = await AcademicDepartment.findById(academicDepartment);
    if (!isAcademicDepartmentExits) {
        throw new AppError(httpStatus.NOT_FOUND, 'Academic Department not found !');
    }
    const isCourseExits = await Course.findById(course);

    if (!isCourseExits) {
        throw new AppError(httpStatus.NOT_FOUND, 'Course not found !');
    }
    const isFacultyExits = await Faculty.findById(faculty);

    if (!isFacultyExits) {
        throw new AppError(httpStatus.NOT_FOUND, 'Faculty not found !');
    }

    // check if the department is belong to the ....
    const isDepartmentBelongToFaculty = await AcademicDepartment.findOne({
        _id: academicDepartment,
        academicFaculty,
    });
    if (!isDepartmentBelongToFaculty) {
        throw new AppError(
            httpStatus.BAD_REQUEST,
            `This ${isAcademicDepartmentExits.name} is not  belong to this ${isAcademicFacultyExits.name}`,
        );
    }

    const isSameOfferedCourseExistsWithSameRegisteredSemesterWithSameSection = await OfferedCourse.findOne({
        semesterRegistration,
        course,
        section,
    })
    if (isSameOfferedCourseExistsWithSameRegisteredSemesterWithSameSection) {
        throw new AppError(
            httpStatus.BAD_REQUEST,
            `Offered course with same section is already exist!`,
        );
    }

    const assignedSchedules = await OfferedCourse.find({
        semesterRegistration,
        faculty,
        days: { $in: days },
    }).select('days startTime endTime');

    const newSchedule = {
        days,
        startTime,
        endTime,
    };
    if (hasTimeConflict(assignedSchedules, newSchedule)) {
        throw new AppError(
            httpStatus.CONFLICT,
            `This faculty is not available at that time ! Choose other time or day`,
        );
    }
    const result = await OfferedCourse.create({
        ...payload,
        academicSemester,
    });
    return result;


};

const getAllOfferedCoursesFromDB = async (query: Record<string, unknown>) => {
};

const getSingleOfferedCourseFromDB = async (id: string) => {
};

const updateOfferedCourseIntoDB = async(
};

const deleteOfferedCourseFromDB = async (id: string) => {
};

export const OfferedCourseServices = {
    createOfferedCourseIntoDB,
    getAllOfferedCoursesFromDB,
    getSingleOfferedCourseFromDB,
    deleteOfferedCourseFromDB,
    updateOfferedCourseIntoDB,
}