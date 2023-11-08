import { IAccount } from "../../../accounts/domain/IAccount";
import { IDeposit, IDepositCreateDto } from "../IDeposit";

export interface IDepositUseCase {
    saveDeposit: (deposit: IDepositCreateDto, accountNumber: IAccount['accountNumber']) => Promise<IDeposit>;
}