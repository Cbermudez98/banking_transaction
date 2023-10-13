import { Router } from "express";
import Server from "../../../../src/infrastructure/express/Server";
import { TemplateExpress } from "../../../../src/infrastructure/express/helper/TemplateExpress";
import { RouterModel } from "../../../../src/infrastructure/express/model/RouterModel";
import Constant from "../../../../src/utils/Constant";

describe("Server test", () => {
    it("should instantiate Server successfully", () => {
        const server = Server;
        expect(server).toBeInstanceOf(TemplateExpress);
    });

    it('should call setRoutes() method successfully', () => {
        const server = Server;
        const setRoutesSpy = jest.spyOn(server, 'setRoutes');
        server.setRoutes();
        expect(setRoutesSpy).toHaveBeenCalled();
        setRoutesSpy.mockReset();
    });
});