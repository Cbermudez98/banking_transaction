import { TemplateExpress } from "../../../../../src/infrastructure/express/helper/TemplateExpress";

describe("template express", () => {
    it("should instance Template express successfully", () => {
        class TestMock extends TemplateExpress {
            constructor() {
                super();
            }
            public listen(): void {
                
            }

            public async registerRoute(routerPath: string, route: string): Promise<void> {
                
            }

            public setRoutes(): void {
                
            }
        }

        const test = new TestMock();
        expect(test).toBeInstanceOf(TemplateExpress);
    });
});