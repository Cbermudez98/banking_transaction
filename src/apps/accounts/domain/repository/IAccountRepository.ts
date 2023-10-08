import { IAccount, IAccountCreateDto } from "../IAccount";

export interface IAccountRepository {
    createAccount: (account: IAccountCreateDto) => Promise<IAccount>;
    getAccount: (accountNumber: IAccount['accountNumber']) => Promise<IAccount | null>;
}