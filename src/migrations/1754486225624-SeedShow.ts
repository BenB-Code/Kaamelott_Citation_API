import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeedShow1754486225624 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const shows = [
      { name: 'kaamelott', mediaType: 'série' },
      { name: 'kaamelott', mediaType: 'film' },
      { name: 'kaamelott', mediaType: 'court métrage' },
    ];

    for (const show of shows) {
      await queryRunner.query(
        `
        INSERT INTO "show" ("name", "mediaType") VALUES 
        ($1, $2)
        ON CONFLICT ("mediaType", "name") DO NOTHING
      `,
        [show.name, show.mediaType],
      );
    }

    console.log('✅ show insérés');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DELETE FROM "show"
    `);

    console.log('🗑️ show supprimés');
  }
}
