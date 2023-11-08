import Joi from "joi";
import { IDepositCreateDto } from "../../domain/IDeposit";

const amount = Joi.number().min(0);

/**
 * @swagger
 * definitions:
 *  depositSchemaCreate:
 *      type: object
 *      properties:
 *          amount:
 *              type: number
 *              required: true
 */
export const amountCreateDtoSchema: Joi.ObjectSchema<IDepositCreateDto> = Joi.object({
    amount: amount.required()
});