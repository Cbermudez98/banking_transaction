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
        /**
         * @swagger
         * /api-v1/accounts/balance/{accountNumber}:
         *   get:
         *       summary: Get balance from an account
         *       tags:
         *           - Example endpoints
         *       description: Set the request, and the API must return the current balance
         *       parameters:
         *           - in: path
         *             name: accountNumber
         *             required: true
         *             schema:
         *               type: string
         *               format: string
         *       responses:
         *           '200':
         *               description: Current account's balance
         *               content:
         *                   'application/json':
         *                       schema:
         *                           type: object
         *                           description: Account balance
         *                           properties:
         *                               balance:
         *                                   type: number
         *               example:
         *                   balance: 500
         *           '422':
         *               description: Error creating account
         *               content:
         *                   'application/json':
         *                       schema:
         *                           type: object
         *                           description: Account balance
         *                           properties:
         *                               error: 
         *                                   type: string
         *               example:
         *                   error: Error creating account
         *           '500':
         *               description: Internal server error
         *               content:
         *                   'application/json':
         *                       schema:
         *                           type: object
         *                           description: Account balance
         *                           properties:
         *                               error: 
         *                                   type: string
         *               example:
         *                   error: Internal server error
         */
        route.get("/balance/:accountNumber", (req: Request, res: Response) => {
            ResponseHandler.response(this._accountController.getAccount(Number(req.params.accountNumber)), req, res);
        });
        /**
         * @swagger
         * /api-v1/accounts/:
         *   post:
         *       summary: Create an account
         *       tags:
         *           - Example endpoints
         *       description: Set the request, and the API must return the new account
         *       requestBody:
         *           content:
         *             application/json:
         *              schema:
         *               $ref: '#/definitions/accountSchemaCreate'
         *       responses:
         *           '200':
         *               description: Current account's balance
         *               content:
         *                   'application/json':
         *                       schema:
         *                           type: object
         *                           description: Account balance
         *                           properties:
         *                               id: 
         *                                   type: number
         *                               ownerName:
         *                                   type: string
         *                               openingBalance:
         *                                   type: number
         *                               accountNumber:
         *                                   type: number
         *               example:
         *                   ownerName: lala
         *                   openingBalance: 500
         *                   accountNumber: 9999999
         *                   id: 1
         *           '400':
         *               description: Bad request
         *               content:
         *                   'application/json':
         *                       schema:
         *                           type: object
         *                           description: Account balance
         *                           properties:
         *                               error: 
         *                                   type: string
         *               example:
         *                   error: property must be
         *           '500':
         *               description: Internal server error
         *               content:
         *                   'application/json':
         *                       schema:
         *                           type: object
         *                           description: Account balance
         *                           properties:
         *                               error: 
         *                                   type: string
         *               example:
         *                   error: Internal server error
         */
        route.post('/', ObjectValidator.validate(accountSchemaCreate), (req: Request, res: Response) => {
            ResponseHandler.response(this._accountController.createAccount(req.body), req, res);
        });
        return route;
    }
}

export default new Account();