import { IAccount, IAccountCreateDto } from './../IAccount';

export interface IAccountUseCase {
    save: (account: IAccountCreateDto) => Promise<IAccount>;
    getAccount: (accountNumber: IAccount["accountNumber"]) => Promise<IAccount>;
}