import {MigrationInterface, QueryRunner} from "typeorm";

export class Migration1569643874345 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "profile" DROP CONSTRAINT "FK_a01219804b10998b0444d357f52"`);
        await queryRunner.query(`ALTER TABLE "post" DROP CONSTRAINT "FK_495034f35adfca3b9577569669a"`);
        await queryRunner.query(`ALTER TABLE "profile" RENAME COLUMN "userIdUserId" TO "user_id"`);
        await queryRunner.query(`ALTER TABLE "profile" RENAME CONSTRAINT "REL_a01219804b10998b0444d357f5" TO "UQ_d752442f45f258a8bdefeebb2f2"`);
        await queryRunner.query(`ALTER TABLE "post" DROP CONSTRAINT "REL_495034f35adfca3b9577569669"`);
        await queryRunner.query(`ALTER TABLE "post" DROP COLUMN "userIdUserId"`);
        await queryRunner.query(`ALTER TABLE "post" ADD "location" text NOT NULL`);
        await queryRunner.query(`ALTER TABLE "post" ADD "location_search" text NOT NULL`);
        await queryRunner.query(`ALTER TABLE "post" ADD "user_id" integer`);
        await queryRunner.query(`ALTER TABLE "user" ADD "profile_id" integer`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "UQ_f44d0cd18cfd80b0fed7806c3b7" UNIQUE ("profile_id")`);
        await queryRunner.query(`ALTER TABLE "user" ADD "post_id" integer`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "UQ_6322e69009fa8c98239d8b9dd6e" UNIQUE ("post_id")`);
        await queryRunner.query(`ALTER TABLE "profile" ADD CONSTRAINT "FK_d752442f45f258a8bdefeebb2f2" FOREIGN KEY ("user_id") REFERENCES "user"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "post" ADD CONSTRAINT "FK_52378a74ae3724bcab44036645b" FOREIGN KEY ("user_id") REFERENCES "user"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_f44d0cd18cfd80b0fed7806c3b7" FOREIGN KEY ("profile_id") REFERENCES "profile"("profile_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_6322e69009fa8c98239d8b9dd6e" FOREIGN KEY ("post_id") REFERENCES "post"("post_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_6322e69009fa8c98239d8b9dd6e"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_f44d0cd18cfd80b0fed7806c3b7"`);
        await queryRunner.query(`ALTER TABLE "post" DROP CONSTRAINT "FK_52378a74ae3724bcab44036645b"`);
        await queryRunner.query(`ALTER TABLE "profile" DROP CONSTRAINT "FK_d752442f45f258a8bdefeebb2f2"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "UQ_6322e69009fa8c98239d8b9dd6e"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "post_id"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "UQ_f44d0cd18cfd80b0fed7806c3b7"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "profile_id"`);
        await queryRunner.query(`ALTER TABLE "post" DROP COLUMN "user_id"`);
        await queryRunner.query(`ALTER TABLE "post" DROP COLUMN "location_search"`);
        await queryRunner.query(`ALTER TABLE "post" DROP COLUMN "location"`);
        await queryRunner.query(`ALTER TABLE "post" ADD "userIdUserId" integer`);
        await queryRunner.query(`ALTER TABLE "post" ADD CONSTRAINT "REL_495034f35adfca3b9577569669" UNIQUE ("userIdUserId")`);
        await queryRunner.query(`ALTER TABLE "profile" RENAME CONSTRAINT "UQ_d752442f45f258a8bdefeebb2f2" TO "REL_a01219804b10998b0444d357f5"`);
        await queryRunner.query(`ALTER TABLE "profile" RENAME COLUMN "user_id" TO "userIdUserId"`);
        await queryRunner.query(`ALTER TABLE "post" ADD CONSTRAINT "FK_495034f35adfca3b9577569669a" FOREIGN KEY ("userIdUserId") REFERENCES "user"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "profile" ADD CONSTRAINT "FK_a01219804b10998b0444d357f52" FOREIGN KEY ("userIdUserId") REFERENCES "user"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
