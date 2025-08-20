import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeedShow1754486225624 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      INSERT INTO "show" ("name", "mediaType") VALUES 
      ('kaamelott', 'série'),
      ('kaamelott', 'film'),
      ('kaamelott', 'court métrage')
      ON CONFLICT ("name", "mediaType") DO NOTHING
    `);

    console.log('✅ Show insérés avec succès');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DELETE FROM "show"
    `);

    console.log('🗑️ Show supprimés');
  }
}
