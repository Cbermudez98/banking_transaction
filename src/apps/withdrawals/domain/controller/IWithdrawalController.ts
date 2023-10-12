import { IResponseModel } from "../../../../domain/ResponseModel";
import { IAccount } from "../../../accounts/domain/IAccount";
import { IWithdrawal, IWithdrawalCreate } from "../IWithdrawal";

export interface IWithdrawalController {
    generateCashOut: (withdrawal: IWithdrawalCreate, accountNumber: IAccount["accountNumber"]) => Promise<IResponseModel>;
}