import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeedMovie1754486244940 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const [kaamelottMovie, kaamelottCourtMetrage] = await Promise.all([
      queryRunner.query(`
      SELECT id FROM "show" WHERE name = 'kaamelott' AND "mediaType" = 'film'
    `),
      queryRunner.query(`
      SELECT id FROM "show" WHERE name = 'kaamelott' AND "mediaType" = 'court métrage'
    `),
    ]);
    if (!kaamelottMovie?.length) {
      throw new Error(
        "Movie kaamelott mediaType film non trouvé. Exécutez d'abord la migration SeedShow",
      );
    }
    if (!kaamelottCourtMetrage?.length) {
      throw new Error(
        "Movie kaamelott mediaType court métrage non trouvé. Exécutez d'abord la migration SeedShow",
      );
    }

    const movies = [
      {
        name: 'kaamelott premier volet',
        releaseDate: '2021-07-21',
        showId: kaamelottMovie[0].id,
      },
      {
        name: 'dies irae',
        releaseDate: '2021-10-01',
        showId: kaamelottCourtMetrage[0].id,
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

    console.log('✅ movie insérés');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DELETE FROM "movie"
    `);

    console.log('🗑️ movie supprimés');
  }
}
