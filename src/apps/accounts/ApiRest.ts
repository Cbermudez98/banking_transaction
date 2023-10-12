import { Request, Response, Router } from "express";

import { RouterModel } from "../../infrastructure/express/model/RouterModel";
import { ObjectValidator } from "../../utils/ObjectValidateMiddleware";
import { accountSchemaCreate } from "./infrastructure/schema/AccountSchema";
import { ResponseHandler } from "../../helper/ResponseHandler";
import { IAccountController } from "./domain/Controller/IAccountController";
import { AccountController } from "./infrastructure/controller/AccountController";
import { IAccountUseCase } from "./domain/application/IAccountUseCase";
import { AccountUseCase } from "./application/AccountUseCase";
import { IAccountRepository } from "./domain/repository/IAccountRepository";
import { AccountRepository } from "./infrastructure/repository/AccountRepository";

class Account implements RouterModel {
    private _accountController: IAccountController;
    private _accountUseCase: IAccountUseCase;
    private _accountRepository: IAccountRepository;

    constructor() {
        this._accountRepository = new AccountRepository();
        this._accountUseCase = new AccountUseCase(this._accountRepository);
        this._accountController = new AccountController(this._accountUseCase);
    }
    
    register(route: Router): Router {
        route.get("/balance/:accountNumber", (req: Request, res: Response) => {
            ResponseHandler.response(this._accountController.getAccount(Number(req.params.accountNumber)), req, res);
        });
        route.post('/', ObjectValidator.validate(accountSchemaCreate), (req: Request, res: Response) => {
            ResponseHandler.response(this._accountController.createAccount(req.body), req, res);
        });
        return route;
    }
}

export default new Account();