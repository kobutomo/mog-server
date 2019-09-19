import {MigrationInterface, QueryRunner} from "typeorm";

export class LoginToEmail1568551245152 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "user" RENAME COLUMN "login" TO "email"`);
        await queryRunner.query(`ALTER TABLE "user" RENAME CONSTRAINT "UQ_a62473490b3e4578fd683235c5e" TO "UQ_e12875dfb3b1d92d7d7c5377e22"`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "user" RENAME CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" TO "UQ_a62473490b3e4578fd683235c5e"`);
        await queryRunner.query(`ALTER TABLE "user" RENAME COLUMN "email" TO "login"`);
    }

}
