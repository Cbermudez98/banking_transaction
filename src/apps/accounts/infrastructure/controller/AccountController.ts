import { HttpStatusCode } from './../../../../utils/HttpStatus';
import { IAccountController } from "../../domain/Controller/IAccountController";
import { IResponseModel } from "../../../../domain/ResponseModel";
import { IAccountCreateDto } from "../../domain/IAccount";
import { IAccountUseCase } from '../../domain/application/IAccountUseCase';

export class AccountController implements IAccountController {
    private _accountUseCase: IAccountUseCase;
    
    constructor(accountUseCase: IAccountUseCase) {
        this._accountUseCase = accountUseCase;
    }

    async createAccount(account: IAccountCreateDto): Promise<IResponseModel> {
        try {
            const createdAccount = await this._accountUseCase.save(account);
            return {
                status: HttpStatusCode.RESPONSE_SUCCESS,
                data: createdAccount
            };
        } catch (error) {
            throw {
                status: HttpStatusCode.UN_PROCESSABLE_ENTITY,
                message: "Error creating account"
            }
        }
    }

    async getAccount(accountNumber: number): Promise<IResponseModel> {
        try {
            const response = await this._accountUseCase.getAccount(accountNumber);
            return {
                status: HttpStatusCode.RESPONSE_SUCCESS,
                data: { balance: response.openingBalance }
            };
        } catch (error) {
            const err = <Error>error;
            throw {
                status: HttpStatusCode.NOT_FOUND,
                message: err.message
            };
        }
    };
}