import {MigrationInterface, QueryRunner} from "typeorm";

export class Migration1569642960318 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "user" ("user_id" SERIAL NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "token" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "delete" boolean NOT NULL, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_758b8ce7c18b9d347461b30228d" PRIMARY KEY ("user_id"))`);
        await queryRunner.query(`CREATE TABLE "profile" ("profile_id" SERIAL NOT NULL, "name" character varying NOT NULL, "age" integer NOT NULL, "greeting" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "delete" boolean NOT NULL, "userIdUserId" integer, CONSTRAINT "REL_a01219804b10998b0444d357f5" UNIQUE ("userIdUserId"), CONSTRAINT "PK_b0465dda30314a8786db3354a65" PRIMARY KEY ("profile_id"))`);
        await queryRunner.query(`CREATE TABLE "post" ("post_id" SERIAL NOT NULL, "title" character varying NOT NULL, "content" character varying NOT NULL, "images" text array NOT NULL, "rating" integer NOT NULL, "tags" text array NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "delete" boolean NOT NULL, "userIdUserId" integer, CONSTRAINT "REL_495034f35adfca3b9577569669" UNIQUE ("userIdUserId"), CONSTRAINT "PK_4d093caee4d33b2745c7d05a41d" PRIMARY KEY ("post_id"))`);
        await queryRunner.query(`ALTER TABLE "profile" ADD CONSTRAINT "FK_a01219804b10998b0444d357f52" FOREIGN KEY ("userIdUserId") REFERENCES "user"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "post" ADD CONSTRAINT "FK_495034f35adfca3b9577569669a" FOREIGN KEY ("userIdUserId") REFERENCES "user"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "post" DROP CONSTRAINT "FK_495034f35adfca3b9577569669a"`);
        await queryRunner.query(`ALTER TABLE "profile" DROP CONSTRAINT "FK_a01219804b10998b0444d357f52"`);
        await queryRunner.query(`DROP TABLE "post"`);
        await queryRunner.query(`DROP TABLE "profile"`);
        await queryRunner.query(`DROP TABLE "user"`);
    }

}
