import { FrameworkConfig } from "../../../../../src/infrastructure/express/config/FrameworkConfig";
import express, { Router } from "express";
describe("Framework config", () => {
    it('should return an instance of express application when calling getApp()', () => {
        const config = new FrameworkConfig();
        const spy = jest.spyOn(config, "getApp");
        const app = express();

        spy.mockImplementation(() => {
            return app;
        });
        expect(config.getApp()).toBe(app);
        spy.mockReset();
    });

    it("should return router when call getRoute()", () => {
        const config = new FrameworkConfig();
        const spy = jest.spyOn(config, "getRoute");

        const router = Router();
        spy.mockImplementation(() => {
            return router;
        });
        expect(config.getRoute()).toBe(router);
        spy.mockReset();
    });

    it('should start listening on specified port', () => {
        const app = new FrameworkConfig().getApp();
        const mockListen = jest.spyOn(app, 'listen');  
        app.listen(3000);
  
        expect(mockListen).toHaveBeenCalled();
        mockListen.mockReset();
    });
});