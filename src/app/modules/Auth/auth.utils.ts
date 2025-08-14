import jwt, { SignOptions } from 'jsonwebtoken';
export const createToken = (
    jwtPayload: { userId: string; role: string },
    secret: string,
    expiresIn: SignOptions['expiresIn'],
) => {
    return jwt.sign(jwtPayload, secret, {
        expiresIn,
    });
};
