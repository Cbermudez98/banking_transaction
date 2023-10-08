import { ILogObj, Logger } from "tslog";

class LoggerServer {
    private _logger: Logger<ILogObj>;
    constructor() {
        this._logger = new Logger<ILogObj>({
            type: "pretty"
        })
    }

    public info(...args: unknown[]): void {
        this._logger.info(...args);
    }

    public warn(...args: unknown[]): void {
        this._logger.warn(...args);
    }

    public error(...args: unknown[]) {
        this._logger.error(...args);
    }
}

const log = new LoggerServer()

export default log;