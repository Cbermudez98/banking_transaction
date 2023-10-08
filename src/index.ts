import Server from "./infrastructure/express/Server";
import { appDataSource } from "./infrastructure/typeorm/typeorm";

appDataSource.initialize();
Server.listen();