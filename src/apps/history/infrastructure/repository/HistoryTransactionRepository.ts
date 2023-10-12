import { Repository } from 'typeorm';
import { IHistoryTransaction } from "../../domain/IHostoryTransaction";
import { IHistoryRepository } from "../../domain/repository/IHistoryRepository";
import { AccountEntity } from '../../../accounts/infrastructure/entity/Account.entity';
import { appDataSource } from '../../../../infrastructure/typeorm/typeorm';

export class HistoryRepository implements IHistoryRepository {
    private _accountRepository: Repository<AccountEntity>;
    constructor() {
        this._accountRepository = appDataSource.getRepository(AccountEntity);
    }
    async mergeAllTransactions(accountNumber: number): Promise<IHistoryTransaction[]> {
        try {
            const data = await this._accountRepository.find({
                relations: ["deposits", "withdrawals"],
                where: { accountNumber }
            });
            const transactions: IHistoryTransaction[] = data[0].withdrawals.map((withdrawal) => ({ ...withdrawal, typeTransaction: "withdrawal" }))
                .concat(data[0].deposits.map(item => ({ ...item, typeTransaction: "deposit"})));
            ;
            return transactions;
        } catch (error) {
            throw error;
        }
    }
}