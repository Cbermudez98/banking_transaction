import { IResponseModel } from './../../../../domain/ResponseModel';
import { IAccount } from "../../../accounts/domain/IAccount";

export interface IHistoryController {
    getHistory: (accountNumber: IAccount["accountNumber"]) => Promise<IResponseModel>;
}