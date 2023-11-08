import Joi from 'joi';
import { ObjectValidator } from "../../../src/utils/ObjectValidateMiddleware";
import { HttpStatusCode } from '../../../src/utils/HttpStatus';

describe("Object validator middleware", () => {
    it("should fail in validation object not match", () => {
        const schema: Joi.ObjectSchema<{data: string}> = Joi.object({
            data: Joi.string().required()
        });
        const req = { body: {} };
        const res = { status: jest.fn().mockReturnThis(), send: jest.fn() };
        const next = jest.fn();

        ObjectValidator.validate(schema)(req as any, res as any, next);
        expect(next).not.toHaveBeenCalled();
    });

    it("should success in validation object", () => {
        const schema: Joi.ObjectSchema<{data: string}> = Joi.object({
            data: Joi.string().required()
        });
        const req = { body: { data: "lala" } };
        const res = { status: jest.fn().mockReturnThis(), send: jest.fn() };
        const next = jest.fn();

        ObjectValidator.validate(schema)(req as any, res as any, next);
        expect(next).toHaveBeenCalled();
    });

    it("should throw an error", () => {
        const schema: Joi.ObjectSchema<{data: string}> = Joi.object({
            data: Joi.string().required()
        });

        schema.validate = jest.fn(() => {
            throw new Error("error");
        });
        const req = { body: { data: "123" } };
        const res = { status: jest.fn().mockReturnThis(), send: jest.fn() };
        const next = jest.fn();
        ObjectValidator.validate(schema)(req as any, res as any, next);
        expect(res.status).toHaveBeenCalledWith(HttpStatusCode.INTERNAL_SERVER_ERROR);
    });

});