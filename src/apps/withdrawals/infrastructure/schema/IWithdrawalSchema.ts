import Joi from "joi";
import { IWithdrawalCreate } from "../../domain/IWithdrawal";

const amount = Joi.number().min(0);

export const withdrawalSchema: Joi.ObjectSchema<IWithdrawalCreate> = Joi.object({
    amount: amount.required()
});