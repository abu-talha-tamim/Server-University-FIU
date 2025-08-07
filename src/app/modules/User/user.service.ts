import config from "../../config";
import { TStudent } from "../student/student.interface";
import { User } from "./user.model";
import { Student } from "../student/student.model";
import { generateStudentId } from "./user.utils";
import { AcademicSemester } from "../academicSemester/academicSemester.model";
import AppError from "../../errors/AppError";
import httpStatus from 'http-status';
import { Tuser } from "./user.interface";
import mongoose from "mongoose";

const createStudentIntoDB = async (password: string, payload: TStudent) => {
    // create a user object
    const userData: Partial<Tuser> = {};

    //if password is not given , use deafult password
    userData.password = password || (config.default_password as string);

    //set student role
    userData.role = 'student';

    // find academic semester info
    const admissionSemester = await AcademicSemester.findById(
        payload.admissionSemester,
    );
    if (!admissionSemester) {
        // pick your error type; using a plain Error or your AppError
        throw new AppError(httpStatus.NOT_FOUND, 'Admission semester not found');
    }

    const session = await mongoose.startSession();

    try {
        session.startTransaction();
        //set  generated id
        userData.id = await generateStudentId(admissionSemester);

        // create a user (transaction-1)
        const newUser = await User.create([userData], { session }); // array

        //create a student
        if (!newUser.length) {
            throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create user');
        }
        // set id , _id as user
        payload.id = newUser[0].id;
        payload.user = newUser[0]._id; //reference _id

        // create a student (transaction-2)

        const newStudent = await Student.create([payload], { session });

        if (!newStudent.length) {
            throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create student');
        }

        await session.commitTransaction();
        await session.endSession();
        return newStudent;
    } catch (err: any) {
        await session.abortTransaction();
        await session.endSession();
        throw new Error(err);
    }
};

export const UserServices = {
    createStudentIntoDB,
};
