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

class Withdrawal implements RouterModel {
    private _withdrawalController: IWithdrawalController;
    private _withdrawalUseCase: IWithdrawalUseCase;
    private _withdrawalRepository: IWithdrawalRepository;
    constructor() {
        this._withdrawalRepository = new WithdrawalRepository();
        this._withdrawalUseCase = new WithdrawalUseCase(this._withdrawalRepository);
        this._withdrawalController = new WithdrawalController(this._withdrawalUseCase);
    }
    register(route: Router): Router {
        route.post("/:accountNumber", ObjectValidator.validate(withdrawalSchema), (req: Request, res: Response) => {
            ResponseHandler.response(this._withdrawalController.generateCashOut(req.body, Number(req.params.accountNumber)), req, res);
        });
        return route;
    }
}

export default new Withdrawal();