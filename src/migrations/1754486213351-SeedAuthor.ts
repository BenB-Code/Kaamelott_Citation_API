import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeedAuthor1754486213351 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const authors = [
      { firstName: 'Alexandre', lastName: 'Astier' },
      { firstName: 'Fabien', lastName: 'Rault' },
      { firstName: 'Lionnel', lastName: 'Astier' },
      { firstName: 'Nicolas', lastName: 'Gabion' },
      { firstName: 'Simon', lastName: 'Astier' },
    ];

    for (const author of authors) {
      await queryRunner.query(
        `
        INSERT INTO "author" ("firstName", "lastName") VALUES 
        ($1, $2)
        ON CONFLICT ("firstName", "lastName") DO NOTHING
      `,
        [author.firstName, author.lastName],
      );
    }

    console.log('✅ author insérés');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DELETE FROM "author"
    `);

    console.log('🗑️ author supprimés');
  }
}
