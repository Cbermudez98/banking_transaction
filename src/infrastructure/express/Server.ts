import { globSync } from "glob";
import { TemplateExpress } from "./helper/TemplateExpress";
import { join } from "path";

class Server extends TemplateExpress {
    constructor() {
        super();
    }
    public setRoutes(): void {
        const routes: string[] = globSync('src/apps/**/ApiRest.*');
        routes.forEach((route: string) => this.registerRoute(join(process.cwd(), route), route.split("/").at(-2) || ""));
    }
}

export default new Server();