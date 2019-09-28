import {MigrationInterface, QueryRunner} from "typeorm";

export class Migration1569645015792 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "post" DROP CONSTRAINT "FK_383f47c98d6fc3e18786e00ed41"`);
        await queryRunner.query(`ALTER TABLE "post" DROP COLUMN "content"`);
        await queryRunner.query(`ALTER TABLE "post" DROP COLUMN "images"`);
        await queryRunner.query(`ALTER TABLE "post" DROP COLUMN "rating"`);
        await queryRunner.query(`ALTER TABLE "post" DROP COLUMN "tags"`);
        await queryRunner.query(`ALTER TABLE "post" DROP COLUMN "location"`);
        await queryRunner.query(`ALTER TABLE "post" DROP COLUMN "location_search"`);
        await queryRunner.query(`ALTER TABLE "post" DROP COLUMN "userUserId"`);
        await queryRunner.query(`ALTER TABLE "post" ADD "user_id" integer`);
        await queryRunner.query(`ALTER TABLE "post" ADD CONSTRAINT "FK_52378a74ae3724bcab44036645b" FOREIGN KEY ("user_id") REFERENCES "user"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "post" DROP CONSTRAINT "FK_52378a74ae3724bcab44036645b"`);
        await queryRunner.query(`ALTER TABLE "post" DROP COLUMN "user_id"`);
        await queryRunner.query(`ALTER TABLE "post" ADD "userUserId" integer`);
        await queryRunner.query(`ALTER TABLE "post" ADD "location_search" text NOT NULL`);
        await queryRunner.query(`ALTER TABLE "post" ADD "location" text NOT NULL`);
        await queryRunner.query(`ALTER TABLE "post" ADD "tags" text array NOT NULL`);
        await queryRunner.query(`ALTER TABLE "post" ADD "rating" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "post" ADD "images" text array NOT NULL`);
        await queryRunner.query(`ALTER TABLE "post" ADD "content" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "post" ADD CONSTRAINT "FK_383f47c98d6fc3e18786e00ed41" FOREIGN KEY ("userUserId") REFERENCES "user"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
