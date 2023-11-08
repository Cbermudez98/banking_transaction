import { Repository } from "typeorm";
import { IDepositCreateDto, IDeposit } from "../../domain/IDeposit";
import { IDepositRepository } from "../../domain/repository/IDepositRepository";
import { DepositEntity } from "../entity/Deposit.entity";
import { appDataSource } from "../../../../infrastructure/typeorm/typeorm";
import { AccountEntity } from "../../../accounts/infrastructure/entity/Account.entity";

export class DepositRepository implements IDepositRepository {
    private _depositRepository: Repository<DepositEntity>;
    private _accountRepository: Repository<AccountEntity>;
    
    constructor() {
        this._depositRepository = appDataSource.getRepository(DepositEntity);
        this._accountRepository = appDataSource.getRepository(AccountEntity);
    }

    async generateTransaction(deposit: IDepositCreateDto, accountNumber: number): Promise<IDeposit> {
        const queryRunner = appDataSource.createQueryRunner();
        await queryRunner.startTransaction();
        try {
            const account = await this._accountRepository.findOneByOrFail({ accountNumber });
            const newAmount = account.openingBalance + deposit.amount;
            await this._accountRepository.save({ ...account, openingBalance: newAmount });
            const newDeposit = await this._depositRepository.save({ ...deposit, account });
            newDeposit.account.openingBalance = newAmount;
            await queryRunner.commitTransaction();
            newDeposit.account = undefined as any;
            return newDeposit;
        } catch (error) {
            queryRunner.rollbackTransaction();
            throw error;
        }
    };
}