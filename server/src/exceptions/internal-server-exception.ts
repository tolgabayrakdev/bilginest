import { Exception } from './exception';

export class InternalServerError extends Exception {
    constructor(message: string) {
        super(message, 500);
    }
}
