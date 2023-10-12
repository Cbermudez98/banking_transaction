import { IResponseModel } from "../../../../domain/ResponseModel";
import log from "../../../../helper/LoggerServer";
import { HttpStatusCode } from "../../../../utils/HttpStatus";
import { IDepositCreateDto } from "../../domain/IDeposit";
import { IDepositController } from "../../domain/controller/IDepositController";
import { IDepositUseCase } from "../../domain/usecase/IDepositUseCase";

export class DepositController implements IDepositController {
    private _depositUseCase: IDepositUseCase;
    constructor(_depositUseCase: IDepositUseCase) {
        this._depositUseCase = _depositUseCase;
    }
    async generateDeposit(deposit: IDepositCreateDto, accountNumber: number): Promise<IResponseModel> {
        try {
            const response = await this._depositUseCase.saveDeposit(deposit, accountNumber);
            return {
                status: HttpStatusCode.RESPONSE_SUCCESS,
                data: response
            };
        } catch (error) {
            return {
                status: HttpStatusCode.UN_PROCESSABLE_ENTITY,
                data: { error: "Error saving deposits" }
            };
        }
    };
}