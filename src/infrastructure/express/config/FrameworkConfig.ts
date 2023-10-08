import express, { Application, Router } from "express";
import log from "../../../helper/LoggerServer";

export class FrameworkConfig {
    private _app: Application;
    private _route: Router;
    constructor() {
        this._app = express();
        this._route = Router();
    }

    public getApp(): Application {
        return this._app;
    }

    public getRoute(): Router {
        return this._route;
    }

    public listen(app: Application): void {
        app.listen(app.get("PORT"), () => {
            log.info(`Server running at http://localhost:${app.get("PORT")}${app.get('API_VERSION')}`);
        });
    }
}