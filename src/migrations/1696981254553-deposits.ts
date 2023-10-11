import { MigrationInterface, QueryRunner } from "typeorm";

export class Deposits1696981254553 implements MigrationInterface {
    name = 'Deposits1696981254553'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`deposit\` (\`id\` int NOT NULL AUTO_INCREMENT, \`amount\` int NOT NULL, \`createdDate\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP(), \`accountId\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`deposit\` ADD CONSTRAINT \`FK_2162c4005c2ac2294e5f6e9173d\` FOREIGN KEY (\`accountId\`) REFERENCES \`account\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`deposit\` DROP FOREIGN KEY \`FK_2162c4005c2ac2294e5f6e9173d\``);
        await queryRunner.query(`DROP TABLE \`deposit\``);
    }

}
