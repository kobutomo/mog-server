import { MigrationInterface, QueryRunner } from "typeorm";

export class DeleteFrag1568195154716 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "login" character varying NOT NULL, "password" character varying NOT NULL, CONSTRAINT "UQ_a62473490b3e4578fd683235c5e" UNIQUE ("login"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`DROP TABLE "user"`);
  }

}
