import bcrypt from 'bcrypt';
import httpStatus from 'http-status';
import { TLoginUser } from './auth.interface';
import AppError from '../../errors/AppError';
import { User } from '../User/user.model';
import { createToken } from './auth.utils';
import config from '../../config';
import jwt, { JwtPayload } from 'jsonwebtoken';
const loginUser = async (payload: TLoginUser) => {
    const user = await User.isUserExistsByCustomId(payload.id);

    if (!user) {
        throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !');
    }
    // checking if the user is already deleted

    const isDeleted = user?.isDeleted;

    if (isDeleted) {
        throw new AppError(httpStatus.FORBIDDEN, 'This user is deleted !');
    }

    // checking if the user is blocked

    const userStatus = user?.status;

    if (userStatus === 'blocked') {
        throw new AppError(httpStatus.FORBIDDEN, 'This user is blocked ! !');
    }

    //checking if the password is correct

    if (!(await User.isPasswordMatched(payload?.password, user?.password)))
        throw new AppError(httpStatus.FORBIDDEN, 'Password do not matched');

    //create token and sent to the  client
    const jwtPayload = {
        userId: user.id,
        role: user?.role
    };
    const accessToken = jwt.sign(
        jwtPayload,
        config.jwt_access_secret as string, {
        expiresIn: '10d'
    };
       
    );
const refreshToken = createToken(
    jwtPayload,
    config.jwt_refresh_secret as string,
    config.jwt_refresh_expires_in as string,
);
return {
    accessToken,
    refreshToken,
    needsPasswordChange: user?.needsPasswordChange,
};
return {};
};



const changePassword = async (
) => {
};

const refreshToken = async (token: string) => {
};

export const AuthServices = {
    loginUser,
    changePassword,
    refreshToken,
};