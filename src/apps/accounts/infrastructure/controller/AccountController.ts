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
        const createdAccount = await this._accountUseCase.save(account);
        return {
            status: HttpStatusCode.RESPONSE_SUCCESS,
            data: createdAccount
        };
    }
}