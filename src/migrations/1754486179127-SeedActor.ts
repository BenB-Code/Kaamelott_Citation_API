import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeedActor1754486179127 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const actors = [
      { firstName: 'Alain', lastName: 'Chabat' },
      { firstName: 'Alain', lastName: 'Chapuis' },
      { firstName: 'Alexandra', lastName: 'Saadoun' },
      { firstName: 'Alexandre', lastName: 'Astier' },
      { firstName: 'Alexis', lastName: 'Hénon' },
      { firstName: 'Anne', lastName: 'Benoît' },
      { firstName: 'Anne', lastName: 'Girouard' },
      { firstName: 'Anouk', lastName: 'Grinberg' },
      { firstName: 'Antoine', lastName: 'de Caunes' },
      { firstName: 'Audrey', lastName: 'Fleurot' },
      { firstName: 'Aurélien', lastName: 'Portehaut' },
      { firstName: 'Axelle', lastName: 'Laffont' },
      { firstName: 'Bernard', lastName: 'Lecoq' },
      { firstName: 'Brice', lastName: 'Fournier' },
      { firstName: 'Bruno', lastName: 'Fontaine' },
      { firstName: 'Bruno', lastName: 'Salomone' },
      { firstName: 'Carlo', lastName: 'Brandt' },
      { firstName: 'Caroline', lastName: 'Ferrus' },
      { firstName: 'Caroline', lastName: 'Pascal' },
      { firstName: 'Christian', lastName: 'Bujeau' },
      { firstName: 'Christian', lastName: 'Clavier' },
      { firstName: 'Claire', lastName: 'Nadeau' },
      { firstName: 'Clovis', lastName: 'Cornillac' },
      { firstName: 'Élie', lastName: 'Semoun' },
      { firstName: 'Émilie', lastName: 'Dequenne' },
      { firstName: 'Emmanuel', lastName: 'Meirieu' },
      { firstName: 'Franck', lastName: 'Pitiot' },
      { firstName: 'François', lastName: 'Levantal' },
      { firstName: 'François', lastName: 'Morel' },
      { firstName: 'François', lastName: 'Rollin' },
      { firstName: 'Frank', lastName: 'Pitiot' },
      { firstName: 'Georges', lastName: 'Beller' },
      { firstName: 'Géraldine', lastName: 'Nakache' },
      { firstName: 'Gilles', lastName: 'Graveleau' },
      { firstName: 'Guillaume', lastName: 'Briat' },
      { firstName: 'Guillaume', lastName: 'Gallienne' },
      { firstName: 'Jacques', lastName: 'Chambon' },
      { firstName: 'Jean-Marc', lastName: 'Avocat' },
      { firstName: 'Jean-Christophe', lastName: 'Hembert' },
      { firstName: 'Jean-Robert', lastName: 'Lombard' },
      { firstName: 'Joëlle', lastName: 'Sevilla' },
      { firstName: 'Josée', lastName: 'Drevon' },
      { firstName: 'Lan', lastName: 'Truong' },
      { firstName: 'Laurent', lastName: 'Gamelon' },
      { firstName: 'Lionnel', lastName: 'Astier' },
      { firstName: 'Loïc', lastName: 'Varraut' },
      { firstName: 'Loránt', lastName: 'Deutsch' },
      { firstName: 'Magali', lastName: 'Saadoun' },
      { firstName: 'Manu', lastName: 'Payet' },
      { firstName: 'Nicolas', lastName: 'Gabion' },
      { firstName: 'Pascal', lastName: 'Demolon' },
      { firstName: 'Pascal', lastName: 'Vincent' },
      { firstName: 'Patrick', lastName: 'Chesnais' },
      { firstName: 'Philippe', lastName: 'Nahon' },
      { firstName: 'Pierre', lastName: 'Mondy' },
      { firstName: 'Serge', lastName: 'Papagalli' },
      { firstName: 'Simon', lastName: 'Astier' },
      { firstName: 'Stéphane', lastName: 'Margot' },
      { firstName: 'Sting', lastName: '' },
      { firstName: 'Tcheky', lastName: 'Karyo' },
      { firstName: 'Thibault', lastName: 'Roux' },
      { firstName: 'Thomas', lastName: 'Cousseau' },
      { firstName: 'Tony', lastName: 'Saba' },
      { firstName: 'Valérie', lastName: 'Keruzoré' },
      { firstName: 'Vanessa', lastName: 'Guedj' },
      { firstName: 'Yvan', lastName: "Le Bolloc'h" },
    ];

    for (const actor of actors) {
      await queryRunner.query(
        `
        INSERT INTO "actor" ("firstName", "lastName") VALUES 
        ($1, $2)
        ON CONFLICT ("firstName", "lastName") DO NOTHING
      `,
        [actor.firstName, actor.lastName],
      );
    }
    console.log('✅ actor insérées');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DELETE FROM "actor"
    `);

    console.log('🗑️ actors supprimés');
  }
}
