import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeedSeason1754486231181 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    let [kaamelottShow] = await queryRunner.query(`
      SELECT id FROM "show" WHERE name = 'kaamelott' AND "mediaType" = 'série'
    `);

    if (!kaamelottShow) {
      throw new Error(
        "Show kaamelott série non trouvé. Exécutez d'abord la migration SeedShow",
      );
    }

    await queryRunner.query(`
      INSERT INTO "season" ("name", "showId") VALUES 
      ('décembre 2004', ${kaamelottShow.id}),
      ('épisodes pilotes', ${kaamelottShow.id}),
      ('janvier 2005', ${kaamelottShow.id}),
      ('Livre I', ${kaamelottShow.id}),
      ('Livre II', ${kaamelottShow.id}),
      ('Livre III', ${kaamelottShow.id}),
      ('Livre IV', ${kaamelottShow.id}),
      ('Livre V', ${kaamelottShow.id}),
      ('Livre VI', ${kaamelottShow.id})
      ON CONFLICT ("name", "showId") DO NOTHING
    `);

    console.log('✅ Season insérées avec succès');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const [kaamelottShow] = await queryRunner.query(`
      SELECT id FROM "show" WHERE name = 'kaamelott' AND "mediaType" = 'série'
    `);

    await queryRunner.query(`
      DELETE FROM "season" 
      WHERE "showId" IN (
        SELECT sh.id
        FROM "show" sh
        WHERE sh."mediaType" = 'série'
      )
    `);

    console.log('✅ Season insérées avec succès');
  }
}
