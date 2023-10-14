import { Request, Response, Router } from "express";
import { RouterModel } from "../../infrastructure/express/model/RouterModel";
import { IWithdrawalController } from "./domain/controller/IWithdrawalController";
import { IWithdrawalUseCase } from "./domain/usecase/IWithdrawalUseCase";
import { IWithdrawalRepository } from "./domain/repository/IWithdrawalRepository";
import { WithdrawalRepository } from "./infrastructure/repository/WithdrawalRepository";
import { WithdrawalUseCase } from "./application/WithdrawalUseCase";
import { WithdrawalController } from "./infrastructure/controller/WithdrawalController";
import { ObjectValidator } from "../../utils/ObjectValidateMiddleware";
import { withdrawalSchema } from "./infrastructure/schema/IWithdrawalSchema";
import { ResponseHandler } from "../../helper/ResponseHandler";
import log from "../../helper/LoggerServer";
import { FrameworkConfig } from "../../infrastructure/express/config/FrameworkConfig";

class Withdrawal implements RouterModel {
    private _withdrawalController: IWithdrawalController;
    private _withdrawalUseCase: IWithdrawalUseCase;
    private _withdrawalRepository: IWithdrawalRepository;
    private _router: Router;
    constructor() {
        this._withdrawalRepository = new WithdrawalRepository();
        this._withdrawalUseCase = new WithdrawalUseCase(this._withdrawalRepository);
        this._withdrawalController = new WithdrawalController(this._withdrawalUseCase);
        this._router = new FrameworkConfig().getRoute();
    }
    register(): Router {
        /**
         * @swagger
         * /api-v1/withdrawals/{accountNumber}:
         *   post:
         *       summary: Generate a withdrawal to an account
         *       tags:
         *           - Example endpoints
         *       description: Set the request, and the API must return the new balance
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
         *               $ref: '#/definitions/withdrawalSchemaCreate'
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
         *               description: Error withdrawal
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
        this._router.post("/:accountNumber", ObjectValidator.validate(withdrawalSchema), (req: Request, res: Response) => {
            ResponseHandler.response(this._withdrawalController.generateCashOut(req.body, Number(req.params.accountNumber)), req, res);
        });
        return this._router;
    }
}

export default new Withdrawal();