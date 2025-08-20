import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeedCharacterActor1754486200137 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      INSERT INTO "character_actor" ("characterId", "actorId") 
      SELECT c.id, a.id FROM "character" c, "actor" a
      WHERE 
        (c.name = 'Élias de Kelliwic''h' AND a."firstName" = 'Bruno' AND a."lastName" = 'Fontaine') OR
        (c.name = 'Venec' AND a."firstName" = 'Loïc' AND a."lastName" = 'Varraut') OR
        (c.name = 'Méléagant' AND a."firstName" = 'Carlo' AND a."lastName" = 'Brandt') OR
        (c.name = 'Urgan' AND a."firstName" = 'Pascal' AND a."lastName" = 'Vincent') OR
        (c.name = 'Merlin' AND a."firstName" = 'Jacques' AND a."lastName" = 'Chambon') OR
        (c.name = 'Yvain' AND a."firstName" = 'Simon' AND a."lastName" = 'Astier') OR
        (c.name = 'Le Seigneur Jacca' AND a."firstName" = 'Georges' AND a."lastName" = 'Beller') OR
        (c.name = 'Gauvain' AND a."firstName" = 'Aurélien' AND a."lastName" = 'Portehaut') OR
        (c.name = 'Karadoc' AND a."firstName" = 'Jean-Christophe' AND a."lastName" = 'Hembert') OR
        (c.name = 'Le maître d''armes' AND a."firstName" = 'Christian' AND a."lastName" = 'Bujeau') OR
        (c.name = 'Lancelot' AND a."firstName" = 'Thomas' AND a."lastName" = 'Cousseau') OR
        (c.name = 'Père Blaise' AND a."firstName" = 'Jean-Robert' AND a."lastName" = 'Lombard') OR
        (c.name = 'Bohort' AND a."firstName" = 'Nicolas' AND a."lastName" = 'Gabion') OR
        (c.name = 'Caius Camillus' AND a."firstName" = 'Bruno' AND a."lastName" = 'Salomone') OR
        (c.name = 'Guenièvre' AND a."firstName" = 'Vanessa' AND a."lastName" = 'Guedj') OR
        (c.name = 'Guenièvre' AND a."firstName" = 'Anne' AND a."lastName" = 'Girouard') OR
        (c.name = 'Guethenoc' AND a."firstName" = 'Serge' AND a."lastName" = 'Papagalli') OR
        (c.name = 'Demetra' AND a."firstName" = 'Caroline' AND a."lastName" = 'Pascal') OR
        (c.name = 'Kadoc' AND a."firstName" = 'Brice' AND a."lastName" = 'Fournier') OR
        (c.name = 'Roparzh' AND a."firstName" = 'Gilles' AND a."lastName" = 'Graveleau') OR
        (c.name = 'Le tavernier' AND a."firstName" = 'Alain' AND a."lastName" = 'Chapuis') OR
        (c.name = 'Léodagan' AND a."firstName" = 'Lionnel' AND a."lastName" = 'Astier') OR
        (c.name = 'Loth' AND a."firstName" = 'François' AND a."lastName" = 'Rollin') OR
        (c.name = 'Le roi burgonde' AND a."firstName" = 'Guillaume' AND a."lastName" = 'Briat') OR
        (c.name = 'Le Répurgateur' AND a."firstName" = 'Élie' AND a."lastName" = 'Semoun') OR
        (c.name = 'Séli' AND a."firstName" = 'Joëlle' AND a."lastName" = 'Sevilla') OR
        (c.name = 'Arthur' AND a."firstName" = 'Alexandre' AND a."lastName" = 'Astier') OR
        (c.name = 'Perceval' AND a."firstName" = 'Franck' AND a."lastName" = 'Pitiot') OR
        (c.name = 'Alzagar' AND a."firstName" = 'Guillaume' AND a."lastName" = 'Gallienne') OR
        (c.name = 'Angharad' AND a."firstName" = 'Vanessa' AND a."lastName" = 'Guedj') OR
        (c.name = 'Anna de Tintagel' AND a."firstName" = 'Anouk' AND a."lastName" = 'Grinberg') OR
        (c.name = 'Appius Manilius' AND a."firstName" = 'Emmanuel' AND a."lastName" = 'Meirieu') OR
        (c.name = 'Attila' AND a."firstName" = 'Lan' AND a."lastName" = 'Truong') OR
        (c.name = 'Belt' AND a."firstName" = 'François' AND a."lastName" = 'Morel') OR
        (c.name = 'Breccan l''artisan irlandais' AND a."firstName" = 'Yvan' AND a."lastName" = 'Le Bolloc''h') OR
        (c.name = 'Calogrenant' AND a."firstName" = 'Stéphane' AND a."lastName" = 'Margot') OR
        (c.name = 'Publius Servius Capito' AND a."firstName" = 'François' AND a."lastName" = 'Levantal') OR
        (c.name = 'César' AND a."firstName" = 'Pierre' AND a."lastName" = 'Mondy') OR
        (c.name = 'Cryda de Tintagel' AND a."firstName" = 'Claire' AND a."lastName" = 'Nadeau') OR
        (c.name = 'Dagonet' AND a."firstName" = 'Antoine' AND a."lastName" = 'de Caunes') OR
        (c.name = 'La Dame du Lac' AND a."firstName" = 'Audrey' AND a."lastName" = 'Fleurot') OR
        (c.name = 'Drusilla' AND a."firstName" = 'Anne' AND a."lastName" = 'Benoît') OR
        (c.name = 'Le Duc d''Aquitaine' AND a."firstName" = 'Alain' AND a."lastName" = 'Chabat') OR
        (c.name = 'La Duchesse d''Aquitaine' AND a."firstName" = 'Géraldine' AND a."lastName" = 'Nakache') OR
        (c.name = 'Edern le Chevalier Femme' AND a."firstName" = 'Émilie' AND a."lastName" = 'Dequenne') OR
        (c.name = 'Faerbach' AND a."firstName" = 'Bernard' AND a."lastName" = 'Lecoq') OR
        (c.name = 'Galessin Duc d''Orcanie' AND a."firstName" = 'Alexis' AND a."lastName" = 'Hénon') OR
        (c.name = 'Titus Nipius Glaucia' AND a."firstName" = 'Jean-Marc' AND a."lastName" = 'Avocat') OR
        (c.name = 'Goustan' AND a."firstName" = 'Philippe' AND a."lastName" = 'Nahon') OR
        (c.name = 'Grüdü' AND a."firstName" = 'Thibault' AND a."lastName" = 'Roux') OR
        (c.name = 'Hervé de Rinel' AND a."firstName" = 'Tony' AND a."lastName" = 'Saba') OR
        (c.name = 'Horsa' AND a."firstName" = 'Sting' AND a."lastName" = '') OR
        (c.name = 'L''interprète burgonde' AND a."firstName" = 'Loránt' AND a."lastName" = 'Deutsch') OR
        (c.name = 'Les Jumelles du pêcheur' AND a."firstName" = 'Alexandra' AND a."lastName" = 'Saadoun') OR
        (c.name = 'Les Jumelles du pêcheur' AND a."firstName" = 'Magali' AND a."lastName" = 'Saadoun') OR
        (c.name = 'Le Jurisconsulte' AND a."firstName" = 'Christian' AND a."lastName" = 'Clavier') OR
        (c.name = 'Manius Macrinus Firmus' AND a."firstName" = 'Tcheky' AND a."lastName" = 'Karyo') OR
        (c.name = 'Mevanwi' AND a."firstName" = 'Caroline' AND a."lastName" = 'Ferrus') OR
        (c.name = 'Nessa' AND a."firstName" = 'Valérie' AND a."lastName" = 'Keruzoré') OR
        (c.name = 'Quarto' AND a."firstName" = 'Clovis' AND a."lastName" = 'Cornillac') OR
        (c.name = 'Lucius Sillius Sallustius' AND a."firstName" = 'Patrick' AND a."lastName" = 'Chesnais') OR
        (c.name = 'Séfriane d''Aquitaine' AND a."firstName" = 'Axelle' AND a."lastName" = 'Laffont') OR
        (c.name = 'Spurius Cordius Frontinius' AND a."firstName" = 'Pascal' AND a."lastName" = 'Demolon') OR
        (c.name = 'Le tricheur' AND a."firstName" = 'Laurent' AND a."lastName" = 'Gamelon') OR
        (c.name = 'Vérinus' AND a."firstName" = 'Manu' AND a."lastName" = 'Payet') OR
        (c.name = 'Ygerne' AND a."firstName" = 'Josée' AND a."lastName" = 'Drevon')
      ON CONFLICT DO NOTHING
    `);

    console.log('✅ Associations Character-Actor insérées avec succès');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DELETE FROM "character_actor" ca
      USING "character" c, "Actor" a
      WHERE ca."characterId" = c.id AND ca."actorId" = a.id
      AND (
        (c.name = 'Élias de Kelliwic''h' AND a."firstName" = 'Bruno' AND a."lastName" = 'Fontaine') OR
        (c.name = 'Venec' AND a."firstName" = 'Loïc' AND a."lastName" = 'Varraut') OR
        (c.name = 'Méléagant' AND a."firstName" = 'Carlo' AND a."lastName" = 'Brandt') OR
        (c.name = 'Urgan' AND a."firstName" = 'Pascal' AND a."lastName" = 'Vincent') OR
        (c.name = 'Merlin' AND a."firstName" = 'Jacques' AND a."lastName" = 'Chambon') OR
        (c.name = 'Yvain' AND a."firstName" = 'Simon' AND a."lastName" = 'Astier') OR
        (c.name = 'Le Seigneur Jacca' AND a."firstName" = 'Georges' AND a."lastName" = 'Beller') OR
        (c.name = 'Gauvain' AND a."firstName" = 'Aurélien' AND a."lastName" = 'Portehaut') OR
        (c.name = 'Karadoc' AND a."firstName" = 'Jean-Christophe' AND a."lastName" = 'Hembert') OR
        (c.name = 'Le maître d''armes' AND a."firstName" = 'Christian' AND a."lastName" = 'Bujeau') OR
        (c.name = 'Lancelot' AND a."firstName" = 'Thomas' AND a."lastName" = 'Cousseau') OR
        (c.name = 'Père Blaise' AND a."firstName" = 'Jean-Robert' AND a."lastName" = 'Lombard') OR
        (c.name = 'Bohort' AND a."firstName" = 'Nicolas' AND a."lastName" = 'Gabion') OR
        (c.name = 'Caius Camillus' AND a."firstName" = 'Bruno' AND a."lastName" = 'Salomone') OR
        (c.name = 'Guenièvre' AND a."firstName" = 'Vanessa' AND a."lastName" = 'Guedj') OR
        (c.name = 'Guenièvre' AND a."firstName" = 'Anne' AND a."lastName" = 'Girouard') OR
        (c.name = 'Guethenoc' AND a."firstName" = 'Serge' AND a."lastName" = 'Papagalli') OR
        (c.name = 'Demetra' AND a."firstName" = 'Caroline' AND a."lastName" = 'Pascal') OR
        (c.name = 'Kadoc' AND a."firstName" = 'Brice' AND a."lastName" = 'Fournier') OR
        (c.name = 'Roparzh' AND a."firstName" = 'Gilles' AND a."lastName" = 'Graveleau') OR
        (c.name = 'Le tavernier' AND a."firstName" = 'Alain' AND a."lastName" = 'Chapuis') OR
        (c.name = 'Léodagan' AND a."firstName" = 'Lionnel' AND a."lastName" = 'Astier') OR
        (c.name = 'Loth' AND a."firstName" = 'François' AND a."lastName" = 'Rollin') OR
        (c.name = 'Le roi burgonde' AND a."firstName" = 'Guillaume' AND a."lastName" = 'Briat') OR
        (c.name = 'Le Répurgateur' AND a."firstName" = 'Élie' AND a."lastName" = 'Semoun') OR
        (c.name = 'Séli' AND a."firstName" = 'Joëlle' AND a."lastName" = 'Sevilla') OR
        (c.name = 'Arthur' AND a."firstName" = 'Alexandre' AND a."lastName" = 'Astier') OR
        (c.name = 'Perceval' AND a."firstName" = 'Franck' AND a."lastName" = 'Pitiot') OR
        (c.name = 'Alzagar' AND a."firstName" = 'Guillaume' AND a."lastName" = 'Gallienne') OR
        (c.name = 'Angharad' AND a."firstName" = 'Vanessa' AND a."lastName" = 'Guedj') OR
        (c.name = 'Anna de Tintagel' AND a."firstName" = 'Anouk' AND a."lastName" = 'Grinberg') OR
        (c.name = 'Appius Manilius' AND a."firstName" = 'Emmanuel' AND a."lastName" = 'Meirieu') OR
        (c.name = 'Attila' AND a."firstName" = 'Lan' AND a."lastName" = 'Truong') OR
        (c.name = 'Belt' AND a."firstName" = 'François' AND a."lastName" = 'Morel') OR
        (c.name = 'Breccan l''artisan irlandais' AND a."firstName" = 'Yvan' AND a."lastName" = 'Le Bolloc''h') OR
        (c.name = 'Calogrenant' AND a."firstName" = 'Stéphane' AND a."lastName" = 'Margot') OR
        (c.name = 'Publius Servius Capito' AND a."firstName" = 'François' AND a."lastName" = 'Levantal') OR
        (c.name = 'César' AND a."firstName" = 'Pierre' AND a."lastName" = 'Mondy') OR
        (c.name = 'Cryda de Tintagel' AND a."firstName" = 'Claire' AND a."lastName" = 'Nadeau') OR
        (c.name = 'Dagonet' AND a."firstName" = 'Antoine' AND a."lastName" = 'de Caunes') OR
        (c.name = 'La Dame du Lac' AND a."firstName" = 'Audrey' AND a."lastName" = 'Fleurot') OR
        (c.name = 'Drusilla' AND a."firstName" = 'Anne' AND a."lastName" = 'Benoît') OR
        (c.name = 'Le Duc d''Aquitaine' AND a."firstName" = 'Alain' AND a."lastName" = 'Chabat') OR
        (c.name = 'La Duchesse d''Aquitaine' AND a."firstName" = 'Géraldine' AND a."lastName" = 'Nakache') OR
        (c.name = 'Edern le Chevalier Femme' AND a."firstName" = 'Émilie' AND a."lastName" = 'Dequenne') OR
        (c.name = 'Faerbach' AND a."firstName" = 'Bernard' AND a."lastName" = 'Lecoq') OR
        (c.name = 'Galessin Duc d''Orcanie' AND a."firstName" = 'Alexis' AND a."lastName" = 'Hénon') OR
        (c.name = 'Titus Nipius Glaucia' AND a."firstName" = 'Jean-Marc' AND a."lastName" = 'Avocat') OR
        (c.name = 'Goustan' AND a."firstName" = 'Philippe' AND a."lastName" = 'Nahon') OR
        (c.name = 'Grüdü' AND a."firstName" = 'Thibault' AND a."lastName" = 'Roux') OR
        (c.name = 'Hervé de Rinel' AND a."firstName" = 'Tony' AND a."lastName" = 'Saba') OR
        (c.name = 'Horsa' AND a."firstName" = 'Sting' AND a."lastName" = '') OR
        (c.name = 'L''interprète burgonde' AND a."firstName" = 'Loránt' AND a."lastName" = 'Deutsch') OR
        (c.name = 'Les Jumelles du pêcheur' AND a."firstName" = 'Alexandra' AND a."lastName" = 'Saadoun') OR
        (c.name = 'Les Jumelles du pêcheur' AND a."firstName" = 'Magali' AND a."lastName" = 'Saadoun') OR
        (c.name = 'Le Jurisconsulte' AND a."firstName" = 'Christian' AND a."lastName" = 'Clavier') OR
        (c.name = 'Manius Macrinus Firmus' AND a."firstName" = 'Tcheky' AND a."lastName" = 'Karyo') OR
        (c.name = 'Mevanwi' AND a."firstName" = 'Caroline' AND a."lastName" = 'Ferrus') OR
        (c.name = 'Nessa' AND a."firstName" = 'Valérie' AND a."lastName" = 'Keruzoré') OR
        (c.name = 'Quarto' AND a."firstName" = 'Clovis' AND a."lastName" = 'Cornillac') OR
        (c.name = 'Lucius Sillius Sallustius' AND a."firstName" = 'Patrick' AND a."lastName" = 'Chesnais') OR
        (c.name = 'Séfriane d''Aquitaine' AND a."firstName" = 'Axelle' AND a."lastName" = 'Laffont') OR
        (c.name = 'Spurius Cordius Frontinius' AND a."firstName" = 'Pascal' AND a."lastName" = 'Demolon') OR
        (c.name = 'Le tricheur' AND a."firstName" = 'Laurent' AND a."lastName" = 'Gamelon') OR
        (c.name = 'Vérinus' AND a."firstName" = 'Manu' AND a."lastName" = 'Payet') OR
        (c.name = 'Ygerne' AND a."firstName" = 'Josée' AND a."lastName" = 'Drevon')
      )
    `);

    console.log('🗑️ Associations Character-Actor supprimées');
  }
}
