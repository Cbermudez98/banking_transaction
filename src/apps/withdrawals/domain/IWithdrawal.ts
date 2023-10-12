import { IDeposit } from "../../deposits/domain/IDeposit";

export interface IWithdrawal extends IDeposit {};

export interface IWithdrawalCreate extends Pick<IWithdrawal, "amount"> {};