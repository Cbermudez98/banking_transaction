import { Router } from "express";
import { RouterModel } from "../../infrastructure/express/model/RouterModel";
import { IDepositController } from "./domain/controller/IDepositController";
import { DepositController } from "./infrastructure/controller/DepositController";
import { IDepositUseCase } from "./domain/usecase/IDepositUseCase";
import { DepositUseCase } from "./application/DepositUseCase";
import { IDepositRepository } from "./domain/repository/IDepositRepository";
import { DepositRepository } from "./infrastructure/repository/DepositRepository";
import { ResponseHandler } from "../../helper/ResponseHandler";
import { ObjectValidator } from "../../utils/ObjectValidateMiddleware";
import { amountCreateDtoSchema } from "./infrastructure/schema/DepositSchema";
import { FrameworkConfig } from "../../infrastructure/express/config/FrameworkConfig";
import log from "../../helper/LoggerServer";

class Deposit implements RouterModel {
    private _depositController: IDepositController;
    private _router: Router;
    constructor() {
        const depositRepository: IDepositRepository = new DepositRepository();
        const useCase: IDepositUseCase = new DepositUseCase(depositRepository);
        this._depositController = new DepositController(useCase);
        this._router = new FrameworkConfig().getRoute();
    }
    register(): Router {
        /**
         * @swagger
         * /api-v1/deposits/transaction/{accountNumber}:
         *   post:
         *       summary: Generate a deposit to an account
         *       tags:
         *           - Example endpoints
         *       description: Set the request, and the API must return balance added
         *       parameters:
         *           - in: path
         *             name: accountNumber
         *             required: true
         *             schema:
         *               type: string
         *               format: string
         *       requestBody:
         *           content:
         *             application/json:
         *              schema:
         *               $ref: '#/definitions/depositSchemaCreate'
         *       responses:
         *           '200':
         *               description: Current a deposit
         *               content:
         *                   'application/json':
         *                       schema:
         *                           type: object
         *                           description: Account balance
         *                           properties:
         *                               id: 
         *                                   type: number
         *                               amount:
         *                                   type: number
         *                               createdDate:
         *                                   type: string
         *               example:
         *                   amount: 500
         *                   createdDate: 12/12/2023
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
         *           '422':
         *               description: Error deposit
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
        this._router.post("/:accountNumber", ObjectValidator.validate(amountCreateDtoSchema), (req, res) => {
            log.info(req.originalUrl);
            ResponseHandler.response(this._depositController.generateDeposit(req.body, Number(req.params.accountNumber)), req, res);
        });
        return this._router;
    }
}

export default new Deposit();