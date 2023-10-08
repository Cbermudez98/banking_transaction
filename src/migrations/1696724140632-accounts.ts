import { MigrationInterface, QueryRunner } from "typeorm";

export class Accounts1696724140632 implements MigrationInterface {
    name = 'Accounts1696724140632'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`account\` (\`id\` int NOT NULL AUTO_INCREMENT, \`ownerName\` varchar(255) NOT NULL, \`openingBalance\` int NOT NULL, \`accountNumber\` varchar(255) NOT NULL, UNIQUE INDEX \`IDX_ee66d482ebdf84a768a7da36b0\` (\`accountNumber\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_ee66d482ebdf84a768a7da36b0\` ON \`account\``);
        await queryRunner.query(`DROP TABLE \`account\``);
    }

}
