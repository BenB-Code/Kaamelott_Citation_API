import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeedCharacterActor1754486200137 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const pairCharacterActor = [
      { name: "Élias de Kelliwic'h", firstName: 'Bruno', lastName: 'Fontaine' },
      { name: 'Venec', firstName: 'Loïc', lastName: 'Varraut' },
      { name: 'Méléagant', firstName: 'Carlo', lastName: 'Brandt' },
      { name: 'Urgan', firstName: 'Pascal', lastName: 'Vincent' },
      { name: 'Merlin', firstName: 'Jacques', lastName: 'Chambon' },
      { name: 'Yvain', firstName: 'Simon', lastName: 'Astier' },
      { name: 'Le Seigneur Jacca', firstName: 'Georges', lastName: 'Beller' },
      { name: 'Gauvain', firstName: 'Aurélien', lastName: 'Portehaut' },
      { name: 'Karadoc', firstName: 'Jean-Christophe', lastName: 'Hembert' },
      { name: "Le maître d'armes", firstName: 'Christian', lastName: 'Bujeau' },
      { name: 'Lancelot', firstName: 'Thomas', lastName: 'Cousseau' },
      { name: 'Père Blaise', firstName: 'Jean-Robert', lastName: 'Lombard' },
      { name: 'Bohort', firstName: 'Nicolas', lastName: 'Gabion' },
      { name: 'Caius Camillus', firstName: 'Bruno', lastName: 'Salomone' },
      { name: 'Guenièvre', firstName: 'Vanessa', lastName: 'Guedj' },
      { name: 'Guenièvre', firstName: 'Anne', lastName: 'Girouard' },
      { name: 'Guethenoc', firstName: 'Serge', lastName: 'Papagalli' },
      { name: 'Demetra', firstName: 'Caroline', lastName: 'Pascal' },
      { name: 'Kadoc', firstName: 'Brice', lastName: 'Fournier' },
      { name: 'Roparzh', firstName: 'Gilles', lastName: 'Graveleau' },
      { name: 'Le tavernier', firstName: 'Alain', lastName: 'Chapuis' },
      { name: 'Léodagan', firstName: 'Lionnel', lastName: 'Astier' },
      { name: 'Loth', firstName: 'François', lastName: 'Rollin' },
      { name: 'Le roi burgonde', firstName: 'Guillaume', lastName: 'Briat' },
      { name: 'Le Répurgateur', firstName: 'Élie', lastName: 'Semoun' },
      { name: 'Séli', firstName: 'Joëlle', lastName: 'Sevilla' },
      { name: 'Arthur', firstName: 'Alexandre', lastName: 'Astier' },
      { name: 'Perceval', firstName: 'Franck', lastName: 'Pitiot' },
      { name: 'Alzagar', firstName: 'Guillaume', lastName: 'Gallienne' },
      { name: 'Angharad', firstName: 'Vanessa', lastName: 'Guedj' },
      { name: 'Anna de Tintagel', firstName: 'Anouk', lastName: 'Grinberg' },
      { name: 'Appius Manilius', firstName: 'Emmanuel', lastName: 'Meirieu' },
      { name: 'Attila', firstName: 'Lan', lastName: 'Truong' },
      { name: 'Belt', firstName: 'François', lastName: 'Morel' },
      {
        name: "Breccan l'artisan irlandais",
        firstName: 'Yvan',
        lastName: "Le Bolloc'h",
      },
      { name: 'Calogrenant', firstName: 'Stéphane', lastName: 'Margot' },
      {
        name: 'Publius Servius Capito',
        firstName: 'François',
        lastName: 'Levantal',
      },
      { name: 'César', firstName: 'Pierre', lastName: 'Mondy' },
      { name: 'Cryda de Tintagel', firstName: 'Claire', lastName: 'Nadeau' },
      { name: 'Dagonet', firstName: 'Antoine', lastName: 'de Caunes' },
      { name: 'La Dame du Lac', firstName: 'Audrey', lastName: 'Fleurot' },
      { name: 'Drusilla', firstName: 'Anne', lastName: 'Benoît' },
      { name: "Le Duc d'Aquitaine", firstName: 'Alain', lastName: 'Chabat' },
      {
        name: "La Duchesse d'Aquitaine",
        firstName: 'Géraldine',
        lastName: 'Nakache',
      },
      {
        name: 'Edern le Chevalier Femme',
        firstName: 'Émilie',
        lastName: 'Dequenne',
      },
      { name: 'Faerbach', firstName: 'Bernard', lastName: 'Lecoq' },
      {
        name: "Galessin Duc d'Orcanie",
        firstName: 'Alexis',
        lastName: 'Hénon',
      },
      {
        name: 'Titus Nipius Glaucia',
        firstName: 'Jean-Marc',
        lastName: 'Avocat',
      },
      { name: 'Goustan', firstName: 'Philippe', lastName: 'Nahon' },
      { name: 'Grüdü', firstName: 'Thibault', lastName: 'Roux' },
      { name: 'Hervé de Rinel', firstName: 'Tony', lastName: 'Saba' },
      { name: 'Horsa', firstName: 'Sting', lastName: '' },
      {
        name: "L'interprète burgonde",
        firstName: 'Loránt',
        lastName: 'Deutsch',
      },
      {
        name: 'Les Jumelles du pêcheur',
        firstName: 'Alexandra',
        lastName: 'Saadoun',
      },
      {
        name: 'Les Jumelles du pêcheur',
        firstName: 'Magali',
        lastName: 'Saadoun',
      },
      { name: 'Le Jurisconsulte', firstName: 'Christian', lastName: 'Clavier' },
      {
        name: 'Manius Macrinus Firmus',
        firstName: 'Tcheky',
        lastName: 'Karyo',
      },
      { name: 'Mevanwi', firstName: 'Caroline', lastName: 'Ferrus' },
      { name: 'Nessa', firstName: 'Valérie', lastName: 'Keruzoré' },
      { name: 'Quarto', firstName: 'Clovis', lastName: 'Cornillac' },
      {
        name: 'Lucius Sillius Sallustius',
        firstName: 'Patrick',
        lastName: 'Chesnais',
      },
      {
        name: "Séfriane d'Aquitaine",
        firstName: 'Axelle',
        lastName: 'Laffont',
      },
      {
        name: 'Spurius Cordius Frontinius',
        firstName: 'Pascal',
        lastName: 'Demolon',
      },
      { name: 'Le tricheur', firstName: 'Laurent', lastName: 'Gamelon' },
      { name: 'Vérinus', firstName: 'Manu', lastName: 'Payet' },
      { name: 'Ygerne', firstName: 'Josée', lastName: 'Drevon' },
    ];

    for (const pair of pairCharacterActor) {
      await queryRunner.query(
        `
        INSERT INTO "character_actor" ("characterId", "actorId") 
        SELECT c.id, a.id FROM "character" c, "actor" a
        WHERE c.name = $1
          AND a.firstName = $2
          AND a.lastName = $3
        ON CONFLICT ("characterId", "actorId") DO NOTHING
      `,
        [pair.name, pair.firstName, pair.lastName],
      );
    }

    console.log('✅ Association character actor insérées');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DELETE FROM "character_actor"
    `);

    console.log('🗑️ Associations character actor supprimées');
  }
}
