import {MigrationInterface, QueryRunner} from "typeorm";

export class Migration1569644820975 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "post" DROP CONSTRAINT "FK_52378a74ae3724bcab44036645b"`);
        await queryRunner.query(`ALTER TABLE "post" RENAME COLUMN "user_id" TO "userUserId"`);
        await queryRunner.query(`ALTER TABLE "post" ADD CONSTRAINT "FK_383f47c98d6fc3e18786e00ed41" FOREIGN KEY ("userUserId") REFERENCES "user"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "post" DROP CONSTRAINT "FK_383f47c98d6fc3e18786e00ed41"`);
        await queryRunner.query(`ALTER TABLE "post" RENAME COLUMN "userUserId" TO "user_id"`);
        await queryRunner.query(`ALTER TABLE "post" ADD CONSTRAINT "FK_52378a74ae3724bcab44036645b" FOREIGN KEY ("user_id") REFERENCES "user"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
