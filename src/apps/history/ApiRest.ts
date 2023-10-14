import { Router, Request, Response } from "express";
import { RouterModel } from "../../infrastructure/express/model/RouterModel";
import { ResponseHandler } from "../../helper/ResponseHandler";
import { IHistoryUseCase } from "./domain/application/IHistoryUseCase";
import { IHistoryRepository } from "./domain/repository/IHistoryRepository";
import { IHistoryController } from "./domain/controller/IHistoryController";
import { HistoryRepository } from "./infrastructure/repository/HistoryTransactionRepository";
import { HistoryUseCase } from "./application/HistoryUseCase";
import { HistoryController } from "./infrastructure/controller/IHistoryController";
import { FrameworkConfig } from "../../infrastructure/express/config/FrameworkConfig";

class History implements RouterModel {
    private _historyUseCase: IHistoryUseCase;
    private _historyRepository: IHistoryRepository;
    private _historyController: IHistoryController;
    private _router: Router;
    constructor() {
        this._historyRepository = new HistoryRepository();
        this._historyUseCase = new HistoryUseCase(this._historyRepository);
        this._historyController = new HistoryController(this._historyUseCase);
        this._router = new FrameworkConfig().getRoute();
    }
    register(): Router {
         /**
         * @swagger
         * /api-v1/history/{accountNumber}:
         *   get:
         *       summary: Get history of transactions for an account
         *       tags:
         *           - Example endpoints
         *       description: Return all transactions
         *       parameters:
         *           - in: path
         *             name: accountNumber
         *             required: true
         *             schema:
         *               type: string
         *               format: string
         *       responses:
         *           '200':
         *               description: Current a deposit
         *               content:
         *                   'application/json':
         *                       schema:
         *                           $ref: '#definitions/historyTransactionArray'
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
         *                           description: Bad request
         *                           properties:
         *                               error: 
         *                                   type: string
         *               example:
         *                   error: Internal server error
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
        this._router.get('/:accountNumber', (req: Request, res: Response) => {
            ResponseHandler.response(this._historyController.getHistory(Number(req.params.accountNumber)), req, res);
        });
        return this._router;
    }
}

export default new History();