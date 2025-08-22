import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeedCharacters1754486166181 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const characters = [
      'Alzagar',
      'Angharad',
      'Anna de Tintagel',
      'Appius Manilius',
      'Arthur',
      'Attila',
      'Belt',
      'Bohort',
      "Breccan l'artisan irlandais",
      'Caius Camillus',
      'Calogrenant',
      'César',
      'Cryda de Tintagel',
      'Dagonet',
      'Demetra',
      'Drusilla',
      'Edern le Chevalier Femme',
      "Élias de Kelliwic'h",
      'Faerbach',
      "Galessin Duc d'Orcanie",
      'Gauvain',
      'Goustan',
      'Grüdü',
      'Guenièvre',
      'Guethenoc',
      'Hervé de Rinel',
      'Horsa',
      'Kadoc',
      'Karadoc',
      "L'interprète burgonde",
      'La Dame du Lac',
      "La Duchesse d'Aquitaine",
      'Lancelot',
      "Le Duc d'Aquitaine",
      'Le Jurisconsulte',
      "Le maître d'armes",
      'Le Répurgateur',
      'Le roi burgonde',
      'Le Seigneur Jacca',
      'Le tavernier',
      'Le tricheur',
      'Léodagan',
      'Les Jumelles du pêcheur',
      'Loth',
      'Lucius Sillius Sallustius',
      'Manius Macrinus Firmus',
      'Méléagant',
      'Merlin',
      'Mevanwi',
      'Nessa',
      'Perceval',
      'Père Blaise',
      'Publius Servius Capito',
      'Quarto',
      'Roparzh',
      "Séfriane d'Aquitaine",
      'Séli',
      'Spurius Cordius Frontinius',
      'Titus Nipius Glaucia',
      'Urgan',
      'Venec',
      'Vérinus',
      'Ygerne',
      'Yvain',
    ];

    for (const character of characters) {
      await queryRunner.query(
        `
        INSERT INTO "character" ("name") VALUES ($1)
        ON CONFLICT ("name") DO NOTHING
      `,
        [character],
      );
    }

    console.log('✅ character insérées');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DELETE FROM "character"
    `);

    console.log('🗑️ characters supprimés');
  }
}
