import { NextFunction, Request, Response } from "express";
import { ObjectSchema } from "joi";
import { HttpStatusCode } from "./HttpStatus";

export class ObjectValidator {
    constructor() {}

    static validate(schema: ObjectSchema) {
        return (req: Request, res: Response, next: NextFunction) => {
            try {
                const body = req?.body || {};
                const { error } = schema.validate(body);
                if (error) {
                    res.status(HttpStatusCode.BAD_REQUEST).send({ error: error.details.at(0)?.message });
                } else {
                    next();
                }
            } catch (error) {
                res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).send("Something went wrong");
            }
        };
    }
}