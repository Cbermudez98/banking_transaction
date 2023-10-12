import { IDepositCreateDto, IDeposit } from "../domain/IDeposit";
import { IDepositRepository } from "../domain/repository/IDepositRepository";
import { IDepositUseCase } from "../domain/usecase/IDepositUseCase";

export class DepositUseCase implements IDepositUseCase {
    private _depositRepository: IDepositRepository;
    constructor(depositRepository: IDepositRepository) {
        this._depositRepository = depositRepository;
    }

    async saveDeposit(deposit: IDepositCreateDto, accountNumber: number): Promise<IDeposit> {
        try {
            return await this._depositRepository.generateTransaction(deposit, accountNumber);
        } catch (error) {
            throw error;
        }
    };
}