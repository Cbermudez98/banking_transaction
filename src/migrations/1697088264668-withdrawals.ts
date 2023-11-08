import { MigrationInterface, QueryRunner } from "typeorm";

export class Withdrawals1697088264668 implements MigrationInterface {
    name = 'Withdrawals1697088264668'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`withdrawal\` (\`id\` int NOT NULL AUTO_INCREMENT, \`amount\` int NOT NULL, \`createdDate\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(), \`accountId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`withdrawal\` ADD CONSTRAINT \`FK_797effdb4ea68472c51bdb9ce40\` FOREIGN KEY (\`accountId\`) REFERENCES \`account\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`withdrawal\` DROP FOREIGN KEY \`FK_797effdb4ea68472c51bdb9ce40\``);
        await queryRunner.query(`DROP TABLE \`withdrawal\``);
    }

}
