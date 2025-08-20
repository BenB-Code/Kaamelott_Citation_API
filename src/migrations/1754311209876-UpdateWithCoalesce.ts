import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateWithCoalesce1754311209876 implements MigrationInterface {
  name = 'UpdateWithCoalesce1754311209876';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE "episode"
      DROP CONSTRAINT "UQ_9c81578a57f573c4d649330d4e4";
    `);

    await queryRunner.query(`
      CREATE UNIQUE INDEX UQ_9c81578a57f573c4d649330d4e4
      ON "episode" (
        "seasonId",
        COALESCE("number", -1),
        "name"
      );
    `);

    await queryRunner.query(`
      ALTER TABLE "citation"
      DROP CONSTRAINT "UQ_e5c60b77152cb72dcb2131aad7a";
    `);

    await queryRunner.query(`
      CREATE UNIQUE INDEX UQ_e5c60b77152cb72dcb2131aad7a
      ON "citation" (
        "text",
        COALESCE("episodeId", -1),
        COALESCE("movieId", -1),
        "characterId"
      );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DROP INDEX uq_9c81578a57f573c4d649330d4e4;
    `);

    await queryRunner.query(`
      ALTER TABLE "episode"
      ADD CONSTRAINT "UQ_9c81578a57f573c4d649330d4e4"
      UNIQUE ("seasonId", "number", "name");
    `);

    await queryRunner.query(`
      DROP INDEX "uq_e5c60b77152cb72dcb2131aad7a";
    `);

    await queryRunner.query(`
      ALTER TABLE "citation"
      ADD CONSTRAINT "UQ_e5c60b77152cb72dcb2131aad7a"
      UNIQUE ("text", "episodeId", "movieId", "characterId");
    `);
  }
}
