import { Router, Request, Response } from "express";
import { RouterModel } from "../../infrastructure/express/model/RouterModel";
import { ResponseHandler } from "../../helper/ResponseHandler";
import { IHistoryUseCase } from "./domain/application/IHistoryUseCase";
import { IHistoryRepository } from "./domain/repository/IHistoryRepository";
import { IHistoryController } from "./domain/controller/IHistoryController";
import { HistoryRepository } from "./infrastructure/repository/HistoryTransactionRepository";
import { HistoryUseCase } from "./application/HistoryUseCase";
import { HistoryController } from "./infrastructure/controller/IHistoryController";

class History implements RouterModel {
    private _historyUseCase: IHistoryUseCase;
    private _historyRepository: IHistoryRepository;
    private _historyController: IHistoryController;
    constructor() {
        this._historyRepository = new HistoryRepository();
        this._historyUseCase = new HistoryUseCase(this._historyRepository);
        this._historyController = new HistoryController(this._historyUseCase);
    }
    register(route: Router): Router {
        route.get('/:accountNumber', (req: Request, res: Response) => {
            ResponseHandler.response(this._historyController.getHistory(Number(req.params.accountNumber)), req, res);
        });
        return route;
    }
}

export default new History();