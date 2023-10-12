import { IResponseModel } from "../../../../domain/ResponseModel";
import { IAccount } from "../../../accounts/domain/IAccount";
import { IDepositCreateDto } from "../IDeposit";

export interface IDepositController {
    generateDeposit: (deposit: IDepositCreateDto, accountNumber: IAccount["accountNumber"]) => Promise<IResponseModel>;
}