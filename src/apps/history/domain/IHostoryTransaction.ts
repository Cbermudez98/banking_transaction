import { IDeposit } from "../../deposits/domain/IDeposit";

export interface IHistoryTransaction extends IDeposit {
    typeTransaction: string;
}