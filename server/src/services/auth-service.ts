import client from '../database';
import { BadRequestError } from '../exceptions/bad-request-exception';
import { Exception } from '../exceptions/exception';
import { InternalServerError } from '../exceptions/internal-server-exception';
import {
    findByEmailQuery,
    loginQuery,
    registerQuery,
    verifyUserQuery,
} from '../queries/auth-queries';
import { Helper } from '../util/helper';

export class AuthService {
    private helper: Helper;

    constructor() {
        this.helper = new Helper();
    }

    public async login(email: string, password: string) {
        const hashedPassword = this.helper.hashPassword(password);
        const result = await client.query(loginQuery, [email, hashedPassword]);
        if (result.rows.length === 0) {
            throw new BadRequestError('User not found!');
        }
        const user = result.rows[0];
        const payload = {
            id: user.id,
            email: user.email,
        };

        const accessToken = this.helper.generateAccessToken(payload);
        const refreshToken = this.helper.generateRefreshToken(payload);
        return {
            accessToken,
            refreshToken,
        };
    }

    public async register(payload: { username: string; email: string; password: string }) {
        const hashedPassword = this.helper.hashPassword(payload.password);
        try {
            await client.query('BEGIN');
            const isEmailExist = await client.query(findByEmailQuery, [payload.email]);
            if (isEmailExist.rows.length > 0) {
                throw new BadRequestError('Email already exist!');
            } else {
                const newUser = await client.query(registerQuery, [
                    payload.username,
                    payload.email,
                    hashedPassword,
                ]);
                await client.query('COMMIT');
                return {
                    id: newUser.rows[0].id,
                    username: newUser.rows[0].username,
                    email: newUser.rows[0].email,
                };
            }
        } catch (error) {
            await client.query('ROLLBACK');
            if (error instanceof Exception) {
                throw error;
            } else {
                throw new InternalServerError('Something went wrong!');
            }
        }
    }

    public async verify(token: string) {
        try {
            const decodedToken: any = this.helper.decodeToken(token);
            const result = await client.query(verifyUserQuery, [decodedToken.id]);
            if (result.rows.length === 0) {
                throw new BadRequestError('User not found!');
            }
            const user = result.rows[0];
            return user;
        } catch (error) {
            if (error instanceof Exception) {
                throw error;
            } else {
                throw new InternalServerError('Something went wrong!');
            }
        }
    }
}
