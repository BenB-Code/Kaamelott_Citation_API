import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeedAuthor1754486213351 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      INSERT INTO "author" ("firstName", "lastName") VALUES 
      ('Alexandre ', 'Astier'),
      ('Fabien ', 'Rault'),
      ('Lionnel ', 'Astier'),
      ('Nicolas ', 'Gabion'),
      ('Simon ', 'Astier')
      ON CONFLICT DO NOTHING
    `);

    console.log('✅ Author insérés avec succès');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DELETE FROM "author"
    `);

    console.log('🗑️ Author supprimés');
  }
}
