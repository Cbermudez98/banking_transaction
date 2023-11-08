import { IHistoryTransaction } from "../domain/IHostoryTransaction";
import { IHistoryUseCase } from "../domain/application/IHistoryUseCase";
import { IHistoryRepository } from "../domain/repository/IHistoryRepository";

export class HistoryUseCase implements IHistoryUseCase {
    private _historyRepository: IHistoryRepository;

    constructor(historyRepository: IHistoryRepository) {
        this._historyRepository = historyRepository;
    }

    async getHistoryTransactions(accountNumber: number): Promise<IHistoryTransaction[]> {
        return await this._historyRepository.mergeAllTransactions(accountNumber);
    };
}