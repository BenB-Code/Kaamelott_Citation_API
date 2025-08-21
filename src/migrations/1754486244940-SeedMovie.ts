import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeedMovie1754486244940 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    let kaamelottShow = await queryRunner.query(`
      SELECT id FROM "show" WHERE name = 'kaamelott' AND "mediaType" = 'film'
    `);
    if (!kaamelottShow) {
      throw new Error(
        "Show kaamelott film non trouvé. Exécutez d'abord la migration SeedShow",
      );
    }
    const movies = [
      {
        name: 'kaamelott premier volet',
        releaseDate: '2021-07-21',
        showId: kaamelottShow.id,
      },
    ];
    for (const movie of movies) {
      await queryRunner.query(
        `
        INSERT INTO "movie" ("name", "releaseDate", "showId") VALUES 
        ($1, $2, $3)
        ON CONFLICT ("name", "releaseDate", "showId") DO NOTHING
      `,
        [movie.name, movie.releaseDate, movie.showId],
      );
    }

    kaamelottShow = await queryRunner.query(`
      SELECT id FROM "show" WHERE name = 'kaamelott' AND "mediaType" = 'court métrage'
    `);
    if (!kaamelottShow) {
      throw new Error(
        "Show dies irae court métrage non trouvé. Exécutez d'abord la migration SeedShow",
      );
    }
    const courtMetrages = [
      {
        name: 'dies irae',
        releaseDate: '2021-10-01',
        showId: kaamelottShow.id,
      },
    ];
    for (const courtMetrage of courtMetrages) {
      await queryRunner.query(
        `
        INSERT INTO "movie" ("name", "releaseDate", "showId") VALUES 
        ($1, $2, $3)
        ON CONFLICT ("name", "releaseDate", "showId") DO NOTHING
      `,
        [courtMetrage.name, courtMetrage.releaseDate, courtMetrage.showId],
      );
    }

    console.log('✅ movie insérés');
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
    SELECT id FROM "show" WHERE name = 'kaamelott' AND "mediaType" = 'court métrage'
  `);

    if (kaamelottShow) {
      await queryRunner.query(`
      DELETE FROM "movie" 
      WHERE "showId" = ${kaamelottShow.id}
      AND "name" = 'dies irae'
    `);
    }

    console.log('🗑️ movie supprimés');
  }
}
