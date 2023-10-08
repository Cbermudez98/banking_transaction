import { DataSource } from "typeorm";
import Constant from "../../utils/Constant";
import { globSync } from "glob";
import { join } from "path";

const entities: string[] = globSync("./src/apps/**/infrastructure/entity/*.entity.{js,ts}")
    .map((routes: string) => join(process.cwd(), routes));

export const appDataSource: DataSource = new DataSource({
    type: Constant.DB_DIALECT as any,
    host: Constant.DB_HOST,
    port: Number(Constant.DB_PORT),
    password: Constant.DB_PASSWORD,
    username: Constant.DB_USERNAME,
    database: Constant.DB_DATABASE,
    entities,
    migrations: [
        join(process.cwd(), "src/migrations/**/*.ts")
    ],
    migrationsTableName: "migration_table",
    synchronize: false
});