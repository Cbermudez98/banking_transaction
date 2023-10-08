import Joi from "joi";
import { IAccountCreateDto } from "./../../domain/IAccount";

const ownerName = Joi.string();
const openingBalance = Joi.number();

export const accountSchemaCreate: Joi.ObjectSchema<IAccountCreateDto> = Joi.object({
    openingBalance: openingBalance.required(),
    ownerName: ownerName.required(),
});