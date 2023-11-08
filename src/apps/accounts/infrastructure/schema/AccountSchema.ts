import Joi from "joi";
import { IAccountCreateDto } from "./../../domain/IAccount";

const ownerName = Joi.string();
const openingBalance = Joi.number();

/**
 * @swagger
 * definitions:
 *  accountSchemaCreate:
 *      type: object
 *      properties:
 *          openingBalance:
 *              type: number
 *              required: true
 *          ownerName:
 *              type: string
 *              required: true
 */
export const accountSchemaCreate: Joi.ObjectSchema<IAccountCreateDto> = Joi.object({
    openingBalance: openingBalance.required(),
    ownerName: ownerName.required(),
});