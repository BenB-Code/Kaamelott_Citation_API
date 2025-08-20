import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeedMovie1754486244940 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    [kaamelottShow] = await queryRunner.query(`
      SELECT id FROM "show" WHERE name = 'kaamelott' AND "mediaType" = 'film'
    `);

    if (!kaamelottShow) {
      throw new Error(
        "Show kaamelott film non trouvé. Exécutez d'abord la migration SeedShow",
      );
    }

    await queryRunner.query(`
      INSERT INTO "movie" ("name", "releaseDate", "showId") VALUES 
      ('kaamelott premier volet', '21 juillet 2021', ${kaamelottShow.id}),
      ON CONFLICT DO NOTHING
    `);

    [kaamelottShow] = await queryRunner.query(`
      SELECT id FROM "show" WHERE name = 'kaamelott' AND "mediaType" = 'court métrage'
    `);

    if (!kaamelottShow) {
      throw new Error(
        "Show dies irae court métrage non trouvé. Exécutez d'abord la migration SeedShow",
      );
    }

    await queryRunner.query(`
      INSERT INTO "movie" ("name", "releaseDate", "showId") VALUES 
      ('dies irae', 'octobre 2003', ${kaamelottShow.id}),
      ON CONFLICT DO NOTHING
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    let [kaamelottShow] = await queryRunner.query(`
    SELECT id FROM "show" WHERE name = 'kaamelott' AND "mediaType" = 'film'
  `);

    if (kaamelottShow) {
      await queryRunner.query(`
      DELETE FROM "movie" 
      WHERE "showId" = ${kaamelottShow.id}
      AND "name" = 'kaamelott premier volet'
    `);
    }

    [kaamelottShow] = await queryRunner.query(`
    SELECT id FROM "show" WHERE name = 'dies irae' AND "mediaType" = 'court métrage'
  `);

    if (kaamelottShow) {
      await queryRunner.query(`
      DELETE FROM "movie" 
      WHERE "showId" = ${kaamelottShow.id}
      AND "name" = 'dies irae'
    `);
    }

    console.log('✅ Movies supprimés avec succès');
  }
}
