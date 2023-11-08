import { Repository } from 'typeorm';
import { IWithdrawalCreate, IWithdrawal } from '../../domain/IWithdrawal';
import { IWithdrawalRepository } from './../../domain/repository/IWithdrawalRepository';
import { WithdrawalEntity } from '../entity/Withdrawal.entity';
import { appDataSource } from '../../../../infrastructure/typeorm/typeorm';
import { IAccountRepository } from '../../../accounts/domain/repository/IAccountRepository';
import { AccountRepository } from '../../../accounts/infrastructure/repository/AccountRepository';
import { AccountEntity } from '../../../accounts/infrastructure/entity/Account.entity';

export class WithdrawalRepository implements IWithdrawalRepository {
    private _withdrawalRepository: Repository<WithdrawalEntity>;
    private _accountRepository: Repository<AccountEntity>;
    constructor() {
        this._withdrawalRepository = appDataSource.getRepository(WithdrawalEntity);
        this._accountRepository = appDataSource.getRepository(AccountEntity);
    }
    async setTransaction(withdrawal: IWithdrawalCreate, accountNumber: number): Promise<IWithdrawal> {
        const queryRunner = appDataSource.createQueryRunner();
        await queryRunner.startTransaction();
        try {
            const account = await this._accountRepository.findOneByOrFail({ accountNumber });
            const newAmount = account.openingBalance - withdrawal.amount;
            if (newAmount < 0) {
                throw new Error("Can't set transaction, not enough balance");
            }

            await this._accountRepository.save({ ...account, openingBalance: newAmount });
            const newWithdrawal = await this._withdrawalRepository.save({ ...withdrawal, account });
            newWithdrawal.account.openingBalance = newAmount;
            return newWithdrawal;
        } catch (error) {
            await queryRunner.rollbackTransaction();
            throw error;
        }
    };
}