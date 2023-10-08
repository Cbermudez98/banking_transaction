import { IResponseModel } from "../../../../domain/ResponseModel";
import { IAccountCreateDto } from "../IAccount";

export interface IAccountController {
    createAccount: (account: IAccountCreateDto) => Promise<IResponseModel>;
}