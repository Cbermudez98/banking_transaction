import { join } from 'path';
import { globSync } from 'glob';
import SwaggerJsDoc from 'swagger-jsdoc';
import * as SwaggerUI from "swagger-ui-express";
import express, { Application, Router } from "express";
import cors from "cors";
import { FrameworkConfig } from "../config/FrameworkConfig";
import Constant from "../../../utils/Constant";
import { RouterModel } from "../model/RouterModel";
import log from '../../../helper/LoggerServer';

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
        const routerModel: RouterModel = await import(routerPath).then((imp) => imp.default);
        this.setRoute(routerModel.register(), route);
    }

    public listen(): void {
        this._frameworkConfig.listen(this._app);
    }

    private setRoute(route: Router, name: string) {
        const swagger = this.initSwagger();
        this._app.use(`${this._app.get("API_VERSION")}/${name}`, route);
        this._app.use(`/api-docs`, SwaggerUI.serve, SwaggerUI.setup(SwaggerJsDoc(swagger)));
    }

    private setUp(): void {
        this._app.set("PORT", Constant.PORT);
        this._app.set('API_VERSION', `/api-${Constant.API_VERSION}`);
        this.setMiddlewares();
        this.setRoutes();
    }

    private setMiddlewares() {
        this._app.use(express.json());
        this._app.use(cors());
    }

    private initSwagger(){
        return {
            definition: {
                openapi: "3.0.1",
                info: {
                    version: "1.0.0",
                    title: "banking transaction",
                    description: "Using Mysql TCL",
                    contact: {
                        name: "Cesar Bermudez",
                        email: "cesar.bermudez.sierra@gmail.com",
                        url: "https://www.linkedin.com/in/cesar-bermudez-sierra/"
                    },
                    servers: [ `http://localhost:${this._app.get("PORT")}${this._app.get("API_VERSION")}` ],
                    schemes: ["http", "https"],
                },
                basePath: "/",
            },
            apis: [
                ...globSync('src/apps/**/ApiRest.{ts, js}').map((route: string) => join(process.cwd(), route)),
                ...globSync('src/apps/**/infrastructure/schema/*.{ts, js}').map((route: string) => join(process.cwd(), route))
            ],
        };
    }
}