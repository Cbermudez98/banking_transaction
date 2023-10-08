import { config } from "dotenv";
config();

export default class Constant {
    static PORT = process?.env?.PORT || 3000;
    static API_VERSION = process?.env?.API_VERSION || "v1";
    static DB_DIALECT = process?.env?.DB_DIALECT || "test";
    static DB_USERNAME = process?.env?.DB_USERNAME || "test";
    static DB_PASSWORD = process?.env?.DB_PASSWORD || "test";
    static DB_DATABASE = process?.env?.DB_DATABASE || "test";
    static DB_HOST = process?.env?.DB_HOST || "test";
    static DB_PORT = process?.env?.DB_PORT || 3306;
    static JWT_KEY = process?.env?.JWT_KEY || "test";
}