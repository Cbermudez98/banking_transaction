import Joi from "joi";
import { IDepositCreateDto } from "../../domain/IDeposit";

const amount = Joi.number().min(0);

export const amountCreateDtoSchema: Joi.ObjectSchema<IDepositCreateDto> = Joi.object({
    amount: amount.required()
});