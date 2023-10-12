import { IAccount } from "../../../accounts/domain/IAccount";
import { IHistoryTransaction } from "../IHostoryTransaction";

export interface IHistoryRepository {
    mergeAllTransactions: (accountNumber: IAccount["accountNumber"]) => Promise<IHistoryTransaction[]>;
}