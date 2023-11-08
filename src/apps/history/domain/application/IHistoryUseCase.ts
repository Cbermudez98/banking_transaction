import { IHistoryTransaction } from './../IHostoryTransaction';
import { IAccount } from "../../../accounts/domain/IAccount";

export interface IHistoryUseCase {
    getHistoryTransactions: (accountNumber: IAccount["accountNumber"]) => Promise<IHistoryTransaction[]>
}