import { IResponseModel } from "../../../../domain/ResponseModel";
import { HttpStatusCode } from "../../../../utils/HttpStatus";
import { IWithdrawalCreate } from "../../domain/IWithdrawal";
import { IWithdrawalController } from "../../domain/controller/IWithdrawalController";
import { IWithdrawalUseCase } from "../../domain/usecase/IWithdrawalUseCase";

export class WithdrawalController implements IWithdrawalController {
    private _withdrawalUseCase: IWithdrawalUseCase;
    constructor(withdrawalUseCase: IWithdrawalUseCase) {
        this._withdrawalUseCase = withdrawalUseCase;
    }

    async generateCashOut(withdrawal: IWithdrawalCreate, accountNumber: number): Promise<IResponseModel> {
        try {
            const data = await this._withdrawalUseCase.generateCashOut(withdrawal, accountNumber);
            return {
                status: HttpStatusCode.RESPONSE_SUCCESS,
                data
            }
        } catch (error) {
            const err = <Error>error;
            throw {
                status: HttpStatusCode.UN_PROCESSABLE_ENTITY,
                message: err?.message || "Error performing transaction"
            };
        }
    };
}