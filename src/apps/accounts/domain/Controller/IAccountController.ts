import { IResponseModel } from "../../../../domain/ResponseModel";
import { IAccount, IAccountCreateDto } from "../IAccount";

export interface IAccountController {
    createAccount: (account: IAccountCreateDto) => Promise<IResponseModel>;
    getAccount: (accountNumber: IAccount["accountNumber"]) => Promise<IResponseModel>;
}