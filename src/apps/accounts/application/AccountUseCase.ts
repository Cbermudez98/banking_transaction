import { IAccountCreateDto, IAccount } from "../domain/IAccount";
import { IAccountUseCase } from "../domain/application/IAccountUseCase";
import { IAccountRepository } from "../domain/repository/IAccountRepository";

export class AccountUseCase implements IAccountUseCase {
    private _accountRepository: IAccountRepository;
    constructor(accountRepository: IAccountRepository) {
        this._accountRepository = accountRepository;
    }

    async save(account: IAccountCreateDto): Promise<IAccount> {
        const accountNumber = await this.generateNewNumberAccount();
        account.accountNumber = accountNumber;
        return await this._accountRepository.createAccount(account);
    };

    async getAccount(accountNumber: number): Promise<IAccount> {
        try {
            const account = await this._accountRepository.getAccount(accountNumber);
            if (!account) throw new Error("Account not found");
            return account;
        } catch (error) {
            throw error;
        }
    };

    private async generateNewNumberAccount(): Promise<number> {
        const generateRandom = () => Math.floor(Math.random() * 10000000) + 1;
        let found: boolean = false;
        let newAccount = generateRandom();
        do {
            const exist = await this._accountRepository.getAccount(newAccount);
            if (!exist) {
                found = true;
            } else {
                newAccount = generateRandom();
            }
        } while (!found);
        return newAccount;
    }
}