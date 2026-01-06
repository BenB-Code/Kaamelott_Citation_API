import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitialMigration1754311104439 implements MigrationInterface {
  name = 'InitialMigration1754311104439';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "character" ("id" SERIAL NOT NULL, "name" character varying(75) NOT NULL, "picture" character varying(250), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_d80158dde1461b74ed8499e7d89" UNIQUE ("name"), CONSTRAINT "PK_6c4aec48c564968be15078b8ae5" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_d80158dde1461b74ed8499e7d8" ON "character" ("name") `,
    );
    await queryRunner.query(
      `CREATE TABLE "actor" ("id" SERIAL NOT NULL, "firstName" character varying(50) NOT NULL, "lastName" character varying(50) NOT NULL, "picture" character varying(250), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_92e0c1c260c269baca056713710" UNIQUE ("firstName", "lastName"), CONSTRAINT "PK_05b325494fcc996a44ae6928e5e" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_92e0c1c260c269baca05671371" ON "actor" ("firstName", "lastName") `,
    );
    await queryRunner.query(
      `CREATE TABLE "author" ("id" SERIAL NOT NULL, "firstName" character varying(50) NOT NULL, "lastName" character varying(50) NOT NULL, "picture" character varying(250), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_cae5e33adeffb5e009874e8b7e1" UNIQUE ("firstName", "lastName"), CONSTRAINT "PK_5a0e79799d372fe56f2f3fa6871" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_cae5e33adeffb5e009874e8b7e" ON "author" ("firstName", "lastName") `,
    );
    await queryRunner.query(
      `CREATE TABLE "season" ("id" SERIAL NOT NULL, "name" character varying(75) NOT NULL, "picture" character varying(250), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "showId" integer, CONSTRAINT "UQ_430659632183cd126def13b78e5" UNIQUE ("showId", "name"), CONSTRAINT "PK_8ac0d081dbdb7ab02d166bcda9f" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(`CREATE INDEX "IDX_b3e4a42a8be8b449354a8b31cc" ON "season" ("name") `);
    await queryRunner.query(
      `CREATE TABLE "episode" ("id" SERIAL NOT NULL, "name" character varying(150), "number" smallint, "picture" character varying(250), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "seasonId" integer, CONSTRAINT "UQ_9c81578a57f573c4d649330d4e4" UNIQUE ("seasonId", "number", "name"), CONSTRAINT "PK_7258b95d6d2bf7f621845a0e143" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(`CREATE INDEX "IDX_5b8186cd5641b3bf6ee49479ce" ON "episode" ("name") `);
    await queryRunner.query(
      `CREATE INDEX "IDX_7166afa4951d08d8d88a4304e6" ON "episode" ("number") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_54b95a630c80e6df7563e66a30" ON "episode" ("seasonId", "number") `,
    );
    await queryRunner.query(
      `CREATE TABLE "citation" ("id" SERIAL NOT NULL, "text" text NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "episodeId" integer, "movieId" integer, "characterId" integer NOT NULL, CONSTRAINT "UQ_e5c60b77152cb72dcb2131aad7a" UNIQUE ("text", "episodeId", "movieId", "characterId"), CONSTRAINT "PK_f02dfdce6c05dfbf2fead28d0b6" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_58a6b31f9609466983c6bf55ff" ON "citation" ("text") `,
    );
    await queryRunner.query(
      `CREATE TABLE "movie" ("id" SERIAL NOT NULL, "name" character varying(75) NOT NULL, "releaseDate" date NOT NULL, "picture" character varying(250), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "showId" integer, CONSTRAINT "UQ_e8c05dc994381d0c330ff16373a" UNIQUE ("name", "releaseDate", "showId"), CONSTRAINT "PK_cb3bb4d61cf764dc035cbedd422" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(`CREATE INDEX "IDX_cee7125f3cbad047d34a6e1353" ON "movie" ("name") `);
    await queryRunner.query(
      `CREATE INDEX "IDX_4da334f952d24a0bf6a2902945" ON "movie" ("releaseDate") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_4f7be22383ee689e458305612d" ON "movie" ("name", "releaseDate") `,
    );
    await queryRunner.query(`
      DO $$ BEGIN
        CREATE TYPE "public"."show_mediatype_enum" AS ENUM('série', 'film', 'court métrage');
      EXCEPTION
        WHEN duplicate_object THEN null;
      END $$;
    `);
    await queryRunner.query(
      `CREATE TABLE "show" ("id" SERIAL NOT NULL, "name" character varying(75) NOT NULL, "mediaType" "public"."show_mediatype_enum" NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_7c8e9ee31783156b22436e4c726" UNIQUE ("mediaType", "name"), CONSTRAINT "PK_e9993c2777c1d0907e845fce4d1" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(`CREATE INDEX "IDX_c5861774818d3e1ab3c5c7463d" ON "show" ("name") `);
    await queryRunner.query(
      `CREATE INDEX "IDX_7c8e9ee31783156b22436e4c72" ON "show" ("mediaType", "name") `,
    );
    await queryRunner.query(
      `CREATE TABLE "character_actor" ("characterId" integer NOT NULL, "actorId" integer NOT NULL, CONSTRAINT "PK_a2c0acdf81ed2c3f4c9d283360f" PRIMARY KEY ("characterId", "actorId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_fcfe9360470f1a66baabbaaead" ON "character_actor" ("characterId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_329210c738ed6ca2581627b589" ON "character_actor" ("actorId") `,
    );
    await queryRunner.query(
      `CREATE TABLE "citation_actor" ("citationId" integer NOT NULL, "actorId" integer NOT NULL, CONSTRAINT "PK_88d55410f274689f1ba093307a6" PRIMARY KEY ("citationId", "actorId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_66bce05a3da51d73d1896d609e" ON "citation_actor" ("citationId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_d484af57c60d97963f9265669f" ON "citation_actor" ("actorId") `,
    );
    await queryRunner.query(
      `CREATE TABLE "citation_author" ("citationId" integer NOT NULL, "authorId" integer NOT NULL, CONSTRAINT "PK_bc25e5b7fd6644c49ad2b3b0aae" PRIMARY KEY ("citationId", "authorId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_a276f6a5aded3bf01fc6a7ef66" ON "citation_author" ("citationId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_39a1f9bad5d2eedf46f3008d36" ON "citation_author" ("authorId") `,
    );
    await queryRunner.query(
      `ALTER TABLE "season" ADD CONSTRAINT "FK_1addcb12701996373de04873742" FOREIGN KEY ("showId") REFERENCES "show"("id") ON DELETE RESTRICT ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "episode" ADD CONSTRAINT "FK_e73d28c1e5e3c85125163f7c9cd" FOREIGN KEY ("seasonId") REFERENCES "season"("id") ON DELETE RESTRICT ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "citation" ADD CONSTRAINT "FK_6bac0e541dff1996bccaa5e958d" FOREIGN KEY ("episodeId") REFERENCES "episode"("id") ON DELETE RESTRICT ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "citation" ADD CONSTRAINT "FK_c567cb00851c0993df10cedc1a4" FOREIGN KEY ("movieId") REFERENCES "movie"("id") ON DELETE RESTRICT ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "citation" ADD CONSTRAINT "FK_e299e86204e6dd7c2be54c0c1be" FOREIGN KEY ("characterId") REFERENCES "character"("id") ON DELETE RESTRICT ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "movie" ADD CONSTRAINT "FK_441b10b4da0095900fa5e3ea1e0" FOREIGN KEY ("showId") REFERENCES "show"("id") ON DELETE RESTRICT ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "character_actor" ADD CONSTRAINT "FK_fcfe9360470f1a66baabbaaead5" FOREIGN KEY ("characterId") REFERENCES "character"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "character_actor" ADD CONSTRAINT "FK_329210c738ed6ca2581627b589c" FOREIGN KEY ("actorId") REFERENCES "actor"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "citation_actor" ADD CONSTRAINT "FK_66bce05a3da51d73d1896d609ec" FOREIGN KEY ("citationId") REFERENCES "citation"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "citation_actor" ADD CONSTRAINT "FK_d484af57c60d97963f9265669fe" FOREIGN KEY ("actorId") REFERENCES "actor"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "citation_author" ADD CONSTRAINT "FK_a276f6a5aded3bf01fc6a7ef662" FOREIGN KEY ("citationId") REFERENCES "citation"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "citation_author" ADD CONSTRAINT "FK_39a1f9bad5d2eedf46f3008d361" FOREIGN KEY ("authorId") REFERENCES "author"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "citation_author" DROP CONSTRAINT "FK_39a1f9bad5d2eedf46f3008d361"`,
    );
    await queryRunner.query(
      `ALTER TABLE "citation_author" DROP CONSTRAINT "FK_a276f6a5aded3bf01fc6a7ef662"`,
    );
    await queryRunner.query(
      `ALTER TABLE "citation_actor" DROP CONSTRAINT "FK_d484af57c60d97963f9265669fe"`,
    );
    await queryRunner.query(
      `ALTER TABLE "citation_actor" DROP CONSTRAINT "FK_66bce05a3da51d73d1896d609ec"`,
    );
    await queryRunner.query(
      `ALTER TABLE "character_actor" DROP CONSTRAINT "FK_329210c738ed6ca2581627b589c"`,
    );
    await queryRunner.query(
      `ALTER TABLE "character_actor" DROP CONSTRAINT "FK_fcfe9360470f1a66baabbaaead5"`,
    );
    await queryRunner.query(`ALTER TABLE "movie" DROP CONSTRAINT "FK_441b10b4da0095900fa5e3ea1e0"`);
    await queryRunner.query(
      `ALTER TABLE "citation" DROP CONSTRAINT "FK_e299e86204e6dd7c2be54c0c1be"`,
    );
    await queryRunner.query(
      `ALTER TABLE "citation" DROP CONSTRAINT "FK_c567cb00851c0993df10cedc1a4"`,
    );
    await queryRunner.query(
      `ALTER TABLE "citation" DROP CONSTRAINT "FK_6bac0e541dff1996bccaa5e958d"`,
    );
    await queryRunner.query(
      `ALTER TABLE "episode" DROP CONSTRAINT "FK_e73d28c1e5e3c85125163f7c9cd"`,
    );
    await queryRunner.query(
      `ALTER TABLE "season" DROP CONSTRAINT "FK_1addcb12701996373de04873742"`,
    );
    await queryRunner.query(`DROP INDEX "public"."IDX_39a1f9bad5d2eedf46f3008d36"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_a276f6a5aded3bf01fc6a7ef66"`);
    await queryRunner.query(`DROP TABLE "citation_author"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_d484af57c60d97963f9265669f"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_66bce05a3da51d73d1896d609e"`);
    await queryRunner.query(`DROP TABLE "citation_actor"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_329210c738ed6ca2581627b589"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_fcfe9360470f1a66baabbaaead"`);
    await queryRunner.query(`DROP TABLE "character_actor"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_7c8e9ee31783156b22436e4c72"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_c5861774818d3e1ab3c5c7463d"`);
    await queryRunner.query(`DROP TABLE "show"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_4f7be22383ee689e458305612d"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_4da334f952d24a0bf6a2902945"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_cee7125f3cbad047d34a6e1353"`);
    await queryRunner.query(`DROP TABLE "movie"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_58a6b31f9609466983c6bf55ff"`);
    await queryRunner.query(`DROP TABLE "citation"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_54b95a630c80e6df7563e66a30"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_7166afa4951d08d8d88a4304e6"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_5b8186cd5641b3bf6ee49479ce"`);
    await queryRunner.query(`DROP TABLE "episode"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_b3e4a42a8be8b449354a8b31cc"`);
    await queryRunner.query(`DROP TABLE "season"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_cae5e33adeffb5e009874e8b7e"`);
    await queryRunner.query(`DROP TABLE "author"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_92e0c1c260c269baca05671371"`);
    await queryRunner.query(`DROP TABLE "actor"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_d80158dde1461b74ed8499e7d8"`);
    await queryRunner.query(`DROP TABLE "character"`);
  }
}
