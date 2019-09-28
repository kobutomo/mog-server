import {MigrationInterface, QueryRunner} from "typeorm";

export class Migration1569644748110 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_6322e69009fa8c98239d8b9dd6e"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "UQ_6322e69009fa8c98239d8b9dd6e"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "post_id"`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "user" ADD "post_id" integer`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "UQ_6322e69009fa8c98239d8b9dd6e" UNIQUE ("post_id")`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_6322e69009fa8c98239d8b9dd6e" FOREIGN KEY ("post_id") REFERENCES "post"("post_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
