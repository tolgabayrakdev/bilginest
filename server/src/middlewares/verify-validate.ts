import { NextFunction, Request, Response } from 'express';
import { Schema } from 'joi';

export const verifyValidate = (schema: Schema) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const { error } = schema.validate(req.body, { abortEarly: false });
        
        if (error) {
            const errorMessage = error.details
                ? error.details.map((detail) => detail.message).join(', ')
                : 'Validation error';
            res.status(400).json({ error: errorMessage });
            return; 
        }
        
        next(); 
    };
};
