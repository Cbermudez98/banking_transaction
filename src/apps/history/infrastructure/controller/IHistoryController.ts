import { IResponseModel } from "../../../../domain/ResponseModel";
import { HttpStatusCode } from "../../../../utils/HttpStatus";
import { IHistoryUseCase } from "../../domain/application/IHistoryUseCase";
import { IHistoryController } from "../../domain/controller/IHistoryController";

export class HistoryController implements IHistoryController {
    private _historyUseCase: IHistoryUseCase;

    constructor(historyUseCase: IHistoryUseCase) {
        this._historyUseCase = historyUseCase;
    }
    async getHistory(accountNumber: number): Promise<IResponseModel> {
        try {
            const transactions = await this._historyUseCase.getHistoryTransactions(accountNumber);
            return {
                status: HttpStatusCode.RESPONSE_SUCCESS,
                data: { transactions }
            }
        } catch (error) {
            const err = <Error>error;
            throw {
                status: HttpStatusCode.INTERNAL_SERVER_ERROR,
                message: err.message
            }
        }
    };
}