import { IAccount } from "../../../accounts/domain/IAccount";
import { IDeposit, IDepositCreateDto } from "../IDeposit";

export interface IDepositRepository {
    generateTransaction: (deposit: IDepositCreateDto, accountNumber: IAccount['accountNumber']) => Promise<IDeposit>;
}