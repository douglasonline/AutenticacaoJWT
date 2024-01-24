import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1706074002600 implements MigrationInterface {
    name = 'Default1706074002600'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "category" ("id" SERIAL NOT NULL, "name" text NOT NULL, "description" text NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_23c05c292c439d77b0de816b500" UNIQUE ("name"), CONSTRAINT "PK_9c4e4a89e3674fc9f382d733f03" PRIMARY KEY ("id"));`);
        await queryRunner.query(`CREATE TABLE "films" ("id" SERIAL NOT NULL, "name" text NOT NULL, "description" text NOT NULL, "duration" numeric NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "category_id" integer, CONSTRAINT "UQ_936e1cc7dc8c658446382192559" UNIQUE ("name"), CONSTRAINT "PK_697487ada088902377482c970d1" PRIMARY KEY ("id"));`);
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "name" text NOT NULL, "email" text NOT NULL, "password" text NOT NULL, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"));`);
        await queryRunner.query(`ALTER TABLE "films" ADD CONSTRAINT "FK_c9f7ba3211395d7f0998c46db34" FOREIGN KEY ("category_id") REFERENCES "category"("id") ON DELETE CASCADE ON UPDATE NO ACTION;`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "films" DROP CONSTRAINT "FK_c9f7ba3211395d7f0998c46db34";`);
        await queryRunner.query(`DROP TABLE "users";`);
        await queryRunner.query(`DROP TABLE "films";`);
        await queryRunner.query(`DROP TABLE "category";`);
    }

}
