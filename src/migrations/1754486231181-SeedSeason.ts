import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeedSeason1754486231181 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const kaamelottShow = await queryRunner.query(`
      SELECT id FROM "show" WHERE name = 'kaamelott' AND "mediaType" = 'série'
    `);

    if (!kaamelottShow?.length) {
      throw new Error(
        "Show kaamelott série non trouvé. Exécutez d'abord la migration SeedShow",
      );
    }

    const seasons = [
      { name: 'décembre 2004', showId: kaamelottShow[0].id },
      { name: 'épisodes pilotes', showId: kaamelottShow[0].id },
      { name: 'janvier 2005', showId: kaamelottShow[0].id },
      { name: 'Livre I', showId: kaamelottShow[0].id },
      { name: 'Livre II', showId: kaamelottShow[0].id },
      { name: 'Livre III', showId: kaamelottShow[0].id },
      { name: 'Livre IV', showId: kaamelottShow[0].id },
      { name: 'Livre V', showId: kaamelottShow[0].id },
      { name: 'Livre VI', showId: kaamelottShow[0].id },
    ];

    for (const season of seasons) {
      await queryRunner.query(
        `
        INSERT INTO "season" ("name", "showId") VALUES 
        ($1, $2)
        ON CONFLICT ("showId", "name") DO NOTHING
      `,
        [season.name, season.showId],
      );
    }

    console.log('✅ season insérées');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DELETE FROM "season"
    `);

    console.log('🗑️ season supprimées');
  }
}
