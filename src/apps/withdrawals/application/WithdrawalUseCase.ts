import { IResponseModel } from "../../../domain/ResponseModel";
import { IWithdrawal, IWithdrawalCreate } from "../domain/IWithdrawal";
import { IWithdrawalController } from "../domain/controller/IWithdrawalController";
import { IWithdrawalRepository } from "../domain/repository/IWithdrawalRepository";
import { IWithdrawalUseCase } from "../domain/usecase/IWithdrawalUseCase";

export class WithdrawalUseCase implements IWithdrawalUseCase {
    private _withdrawalRepository: IWithdrawalRepository;
    constructor(withDrawalRepository: IWithdrawalRepository) {
        this._withdrawalRepository = withDrawalRepository;
    }
    async generateCashOut(withdrawal: IWithdrawalCreate, accountNumber: number): Promise<IWithdrawal> {
        try {
            return await this._withdrawalRepository.setTransaction(withdrawal, accountNumber);
        } catch (error) {
            throw error;
        }
    };
}