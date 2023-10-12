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

class Deposit implements RouterModel {
    private _depositController: IDepositController;
    constructor() {
        const depositRepository: IDepositRepository = new DepositRepository();
        const useCase: IDepositUseCase = new DepositUseCase(depositRepository);
        this._depositController = new DepositController(useCase);
    }
    register(route: Router): Router {
        route.post("/:accountNumber", ObjectValidator.validate(amountCreateDtoSchema), (req, res) => {
            ResponseHandler.response(this._depositController.generateDeposit(req.body, Number(req.params.accountNumber)), req, res);
        });
        return route;
    }
}

export default new Deposit();