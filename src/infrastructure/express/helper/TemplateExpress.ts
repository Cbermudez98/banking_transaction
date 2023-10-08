import express, { Application, Router } from "express";
import cors from "cors";
import { FrameworkConfig } from "../config/FrameworkConfig";
import Constant from "../../../utils/Constant";
import { RouterModel } from "../model/RouterModel";
import log from "../../../helper/LoggerServer";

export abstract class TemplateExpress {
    private _frameworkConfig: FrameworkConfig;
    private _app: Application;
    private _router: Router;
    protected constructor() {
        this._frameworkConfig = new FrameworkConfig();
        this._app = this._frameworkConfig.getApp();
        this._router = this._frameworkConfig.getRoute();
        this.setUp();
    }

    public abstract setRoutes(): void;

    public async registerRoute(routerPath: string, route: string): Promise<void> {
        log.warn(routerPath);
        const routerModel: RouterModel = await import(routerPath).then((imp) => imp.default);
        this.setRoute(routerModel.register(this._router), route);
    }

    public listen(): void {
        this._frameworkConfig.listen(this._app);
    }

    private setRoute(route: Router, name: string) {
        this._app.use(`${this._app.get("API_VERSION")}/${name}`, route);
    }

    private setUp(): void {
        this._app.set("PORT", Constant.PORT);
        this._app.set('API_VERSION', `/api/${Constant.API_VERSION}`);
        this.setMiddlewares();
        this.setRoutes();
    }

    private setMiddlewares() {
        this._app.use(express.json());
        this._app.use(cors());
    }
}