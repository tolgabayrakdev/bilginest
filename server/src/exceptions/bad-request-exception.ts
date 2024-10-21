import { Exception } from './exception';

export class BadRequestError extends Exception {
    constructor(message: string) {
        super(message, 400);
    }
}
