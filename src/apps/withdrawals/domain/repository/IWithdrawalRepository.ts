import { IAccount } from "../../../accounts/domain/IAccount";
import { IWithdrawal, IWithdrawalCreate } from "../IWithdrawal";

export interface IWithdrawalRepository {
    setTransaction: (withdrawal: IWithdrawalCreate, accountNumber: IAccount["accountNumber"]) => Promise<IWithdrawal>;
}