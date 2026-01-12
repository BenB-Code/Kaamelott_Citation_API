import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeedCitationActor1755795721319 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const [actor, characterActor, citation] = await Promise.all([
      queryRunner.query(`
        SELECT id, "firstName", "lastName" FROM "actor"
        `),
      queryRunner.query(`
        SELECT "characterId", "actorId" FROM "character_actor"
        `),
      queryRunner.query(`
        SELECT id, "characterId" FROM "citation"
        `),
    ]);
    if (!actor?.length) {
      throw new Error("actor non trouvé. Exécutez d'abord la migration SeedActor");
    }
    if (!characterActor?.length) {
      throw new Error(
        "character_actor non trouvé. Exécutez d'abord la migration SeedCharacterActor",
      );
    }
    if (!citation?.length) {
      throw new Error('\'citation non trouvé. Exécutez d\'abord la migration SeedCitation\';',
      );
    }

    const citationsActors = citation.flatMap((citation) =>
      characterActor
        .filter((item) => item.characterId === citation.characterId)
        .map((actor) => ({
          citationId: citation.id,
          actorId: actor.actorId,
        })),
    );

    for (const citationActor of citationsActors) {
      await queryRunner.query(
        `INSERT INTO "citation_actor" ("citationId", "actorId")
        VALUES ($1, $2)`,
        [citationActor.citationId, citationActor.actorId],
      );
    }

    console.log('✅ Association citation actor insérées');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DELETE FROM "citation_actor"
    `);

    console.log('🗑️ Association citation actor supprimés');
  }
}
