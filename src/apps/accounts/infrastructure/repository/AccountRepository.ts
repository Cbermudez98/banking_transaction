import { Repository } from "typeorm";
import { AccountEntity } from "../entity/Account.entity";
import { appDataSource } from "./../../../../infrastructure/typeorm/typeorm";
import { IAccountRepository } from "../../domain/repository/IAccountRepository";
import { IAccount, IAccountCreateDto } from "../../domain/IAccount";

export class AccountRepository implements IAccountRepository {
    private _accountRepository: Repository<AccountEntity>;
    constructor() {
        this._accountRepository = appDataSource.getRepository(AccountEntity);
    }

    async createAccount(account: IAccountCreateDto): Promise<IAccount> {
        try {
            const newAccount = this._accountRepository.create(account);
            return await this._accountRepository.save(newAccount);
        } catch (error) {
            throw error;
        }
    }

    async getAccount(accountNumber: number): Promise<IAccount | null> {
        try {
            return await this._accountRepository.findOne({ where: { accountNumber } });
        } catch (error) {
            throw error;
        }
    };
}