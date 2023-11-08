import { IAccount } from "../../../accounts/domain/IAccount";
import { IWithdrawal, IWithdrawalCreate } from "../IWithdrawal";

export interface IWithdrawalUseCase {
    generateCashOut: (withdrawal: IWithdrawalCreate, accountNumber: IAccount["accountNumber"]) => Promise<IWithdrawal>;
}