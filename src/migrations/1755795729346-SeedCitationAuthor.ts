import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeedCitationAuthor1755795729346 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const [authors, citations] = await Promise.all([
      queryRunner.query(`
        SELECT id, "firstName", "lastName" FROM "author"
        `),
      queryRunner.query(`
        SELECT id, text FROM "citation" 
        `),
    ]);
    if (!authors?.length) {
      throw new Error("author non trouvé. Exécutez d'abord la migration SeedAuthor");
    }
    if (!citations?.length) {
      throw new Error("'citation non trouvé. Exécutez d\'abord la migration SeedCitation';
    }
    const authorsMap = Object.fromEntries(
      authors.map((author) => [`${author.firstName} ${author.lastName}`, author.id]),
    );
    const citationsMap = Object.fromEntries(
      citations.map((citation) => [citation.text, citation.id]),
    );

    const authorTextList = [
      {
        author: ['Alexandre Astier'],
        text: `Si j'échoue, je garde la butte aux Cerfs et je fais tomber une pluie de calamités sur le royaume par vengeance ! C'est pas pour rien qu'on m'appelle « le Fourbe ». Si je réussis, je garde la butte aux Cerfs, plus… Le tertre des Âmes…`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Y'a toujours au moins deux solutions à un problème.`,
      },
      {
        author: ['Alexandre Astier'],
        text: `(À Merlin) Une pluie de pierres en intérieur, donc ! Je vous prenais pour un pied de chaise, mais vous êtes un précurseur, en fait !`,
      },
      {
        author: ['Alexandre Astier'],
        text: `(À Merlin) Oh vous, toujours vous, mais allez chier dans une fiole, on verra après.`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Écoutez, si j'avais un sort pour contrecarrer les volontés divines, je serais pas en train de faire des potions de virilité pour tous les mous de la tige du pays breton.`,
      },
      {
        author: ['Alexandre Astier'],
        text: `(À Arthur) Croyez bien que si j'avais, je le dirais pas ! Parce que voir celui-là passer pour un conneau devant tous les druides du continent, j'aime autant vous dire que je risque pas de louper ça ! J'vais même amener des copains.`,
      },
      {
        author: ['Alexandre Astier'],
        text: `(À Merlin) Je veux insinuer que vous n'avez pas de connaissances suffisantes pour faire des crêpes. Alors vous imaginer en train d'essayer de bricoler des plaques de dissimulation, c'est à pisser de rire.`,
      },
      {
        author: ['Alexandre Astier'],
        text: `(À Merlin) Mais retournez à l'état sauvage, espèce de con. Foutez le camp dans les montagnes avec une paire de chèvres. On vous achètera vos fromages, promis. […] Vous le sentez pas, l'appel de la nature, là ? Les animaux de la forêt, y z'ont pas besoin d'un toubib ? […] Tirez-vous d'ici. Définitivement. Et laissez bosser ceux qui savent faire ! Y a pas de place pour les amateurs ici.`,
      },
      {
        author: ['Alexandre Astier'],
        text: `(à propos de Merlin) Non. Je lui ai dit qu'on avait pas besoin d'un con d'herboriste sur le champ de bataille et qu'il ferait mieux de rester glander à l'abri plutôt que de venir nous faire chier sur le terrain. [...] Non mais au bout d'un moment faut dire les choses! Votre Merlin il est bien gentil mais il sait pas faire de magie! Si on vous collait un collaborateur qui connait rien à la tactique militaire je me demande bien ce que vous feriez.`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Dans la vie, faut bosser pour personne, et y faut faire bosser personne ! C'est le secret de la liberté. […] Rien que d'imaginer que je retire l'épée du rocher et que je me retrouve à la tête de ce bordel, ça me fait de la spasmophilie !`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Ecoutez ma p'tite dame, ya des fois où y faut sentir le vent tourner et mettre du pognon à gauche pour filer à la concurrence [Mevanwi : où ça ? Chez Lancelot ?] [...] Pour aller là-bas, y faudrait que j'aie des principes, une quête à accomplir [Mevanwi : Et vous n'en avez pas ?] Si, m'en mettre plein les fouilles !`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Sire, si vous me les enlevez, c'est un tiers de mes revenus qui fout le camp. Parce qu'ils font pas que boire ! Ils mangent là un jour sur deux ...`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Ben moi, je sais pas si c'est de naissance ou quoi, mais la vue du bourgeois, ça me fait de l'aérophagie.`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Entre le roi Arthur qui est pas capable de dénicher son Graal, et la reine qui est con comme une chaise...`,
      },
      {
        author: ['Alexandre Astier'],
        text: `La seule solution pour que ce soye encore plus sale, ça serait de demander aux clients de chier directement par terre ! Je vois que ça.`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Ah non, ce soir c'est beaucoup du clodo, mais c'est pas ceux-là de votre équipe.`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Et deux jus de pomme qui piquent !`,
      },
      {
        author: ['Alexandre Astier'],
        text: `(ivre) C'est pour ça que j'ai jamais été rien réclamer à Kaamelott. Déjà, j'aime pas bien aller pleurnicher. Je bricole mes combines dans mon coin. Je préfère aller « excroquer », plutôt que d'embêter autrui. Vous voyez ? `,
      },
      {
        author: ['Alexandre Astier'],
        text: `BAH SI VOUS VOULEZ PAS PASSER POUR DES CLODOS, COMMENCEZ PAR ÉPONGER VOTRE ARDOISE ! `,
      },
      {
        author: ['Alexandre Astier'],
        text: `Quand je vois le coup de pompe aux miches que va prendre le chiffre d'affaires, et bah j'ai envie de dire chapeau, pis j'ai envie de dire merci. `,
      },
      {
        author: ['Alexandre Astier'],
        text: `Hé bah allez, une journée d'plus en moins. On va aller dormir et pis demain on recommence. Je peux vous dire que tavernier, c'est pas une sinécure. `,
      },
      {
        author: ['Alexandre Astier'],
        text: `Euh dites, dans ceux que vous avez choisis, il y en a déjà qui commencent a dégobiller sur le plancher, qu'est ce que je fais ?`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Ah non mais moi la dignité je suis drôlement pour hein, je vais même vous dire au nom de la dignité je suis prêt à vous donner toutes les chambres que vous voulez ! La seule chose que je vous demande c'est de les payer, c'est tout !`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Ah, Biographie ! (Pet)… Biographie…`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Arthour !… Couhillère !`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Interprèèète ? Interprèèète, couhillère ?`,
      },
      {
        author: ['Alexandre Astier'],
        text: `La fleur en bouquet fane, et jamais ne renaît !`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Arthour !… Pas changer assiette pour fromage !`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Couhillère, couhillère, couhillère ! Ave Cesar ! (fait un vent)`,
      },
      {
        author: ['Alexandre Astier'],
        text: `MÉTÉOOOOOOOOO !`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Troupa ! Troupa ! Troupatroupatroupatroupa ! TROUPA ! HAHAHAHAHAHAHA ! Troupaskaya !`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Arthour ! On est fort en pomme.`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Arthour ! Qu'est-ce à dire que ceci ? ON EST FORTS ! En pommes…`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Non posso volo, no tépo mayo. Un posso volo, tandolon toulo. Tamasso (pet) tanlamalasso. Tamasso (pet) les oiseaux petits (sur l'air de "À la volette")`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Les oiseaux sifflent, le printemps siffle !`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Arthour, j'apprécie les fruits au sirop !`,
      },
      {
        author: ['Alexandre Astier'],
        text: `SALSIFIS !!!!!!`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Jouer ! Guerre ! Salsifis ! (fait un vent)`,
      },
      {
        author: ['Alexandre Astier'],
        text: `HAHA, Sire ! Je vous attends ! À moins que vous préfériez que l'on dise partout que le roi est une petite pédale qui pisse dans son froc à l'idée de se battre !`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Sire ! Mon père est peut-être unijambiste, mais moi, ma femme n'a pas de moustache ! […] Alors ça vient? p'tite bite !`,
      },
      {
        author: ['Alexandre Astier'],
        text: `En garde, espèce de vieille pute dégarnie !`,
      },
      {
        author: ['Alexandre Astier'],
        text: `JE NE MANGE PAS DE GRAINES !`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Je ne bouffe pas que des graines, Sire, mais j'estime que si on avale l'équivalent de son poids en viande deux fois par jour, il ne faut pas s'étonner de ne pas pouvoir mettre un pied devant l'autre sur un champ de bataille.`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Moi, une fois, j'étais soûl comme cochon, je me suis fait tatouer "J'aime le raisin de table" sur la miche droite, et ça y est toujours !`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Non, je veux dire « malade mental », c'est votre maximum, comme insulte ? Non parce qu'il va falloir passer le cran au-dessus, mon vieux, parce que sinon, on y est encore demain !`,
      },
      {
        author: ['Alexandre Astier'],
        text: `En garde, ma biquette ! Je vais vous découper le gras du cul, ça vous fera ça de moins à trimbaler !`,
      },
      {
        author: ['Alexandre Astier'],
        text: `(À Bohort) Mais allez-y bon sang, magnez-vous le fion, espèce de grosse dinde !`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Seigneur Bohort ! Je commence à en avoir plein le dos de votre comportement de péteux ! Vous allez me faire le plaisir de me faire une bonne insulte et de vous foutre en rogne une bonne fois pour toutes !`,
      },
      {
        author: ['Alexandre Astier'],
        text: `(À Grüdü) Quand on est idiot, on plante des carottes on ne s'occupe pas de sécurité !`,
      },
      {
        author: ['Alexandre Astier'],
        text: `(Sur l'air de "À la Volette") Le bon roi Arthur est une p'tite tapette. Le bon roi Arthur est une p'tite tapette. Est une p'tite à la volette, est une p'tite à la volette, est une p'tite tapette.`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Du nerf, mon lapinou !… Vous allez vous faire tailler le zizi en pointe !`,
      },
      {
        author: ['Alexandre Astier'],
        text: `ALLEZ, EN GARDE GROSSE CONNE ! Non, ça va pas, ça va pas !`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Non mais c'est à se coincer les parties dans une porte !`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Vous savez quoi, Sire ? On va commencer par se faire une saucisse grillée de trois pieds de long, avec un tonnelet de pinard chacun, et derrière, peut être bien qu'on se paiera des filles. Ah oui ! A un moment, vive la vie !`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Vous êtes attendus aux archives. Vous, vous, vous je croyais que vous étiez mort, et vous ... me souviens plus ! Voilà ! Zut !`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Euh, juste une chose... Manquez encore une seule fois de respect au futur roi de Bretagne, et je vous coupe les boules ! Ca vous fera une jolie petite sacoche pour ranger vos dés à coudre.`,
      },
      {
        author: ['Alexandre Astier'],
        text: `(Manilius : Et ben je suis euh...) Je suis, je suis, je suis une petite tapette, qui parle à tort et à travers, sans que personne ne lui demande son avis, alors elle ferme son bec la poupoule... Et elle laisse parler les grands garçons.`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Regardez moi la jolie petite paire de fillettes, si c'est pas fragile!`,
      },
      {
        author: ['Alexandre Astier'],
        text: `(attendez, je mange avec le pape tous les midis moi.) Ah ouais ? Eh bien moi je mange avec mon tonton Gethenoc et ton pape TU PEUX TE LE FOUTRE DANS LE CUL !`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Faudrait voir à pas oublier que sans les Romains, on serait jamais qu'une bande de pécores qui pataugent dans la bouse !`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Non mais attendez, je crois qu'on s'est mal compris, là : vous avez une idée du temps qu'il me faut pour tracer une lettre avec ces PUTAINS DE PLUMES ?!`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Oh oui oui, c'est magnifique, oui, oui, il y a des taches, c'est tout barré, j'ai tellement raturé que j'ai transpercé le papier... C'est immonde... on dirait que j'ai lavé par terre avec, mais c'est fait...`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Non mais là ! Pourtant vous allez pas dire que j'suis à cheval sur les principes ! Mais question chasteté on a quand même un chevalier sur huit qui est cul nu !`,
      },
      {
        author: ['Alexandre Astier'],
        text: `(a propos de la tenue de calogrenant) C'est chaste mais c'est pas officiel, et la Table Ronde c'est pas un bal costumé, merde !`,
      },
      {
        author: ['Alexandre Astier'],
        text: `personnage : Non, je suis désolé, moi je peux pas faire une légende avec un fakir qui enroule sa bite autour d'un bâton. En plus, je sais même pas comment ça se dit en latin.personnage : Quoi ? Bite ?personnage : Non, fakir.`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Voilà ! C'est tout ce qu'y a ! Unisson, quarte, quinte et c'est marre ! Tous les autres intervalles, c'est de la merde ! Le prochain que je chope en train de siffler un intervalle païen, je fais un rapport au pape !`,
      },
      {
        author: ['Alexandre Astier'],
        text: `personnage : […] Et c'est joli.personnage : Et c'est de la merde.`,
      },
      {
        author: ['Alexandre Astier'],
        text: `MAIS VOUS ÊTES DES MALAAAADES !!!`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Non, mais attention ! Si je deviens pape, y'a rien qui m'empêche de revenir de temps en temps pour faire un petit coucou.`,
      },
      {
        author: ['Alexandre Astier'],
        text: `(À Perceval) Vous racontez ce qui s'est passé, d'un coup, sans vous arrêter, et si vous changez des trucs, je vous envoie le registre à travers la gueule. Vu ?`,
      },
      {
        author: ['Alexandre Astier'],
        text: `En voilà une bonne chose, faisons la liste des cons, et puis ça me donnera l'occasion de gratter du papier.`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Ouais, ben si vous vouliez du captivant, fallait peut-être me faire lire autre chose que des textes de lois !`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Moi je viens un peu en tant que médiateur hein, et je confirme hein, c'est une très grosse morue dont vous devriez vous méfier !`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Ave Cesar, rosae rosam, et spiritus rex ! Ah non, parce que là, j'en ai marre !`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Tempora mori, tempora mundis recorda. Voilà. Eh bien ça, par exemple, ça veut absolument rien dire, mais l'effet reste le même, et pourtant j'ai jamais foutu les pieds dans une salle de classe, attention !`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Les mômes maintenant, ils lisent, ils lisent, ils lisent et résultat...ils sont encore puceaux à 10 ans...`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Je ne reviendrai plus jamais, cette fois je le dis, je le fais, je reste chez moi. Merde. Ça suffit. `,
      },
      {
        author: ['Alexandre Astier'],
        text: `Santis recorda, santis deus rex. (Galessin: ce qui veut dire ?) Absolument rien.`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Vous êtes chevalier, je suis roi… Je vous demande de venir, vous venez et puis c'est tout !… Je vais pas non plus aller brûler un cierge sous prétexte que vous avez fait un tour de cheval !`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Pour faire court, vous êtes ici chez les salopards. C'est admis. On n'a pas des idées bien jojo, et on n'a pas peur de le dire ! On fomente, on renégate, on laisse libre cours à notre fantaisie.`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Voilà… Moi de mon coté j'avais parié que vous étiez encore trop branquignole pour savoir c'qui était à vous… Je vois que j'ai encore tapé juste !`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Oh là ! Attendez. Nous ici, on est en train de parler à quelqu'un d'intelligent. Si vous en êtes encore à respecter vos serments, on va couper court, on est tous très occupés.`,
      },
      {
        author: ['Alexandre Astier'],
        text: `[À Lancelot] Ah ! À ce propos, je dois vous avouer que j'ai longtemps réflechi à savoir comment vous deviez m'appeler. [...] Éh oui ! Parce que vous êtes pas, à proprement parler, un de mes sujets. Vous êtes pas sous mes ordres non plus. "Sire", c'est quand même un peu ampoulé. Alors j'ai pensé à beaucoup de choses. "Loth", "Seigneur", "Monsieur"... Je me suis même demandé si vous deviez pas m'appeler "vieille branche", "mon p'tit pote" ou "canaillou".`,
      },
      {
        author: ['Alexandre Astier'],
        text: `[À Lancelot] Alors là, pareil. J'vais dire une banalité : Ne jamais négliger les bienfaits du couple dans la fonction militaire ; surtout quand on est à poste de décisions. Moi, j'ai toujours mené mes troupes de façon laborieuse et pénible, pourquoi ? Avant tout - faut pas s'le cacher - parce que ma femme est une grosse salope.`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Moi, quand ma garce de femme est là, ça déménage pas mal aussi… Hier, elle m'a fendu le tibia avec une amphore, la salope !`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Victoriae mundis set mundis lacrima. Bon, ça ne veut absolument rien dire, mais je trouve que c'est assez dans le ton. `,
      },
      {
        author: ['Alexandre Astier'],
        text: `Quand on veut être sûr de son coup, Seigneur Dagonet… on plante des navets. On ne pratique pas le putsch.`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Bon ben voilà. Flat minimas et patria.`,
      },
      {
        author: ['Alexandre Astier'],
        text: `(À Venec) C'est un style que vous vous donnez d'être à moitié cul nu ? [...] Remarquez ça change. Et puis ça désacralise le guet-apens.`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Vous, vous êtes un peigne-cul en toutes circonstances. N'importe qui vous pousserait à n'importe quoi pourvu qu'il parle un peu fort.`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Non, c'est moi qui y suis pour quelque chose. Le coup d'État, c'est moi ! Le clan séparatiste, c'est moi ! Et d'une manière générale, j'ai un lien plus ou moins direct avec tout ce qui se manigance de vicelard en Bretagne depuis ces trente dernières années, ça tout le monde le sait. Ce qu'on sait moins en revanche, c'est la raison qui me pousse à faire tout ça... [Arthur : Oui je vous écoute, qu'est ce qui vous pousse à faire tout ça ?] L'amour ! Que je porte à ma femme, votre soeur. [Arthur : Demi-soeur !] Personne ne vous déteste plus qu'elle dans tout le royaume, sire. Et moi, pauvre fou d'amour esclave de ses yeux, je ne cherche qu'à contenter ses désirs de vengeance. Me commanderait-elle de venir attaquer vos armées seul contre un million, je le ferais sans réfléchir. Alors quand cette salope a su que Lancelot organisait une armée séparatiste, elle m'a ordonné de m'associer à lui et de lui filer du pognon. Et moi, pauvre bête dressée, je me suis lâchement exécuté. Misa brevis et spiritus maxima... Ça veut rien dire, mais je suis très en colère contre moi même. `,
      },
      {
        author: ['Alexandre Astier'],
        text: `Odi panem quid meliora ! ça ne veut rien dire mais je trouve que ça boucle bien.`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Nun pecat et nun replica. Non ça veut rien dire mais bon euh...`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Mais alors la ! In medio stat virtus. Non c'est tout a fait correct, la vertu est dans le juste milieu en revanche, ça n'a rien à voir avec la conversation`,
      },
      {
        author: ['Alexandre Astier'],
        text: `C'est allé relativement vite, mais il a quand même fallu que je m'y reprenne à deux fois… J'l'avais pourtant étranglé pendant cinq bonnes minutes, le fumier ; il était bleu outre-mer, avec une jolie langue gonflée comme une escalope de dinde ; et pourtant croyez-moi si vous voulez, il respirait encore, la vieille carne. Et, je sais pas si c'est cette respiration paniquée et sifflotante, ou alors si c'est le fait qu'il me fixait avec de grands yeux rouges - parce que tous les vaisseaux avaient pété - mais je me suis senti un peu déstabilisé. Alors j'lui ai bourré la bouche avec un linge trempé dans de l'huile de lampe et j'ai foutu le feu. Bah, ça répond à votre question du coup : oui, c'est allé assez vite.`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Oui mais, quand je reste trop dans ma baraque, je conspire, c'est un réflexe. Du coup, je prends l'air, ça vaut mieux pour tout le monde.`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Ah, mais c'est pas possible, ça ! J'ai pas envie, de participer ! À rien ! C'est pas mon genre, de participer ! Jamais je participerai ! À part à vos obsèques, bande de cons !`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Mais ils sont tous plus débiles les uns que les autres ces pigeons. Les nôtres, quand on les envoie à Kaamelott on se les fait systématiquement ramener par la vieille de la ferme d'à coté ! [...] ça s'adresse à personne, les pigeons sont cons, point !`,
      },
      {
        author: ['Alexandre Astier'],
        text: `(A Galessin : "Le rapport entre quoi et quoi ?") Entre Excalibur et le fromage gratiné. Réponse : Aucun. C'est une métaphore moisie tiraillée entre votre stupidité d'ordre général et votre surprenante inaptitude à utiliser les métaphores...`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Aretropeca tetre domini, ça n'a aucun sens, mais bon. Y a retro, y a pecat, on peut vaguement en faire quelque chose!`,
      },
      {
        author: ['Alexandre Astier'],
        text: `(A Dagonnet : Attendre... Attendre que les choses se désagrègent d'elles mêmes. Attendre que Kaamelott tombe en lambeaux patiemment, pierre après pierre, chevalier après chevalier.Attendre, et se tenir prêts ! Prêts à se faufiler dans le moindre interstice ! "Ferme bien tes portes Arthur !" - et là je suis en adresse directe pour créer un palier d'intensité - "Ferme bien tes portes Arthur, car nous essaierons toutes les issues ! Et si par mégarde..." - et là j'enchaîne sur une métaphore prédatrice - "Si par mégarde tu oublies la petite lucarne, le renard saura se faire assez mince pour y passer !" Et là normalement, il faut une citation latine mais Pfff... J'en ai marre ! `,
      },
      {
        author: ['Alexandre Astier'],
        text: `Vous entendez ça ? Il parait que je suis malpoli ! Qu'est-ce que vous en pensez, bande de trous-du-cul ?`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Moi, après deux heures de retard, j'ai passé le cap de l'agacement. Le peu de volonté que j'avais de me farcir une réunion avec ce débile de Dagonet a définitivement disparu. Je suis une sorte de meuble.`,
      },
      {
        author: ['Alexandre Astier'],
        text: `[À Galessin] Mais parce que votre existence est merdique mon pauvre ami, vous avez l'oeil qui brille à chaque fois qu'un oiseau pète, c'est triste à voir. Ça fait des années que vous menez un train de vie de noix de St-Jacques, alors évidemment, un message qui annonce la visite d'un imbécile porteur de bonnes nouvelles, c'est déjà un petit festival pour vous ! J'suis sûr que vous vous êtes peigné pour l'occasion !`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Euh, "Vous êtes là.", c'est-à-dire qu'il est surpris lui-même ; ça lui viendrait pas à l'idée de raccorder le fait qu'on est là avec le fait qu'il nous l'a demandé.`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Moi c'est comme vous sentez, j'ai eu deux heures à vide, c'est pas si souvent, je pense que j'en ai inconsciemment profité pour dresser un petit bilan.`,
      },
      {
        author: ['Alexandre Astier'],
        text: `J'ai soudain la sensation limpide d'avoir gaspillé ma jeunesse... L'avoir vue s'échapper de mes mains comme l'anguille effrayée et m'appeler à présent sur le lierre du tombeau, où patientent depuis toujours le chant des enfants, les raisins volés…`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Je vais y aller, de jour, devant tout le monde. Et si je deviens roi de Bretagne, je vous nomme respectivement Ministre des armes, et Responsable de la protection des frontières. Parce que mon destin, c'est de m'entourer de nuls, de vrais nuls… Timeo libri rex agitur, ça veut rien dire, mais c'est ce que j'ai trouvé de plus… aigre !`,
      },
      {
        author: ['Alexandre Astier'],
        text: `(À Arthur) Avant de vous lancer dans les excès de virilité, vous auriez la curiosité de jeter un oeil à la table du fond. Je suis venu avec quelqu'un qui veut vous parler... [Tavernier : Qu'est ce qu'on fait, là ?] Rien, y faut surtout pas s'en mêler. Comme quand deux chats sauvages se retrouvent sur le même terrain. Y s'observent et aucun des deux ne baisse le regard sous peine d'être saigné à blanc. Ce qui couperait court, c'est qu'il y en ait un plus faible que l'autre, mais là c'est pas le cas. C'est les deux même sales bestioles, inflexibles, indomptables et vivaces. Y tiennent ça de leur mère ! [Tavernier : De leur mère ? vous voulez dire que c'est sa soeur ?][Arthur et Anna : Demi-soeur !] Ah ! ça cause. Le dialogue s'amorce ! Peut être que vous vous ferez pas dévaster votre boui-boui.`,
      },
      {
        author: ['Alexandre Astier'],
        text: `(À Anna) j'aime autant vous dire que quand une bande de détrousseurs embusqués nous tombera sur la viande, et qu'il lui prendra le goût de vous passer dessus en file indienne, je lèverai pas le petit doigt.`,
      },
      {
        author: ['Alexandre Astier'],
        text: `[À Léodagan] Écoutez, comme ça à priori, ça m'évoque rien, mais honnêtement c'est possible. Ce serait assez le genre de la maison, en tout cas ! De l'autre côté, voyez un peu l'ironie, si j'avais pas fomenté une attaque par l'ouest, vous seriez allés vous écraser contre les Romains à l'est !Oui, alors, pourquoi ? Pourquoi trahir sans arrêt les gens avec qui je collabore ? Je dirais que c'est probablement une réponse compulsive à une crainte de m'attacher. Briser une relation plutôt que la cultiver pour ne pas se retrouver démuni face au bonheur. Oui, pour répondre à votre question : j'ai peur d'aimer !`,
      },
      {
        author: ['Alexandre Astier'],
        text: `[Aux rois de Logres] Bon. Ca c'est bien gentil mais… À quel moment on trahit ?`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Ah voilà ! Et c'est là le danger de la métaphore... si on parle avec des gros tas de bidoches, au bout de cinq minutes personne ne parle de la même chose!`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Oui. Alors moi je pourrais vous dire que, si on cueille pas les cerises quand elles sont sur l'arbre, on fera tintin pour le clafouti. Mais on sera pas plus avancé.`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Moi les premières années avec ma femme, je faisais ces conneries aussi. Une réunion hebdomadaire pour régler les problèmes avant qu'ils ne s'enveniment. Résultat : aujourd'hui, quand elle tombe sur moi dans les couloirs de la maison, elle a des remontées gastriques, elle me trouve laid et con, et elle essaie de me tuer trois fois par semaine. Euh depuis, les tables rondes, j'y crois plus beaucoup...`,
      },
      {
        author: ['Alexandre Astier'],
        text: `(À propos des biscuits de la marraine du roi d'Armorique) Ils sentent la pisse, aussi.`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Deus minimi placet : seuls les dieux décident.`,
      },
      {
        author: ['Alexandre Astier'],
        text: `[À Galessin] Soyons futés. [...] Non... mais pas vous ! Vous, vous pouvez rester tsoin-tsoin comme d'habitude.`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Votre salope de fille m'a renversé une pleine soupière de bouillon sur toute la zone génitale, ça m'a LITTÉRALEMENT cuit les boules ! Vous remarquerez à quel point il m'est égal de parler de mes noix à ma belle-mère, famille de tarés !`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Il est roi d'Orcanie, le sanglier boulimique, chère madame !`,
      },
      {
        author: ['Alexandre Astier'],
        text: `[Parlant de sa femme, Anna] Bon bah moi... je la suis ! Parce que je suis... très amoureux.`,
      },
      {
        author: ['Alexandre Astier'],
        text: `"Mundi placet et spiritus minima", ça n'a aucun sens mais on pourrait très bien imaginer une traduction du type : "Le roseau plie, mais ne cède... qu'en cas de pépin"... ce qui ne veut rien dire non plus.`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Bon bon... Moi c'que j'en dis, c'est que, si vous arrivez à contenir vos élans, et à me laisser gérer tout ça à ma sauce, on pourrait bien se retrouver à la tête du Royaume en moins de temps qu'il n'en faut pour dire putsch. Ha ha ha ! J'aime assez ce p'tit ton décalé euh...`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Absque argento... Et j'ai plus la suite... Ce qu'est dommage parce que, il y a argento, on se dit le gars est bon, il y a pognon, et patatrac il en a une sous le coude.`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Libido sciendi ! Le désir de savoir ! Oui bon un peu tiré par les cheveux dans le contexte.`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Argumentum baculenum ! L'argument du bâton. Ah bah zut qui est a la fois correct et dans le propos... Donc on va lui préférer "Delenda Cartago", il faut détruire Carthage, qui est juste très con.`,
      },
      {
        author: ['Alexandre Astier'],
        text: `La politique, j'en connais qu'une : un soldat pour trente péquenots et le premier bouseux qui se plaint des taxes, on lui coupe un pied !`,
      },
      {
        author: ['Alexandre Astier'],
        text: `[Arthur : De toute façon, faudra bien vous y faire parce qu'à partir de maintenant, on va s'appeler Les Chevaliers de la Table Ronde !]Encore une chance qu'on se soit pas fait construire un buffet à vaisselle, hein !`,
      },
      {
        author: ['Alexandre Astier'],
        text: `[À personnage] Vous parlez comme les bouquins. Bon, moi, c'est l'idée que j'm'en fais, j'peux pas blairer d'lire.`,
      },
      {
        author: ['Alexandre Astier'],
        text: `[Dame Séli : J'ai envie de faire des tartes, voilà. Vous allez pas m'obliger à me justifier !] Ah bah non, du moment que vous nous obligez pas à les manger !`,
      },
      {
        author: ['Alexandre Astier'],
        text: `C'est dingue, cette histoire ! C'est pas parce que vous faites des tartes pour des petits-enfants qui existent pas que je dois les emmener à la pêche, si ?!`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Sans vouloir la ramener, la seule différence concrète avec des briques, c'est que vous appelez ça des tartes !`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Ah bah c'est sûr qu'c'est pas Jo l'Rigolo.`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Non, mais attendez, vous faites semblant de négocier, tranquille. Pendant ce temps, moi je fais celui qui va pisser, là bas, et quand j'arrive à sa hauteur, tac, je sors ma dague et je l'ouvre en deux par le bas.`,
      },
      {
        author: ['Alexandre Astier'],
        text: `J'pense pas que deux trous-du-cul soient plus efficaces qu'un seul !`,
      },
      {
        author: ['Alexandre Astier'],
        text: `(a Séli a propos de Yvain) C'est vous qui lui avez mis ces conneries dans le crâne ?! Mais je vous préviens, la prochaine que je le vois avec un luth, je lui casse sur la tête !`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Fier ?! J'vais l'envoyer trois mois à poil dans la forêt à bouffer des asticots et des racines, j'vous garantis que quand il reviendra, il fera moins de poèmes, hein !`,
      },
      {
        author: ['Alexandre Astier'],
        text: `(a Yvain) Tu vas aller te battre ou je t'en mets une ! [...] (à Séli) Ah, et si vous vous voulez pas en prendre une par ricochet, je vous conseille de pas la ramener !`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Vous allez pas être embêté avec une maîtresse qu'a plus d'mains ?`,
      },
      {
        author: ['Lionnel Astier'],
        text: `[À Bohort] Vous êtes marié, comme moi ; vous savez que la monstruosité peut prendre des formes très diverses.`,
      },
      {
        author: ['Lionnel Astier'],
        text: `Qu'est-ce que vous voulez, mon p'tit Bohort : entre son épée qui fait de la lumière, son Merlin qui fait pleuvoir des grenouilles et sa Dame du Lac qui se prend pour une truite, il lui manque plus qu'un numéro de trapèze, au roi des Bretons.`,
      },
      {
        author: ['Alexandre Astier'],
        text: `(À propos d'Yvain) Il dit tellement rien qu'on dînerait avec un tabouret ce serait pareil.`,
      },
      {
        author: ['Alexandre Astier'],
        text: `(À table, en famille) Calogrenant, c'est le roi des cons.`,
      },
      {
        author: ['Alexandre Astier'],
        text: `(À Arthur) Dites tout de suite que j'ai des idées de tocard !`,
      },
      {
        author: ['Alexandre Astier'],
        text: `(À Bohort) Faut toujours que vous veniez foutre votre merde, vous…`,
      },
      {
        author: ['Alexandre Astier'],
        text: `(À Arthur) C'est vrai que c'est curieux cette manie de pas vouloir torturer ; ça vient de quoi, ça ?`,
      },
      {
        author: ['Alexandre Astier'],
        text: `(À Goustan le Cruel, parlant d'Arthur) Tenez ! c'est le mot que je cherchais… Il gouverne comme une femme !`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Alors quand je rentre la taverne à quatre pattes vous tapez des crises à rallonge, et ce soir, tout a coup, on est viril quand on picole.`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Ma parole, des engins comme vous, ça devrait être fourni avec une notice !`,
      },
      {
        author: ['Alexandre Astier'],
        text: `(À Bohort) C'est quand même formidable ce pays, faut galoper à coté de la route pour pas se casser la gueule !`,
      },
      {
        author: ['Alexandre Astier'],
        text: `(À Bohort) Le minotaure... Le minotaure c'est jamais qu'une grosse vachette montée sur deux pieds, hein! C'est pas ça qui va m'empêcher d'dormir !`,
      },
      {
        author: ['Alexandre Astier'],
        text: `C'est quand même magnifique une armée bien coordonnée, hein... Ben quoi, vous allez pas m'dire qu'on a pas l'air con avec nos drapeaux, ça fait une heure qu'on fait des signes ; y'en a pas un qui va dans le même sens !`,
      },
      {
        author: ['Fabien Rault'],
        text: `Mais qu'est-ce que vous venez me gonfler avec votre père Blaise !`,
      },
      {
        author: ['Alexandre Astier'],
        text: `(à Séli) Il y a des fois vous admettrez que vous êtes hors-normes.`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Non mais bien sûr ! Donc vous dégommez des souris au maillet vous.[...] Non mais ce qui compte c'est le résultat. Au maillet, au tir à l'arc... Vous avez essayé la catapulte ?`,
      },
      {
        author: ['Alexandre Astier'],
        text: `(À Guenièvre et Séli) Vous voyez où ça mène, vos pique-niques à la con ?`,
      },
      {
        author: ['Lionnel Astier'],
        text: `J'dis déjà pas merci dans ma langue, alors je vais pas l'apprendre en picte.`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Personnellement, la condition paysanne, j'me la taille en biseau, voyez.`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Qu'est ce que c'est que ce style ? Vous bradez ma piaule sur les marchés maintenant.`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Ah bah c'est réglé hein, j'confirme ! En c'moment, il range ses slibards dans ma commode !`,
      },
      {
        author: ['Alexandre Astier'],
        text: `J'ai pas gueulé, je leur ai signifié gentiment qu'on était pas chez les romanos et qu'il fallait qu'ils décarrent vite fait d'leur canfouine avant de prendre ma main dans la tronche !`,
      },
      {
        author: ['Alexandre Astier'],
        text: `(À Arthur) Moi au moins quand je parlemente, c'est pas vicelard.`,
      },
      {
        author: ['Alexandre Astier'],
        text: `J'ai toujours eu du bol avec l'aléatoire, moi.`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Ah je sais pas, je sais pas. Vous savez avec lui ["Arthur"] ça fait longtemps que j'ai arrêté les pronostics!`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Non mais asseyez-vous ou je vous casse votre assiette sur la tête.`,
      },
      {
        author: ['Alexandre Astier'],
        text: `C'est pas parce qu'un vieux moisi vient nous baver dans les étagères que ça vaut forcément que'que chose.`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Remarquez… Bohort, éclaireur… rien que pour la curiosité…`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Ooooooooh, non mais faire du labyrinthe avec un trou-de-balle pareil, faut drôlement de la vaillance, hein !`,
      },
      {
        author: ['Alexandre Astier'],
        text: `(Hurlant) QUAND J'PENSE QUE J'AI R'FILÉ MA FILLE À UN ROMAIN ! J'SUIS À DEUX DOIGTS D'CRÂMER L'CHÂTEAU !!`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Avec un pif pareil, ils feraient mieux de chercher des truffes plutôt que de nous emmerder !`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Vous savez c'que c'est, mon problème ? Trop gentil.`,
      },
      {
        author: ['Alexandre Astier'],
        text: `En tout cas, on a cramé leur tueur, s'ils veulent le récupérer, il est facile à transporter.`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Ben c'est pas pour prendre la défense de la petite, mais c'est vrai qu'il tabasse le rouquin aujourd'hui.`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Avant de parler d'hygiène, qu'ils arrêtent déjà de chier par les fenêtres !`,
      },
      {
        author: ['Alexandre Astier'],
        text: `(au père Blaise) Vous mériteriez que je vous foute à la lourde avec les chiens au calcif !`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Moi une fois, j'étais tellement raide que j'avais l'impression de me faire attaquer de tous côtés, j'me défendais, j'me défendais... En fait, j'étais dans un pâturage, j'ai tué 76 chèvres !`,
      },
      {
        author: ['Alexandre Astier'],
        text: `(à Arthur) Hé ouais ! C'est pas les idées qui vous manquent, c'est la conviction de devoir les réaliser !`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Bon, par exemple : moi j'adore les fraises, bon bah si j'bouffe 3 bassines de fraises en 1 heure ah bah... j'choppe la chiasse hein, j'suis comme tout l'monde hein...`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Parce que votre bal merdique, c'est enrichissant ? Quatre jours à voir gigoter des tarlouzes, rien que d'y penser ça me scie les nerfs !`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Euh... C'est moi ou y a une ambiance de merde ?`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Moi, j'ai appris à lire, et ben je souhaite ça à personne !`,
      },
      {
        author: ['Alexandre Astier'],
        text: `(À Séli, à propos de Merlin) Quoi, j'y vais ? Je l'avoine ?`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Eh bah mon vieux... Pour ça comme pour le reste, on n'est pas à la hauteur de la légende.`,
      },
      {
        author: ['Alexandre Astier'],
        text: `(À la Dame du Lac, que tout le monde peut voir, sauf Arthur) Nooon, mais c'est bon, ne me prenez pas pour une bille, non plus ! Vous êtes la Dame du Lac.`,
      },
      {
        author: ['Alexandre Astier'],
        text: `(à propos du prix d'un nouveau modèle de catapulte) Là pareil, on reste dans du classique : la peau du fion.`,
      },
      {
        author: ['Alexandre Astier'],
        text: `(à propos de la grande porte du château) Vous allez me faire le plaisir de faire péter cette saloperie que je puisse faire sortir la machine, hein!`,
      },
      {
        author: ['Alexandre Astier'],
        text: `(Seli : Vous piquez le blé du royaume !) Je le pique pas ! Je le canalise ! L'idée de départ est tout de même différente.`,
      },
      {
        author: ['Alexandre Astier'],
        text: `(Arthur : Je devrais vous [Guethenoc et Roparzh] envoyer tout les deux aux galères pour vingt-cinq ans !) Je devrais, je devrais... Vous commencez à nous faire chier avec vos conditionnels ! Balancez-moi ces deux cons aux galères et qu'on en parle plus !`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Hé ben, ils nous auront fait chier jusqu'au bout les Grecs.`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Bah oui, on est sur une île, et je mets des tourelles sur les côtes alors tant que j'aurai pas fait le tour, il va m'en falloir encore.`,
      },
      {
        author: ['Alexandre Astier'],
        text: `(Arthur : J'avais peur que vous rasiez toutes les cabanes du pays.) Ah bah ouais… Peur justifiée !`,
      },
      {
        author: ['Alexandre Astier'],
        text: `C'est marrant parce que, d'habitude, dans les tartes, moi, je mange les fruits puis je laisse la pâte. (Arthur : Et là, vous faites l'inverse ?)Hein ? Ah non, là, je laisse tout.`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Ben moi en général, je lui réponds "merde". En principe ça colle avec tout.`,
      },
      {
        author: ['Alexandre Astier'],
        text: `[Séli: Qu'est-ce que vous avez glandé encore vous?]Est-ce que je sais moi? A force de systématiquement tout faire pour le mettre de travers, j'me souviens plus de tout...`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Oh, la fierté… Si j'avais dû être à cheval là-dessus, je vous aurais pas épousée, déjà.`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Moi, j'étais sûr qu'ils reviendraient crevés ; ils sont vivants, un succès. Mieux, une surprise.`,
      },
      {
        author: ['Alexandre Astier'],
        text: `On a les mains prises ducon !!!`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Heu... à propos de devenir marteau, vous savez que chez moi ça peut aller assez loin ? Parce que bon, mettons là heu... on s'pose, on analyse le truc. Le crin-crin, ça fait des heures que ça dure et en plus, vous vous y mettez à plusieurs... Et ben moi le machin, une fois que j'en ai fait des copeaux, et ben je peux très bien mettre le feu au plumard ! Même au mobilier, ça m'fait pas peur !`,
      },
      {
        author: ['Alexandre Astier'],
        text: `(À Dame Séli) En somme, il faudrait déclarer la guerre à Lancelot pour récupérer la Reine et donner un héritier au trône, en tablant sur l'éventualité que la Reine est enceinte et pas d'une fille ? [Dame Séli : En somme] Et c'est moi le paramètre hasardeux ?`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Elle est choucarde celle la ou pas ?`,
      },
      {
        author: ['Alexandre Astier'],
        text: `(À Élias de Kelliwic'h ) Eh ben, vous avez une de ces tronches, vous ! [Élias : Quoi ? Quelle tête ?] J'en sais rien mais plus que d'habitude, hein ! Vous avez toujours une mine de chiotte mais là... J'sais pas si c'est la lumière du feu ou quoi, mais on dirait que vous êtes mort.`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Je vous le dis, cette histoire ça pue !`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Ce qu'il y a de bien avec les opinions tranchées, c'est qu'ça relance le débat. En somme vous êtes une sorte de provocateur, quoi.`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Prenons un symbole connu : le Graal. Tout le monde sait bien que c'est beaucoup plus qu'un vase, hein ? Y'a toute une signification autour. Mais regardez ça par exemple : c'est une couronne. Alors d'un point de vue purement concret, ça veut juste dire que je suis Roi. Mais d'un point de vue symbolique, c'est beaucoup plus intéressant... Par exemple, cette couronne nous informe symboliquement que tous les mous du slibard qui avaient l'habitude de se les rouler sous l'ancien régime vont devoir se mettre un coup de fouet s'ils veulent pas que je leur mette moi-même. Cette couronne symbolise la fin des haricots et la décarrade des tire-au-flanc, et surtout l'avènement de l'ordre et de la discipline. En d'autres termes, la rigolade, c'est terminé.`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Et qu'est-ce que vous voulez que j'y fasse à la paperasse, moi ? Vous me prenez pour un serre-livre ?`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Parce qu'au bout d'un moment, il va falloir envisager la possibilité de me lâcher la collerette !`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Non, mais je crois que mes ambitions se résument clairement : la férocité avant tout.`,
      },
      {
        author: ['Alexandre Astier'],
        text: `(À Séli) Vous voulez que j'aille lui mettre une avoine ? `,
      },
      {
        author: ['Alexandre Astier'],
        text: `Dites, vous savez qu'à solliciter trop souvent la patience des gens, on finit par agacer ? `,
      },
      {
        author: ['Alexandre Astier'],
        text: `(À Loth) Alors, si vous êtes plus à l'aise avec les notions concrètes, je peux vous proposer mon pied dans les noix...`,
      },
      {
        author: ['Alexandre Astier'],
        text: `(En parlant d'Yvain et Gauvain) Ils ont la notion de rien ! Même la notion de la menace que représente mon pied au cul ils l'ont pas. C'est désespérant.`,
      },
      {
        author: ['Alexandre Astier'],
        text: `(À Séli) Les coups de génies, j'ai pas besoin qu'on me les souffle.`,
      },
      {
        author: ['Alexandre Astier'],
        text: `(À Séli) Oui vous avez raison, soyez pas trop d'mon côté. On aurait l'air un peu couple à la con à être tout l'temps d'accord !`,
      },
      {
        author: ['Alexandre Astier'],
        text: `(À Loth) Je veux bien passer sur vos tentatives de putsch, vos combines véreuses, vos alliances bidon, et tout le reste... En revanche, si vous ne la fermez pas tout de suite, mais, définitivement, je vous aplatis les boules avec ça.`,
      },
      {
        author: ['Alexandre Astier'],
        text: `(Aux rois de Logres) Moi je vous le dis, si on monte pas dans le char quand il nous passe sous le nez, on finira la route à pied.`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Eh les gars, vous savez ce qu'on bouffe ce soir ? DU ROMAIN !`,
      },
      {
        author: ['Alexandre Astier'],
        text: `(a calogrenant) Je vous ai déjà expliqué, les gens s'ennuient a votre contact. Donc ils vous disent rien sur eux. Oui j'ai une soeur, et tout un tas d'autres trucs que je vois pas l'intérêt de vous confier. Alors arrêtez d'en être surpris.`,
      },
      {
        author: ['Alexandre Astier'],
        text: `...Le fils Pendragon est de retour. Eh bah qu'il vienne ! On le collera au bêchage tiens ! Comme ça il sera pas venu pour rien.`,
      },
      {
        author: ['Alexandre Astier'],
        text: `(Maclou : il y a quelque chose au fond) De la merde ? (Maclou : ça fait des traces) Des traces de merde ?`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Je lève mon verre au retour de ma fille, et du cornichon pesteux qu'on croyait canné qui l'a délivré.`,
      },
      {
        author: ['Alexandre Astier'],
        text: `On construit un barrage, après on lance de la caillasse de l'autre côté de la rivière pour faire croire aux autres qu'on a traversé dans l'autre sens. Une fois qu'ils sont au milieu, on casse le barrage et on les noie. Ouais... le seul problème c'est que quand on a passé quatre semaines à construire un barrage, ça fait un peu mal au cul d'le détruire...`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Mais y a rien à développer ! C'est de la merde, c'est de la merde, c'est tout ! Moi, on me sert ça dans une auberge, le tavernier, il s'prend une quiche dans sa tête !`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Ce pain-là, il est cuit trop vite dans un four trop chaud ; la montée n'a pas le temps de se faire et il y a trop d'air dans la mie. […] C'est de la merde.`,
      },
      {
        author: ['Alexandre Astier'],
        text: `L'agneau était daubé du cul !`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Eh oui mémé, t'es bien mouchée!`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Par exemple, vous prenez aujourd'hui. Vous comptez sept jours. Ça vous emmène dans une semaine. Et bien on sera exactement le même jour qu'aujourd'hui… À une vache près, hein… C'est pas une science exacte.`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Des p'tits croutons tout vieux genre pour les lapins ? Ouais j'savais pas c'que c'était, dans le doute j'les ai bouffés.`,
      },
      {
        author: ['Alexandre Astier'],
        text: `[La politique de l'autruche, c'est] Une politique qui court vite, une politique qui fait des gros oeufs, c'est tout.`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Les chicots, c'est sacré ! Parce que si j'les lave pas maintenant, dans dix ans, c'est tout à la soupe. Et l'mec qui me fera manger de la soupe il est pas né !`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Si ça peut m'éviter de chlinguer du cul, je peux bien me tremper une ou deux fois par an.`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Qu'est-ce que c'est que ce style de bouffer des petits machins tout secs et trois gallons de flotte par jour ? […] Si la jeunesse se met à croire à ces conneries, on se dirige tout droit vers une génération de dépressifs ! Le gras, c'est la vie.`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Sire ! Enfin vous arrivez pour me sauver. […] De l'hypolipémie ! J'ai plus de gras dans le sang. Je vais me mettre à peler et à perdre mes cheveux…`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Ça y est… je vois trouble. C'est le manque de gras, je me dessèche.`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Vous nous utilisez bon gré mal gré pour arriver sur la fin.`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Le Graal par ci, le Graal par là. Le Graal par ci, le Graal par là. Le Graal par ci, le Graal par là. Le Graal par ci, le Graal par là...`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Mon frère, il peut pas aller à l'école. Quand on lui explique un machin technique, il s'évanouit.`,
      },
      {
        author: ['Alexandre Astier'],
        text: `C'est normal, c'est en se cassant la gueule qu'on apprend à marcher. Combien de fois j'ai failli m'étouffer avec un os de lapin. Il faut jamais se laisser abattre par un échec, c'est ça le secret.`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Oh le con ! Mais il est pas fini d'affiner ! `,
      },
      {
        author: ['Alexandre Astier'],
        text: `La neige qui poudroie dans la solitude de notre enfance. Qu'est ce que vous dites de ça ? `,
      },
      {
        author: ['Alexandre Astier'],
        text: `On tombe sur le fric, comme ça, du premier coup ! On s'est même pas fait un cor au pied !`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Cette histoire de Graal, ça a assez traîné ! […] Si c'est pas moi qui prend les choses en main, on y est encore dans cent piges… […] Préparez la fiesta, j'suis un héros !`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Parce que d'un point de vue santé publique, il vaut mieux bouffer ça une fois par mois que de la merde tous les jours. Je vais vous dire, à ce niveau là, c'est plus de la gastronomie, c'est de l'érotisme.`,
      },
      {
        author: ['Alexandre Astier'],
        text: `La joie de vivre et le jambon, y'a pas trente-six recettes du bonheur !`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Parce que mon couteau pour le pâté, euuh, y'a rien à faire, jm'en tape.`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Lorsqu'on le tient par la partie sporadique, ou boulière, le fenouil est un objet redondant.`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Tout à l'heure, on a vu que le chapelet de saucisses n'était pas un objet redondant. Et pourtant, on a pu lui trouver une utilisation périmétrique en s'en servant comme un fouet.`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Là, y'a les méduses, les insectes. Là, y'a les glandus, les grouillots. Là, y'a les mecs normaux. Là, y'a les chevaliers. Là, y'a les rois et les princes. Et après, bien au-dessus, y'a le Roi Arthur. Vous, vous aurez eu deux bonhommes dans votre vie, eh ben vous pourrez dire que vous avez tapé dans l'exception.`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Allez, faites-vous belle, que j'me pointe avec la came présentable.`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Ma femme… mon ex-femme… C'était peut être un peu moins prestige parce qu'elle est pas reine… mais au moins, elle habitait pas à six heures de marche avec un autre mec.`,
      },
      {
        author: ['Alexandre Astier'],
        text: `C'est pas que c'est difficile de la récupérer... C'est que c'est sa mère difficile de la récupérer, la race de sa grand-mère !`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Du passé faisons table en marbre.`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Vous dites pas : « Qu'est ce qu'il fait chaud… », vous dites : « La chaleur est un plat qui se mange froid. »`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Les chiffres, c'est pas une science exacte figurez-vous !`,
      },
      {
        author: ['Alexandre Astier'],
        text: `C'est compliqué mais c'est compliqué !`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Quand je pense à la chance que vous avez de faire partie d'un clan dirigé par des cerveaux du combat psychologique, qui se saignent... aux quatre parfums du matin au soir ! !`,
      },
      {
        author: ['Alexandre Astier'],
        text: `[Perceval: Si vous foutez tout en l'air, on vous envoie notre assassin, ça va pas traîner.]</br>Ouais. Ou alors le mec qu'on dirait qu'il marche normalement mais en fait il marche alternativement à cloche-pied sur chaque pied.`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Je refuse d'aller me battre pour soutenir une politique d'expansion territoriale dont je ne reconnais pas la légitimité.`,
      },
      {
        author: ['Alexandre Astier'],
        text: `(À Séli) Je peux pas y aller j'ai une otite.`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Est-ce qu'on a le droit de boire du cidre ?`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Je le prends pas le bouclier, ça fait trop nul !`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Mon père, y dit toujours qu'on arrive jamais en prison par hasard.`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Moi, je m'en fous, si on me force à y retourner, je retiens ma respiration jusqu'à qu'on arrête de me forcer à y retourner.`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Quand il a ouvert le ventre du troll, j'ai reçu un jet d'acide qui m'a pratiquement acidifié !`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Moi, je me suis fait dérober de l'alimentation tout le long du voyage ! Une véritable dérobade !`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Et moi, j'ai sympathisé avec un crémier qui m'a expliqué les tenants et les aboutissants de sa profession avec beaucoup de simplicité !`,
      },
      {
        author: ['Alexandre Astier'],
        text: `J'étais tellement en colère, je leur ai lancé un de ces regards… Ils ne sont pas venus chercher la monnaie de leur pièce.`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Ben Gauvain il est revenu, il s'était planté une écharde comme ça dans le doigt… N'empêche, si ça s'infecte, on peut en mourir, j'vous f'rais dire.`,
      },
      {
        author: ['Alexandre Astier'],
        text: `La colombe blanche et sèche, Retombe souvent sur sa poitrine, Elle vole quand même... c'est très bien, Et finit sa course dans la prairie de notre enfance.[…] Là sire j'avoue que c'est pour que ça rime avec blanche et sèche. […] Ben oui c'est une rime triple : Blanche et sèche, poitrine et prairie de notre enfance. `,
      },
      {
        author: ['Alexandre Astier'],
        text: `J'estime ne pas avoir à subir les fantasmes carriéristes d'une entité générationnelle réactionnaire et oppressive !`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Si je fais mon tour pas dans le même sens que vous, ça annule. Mais si je le fais dans le même sens que vous, ça le double !`,
      },
      {
        author: ['Alexandre Astier'],
        text: `C'est sûr que si y'a une dame à sauver et qu'il fait froid, on y va quand même, mais juste avant de sauver la dame, on enlève le lainage qu'on a mis, et comme ça ça montre qu'on craint pas le froid, et ça fait plaisir. `,
      },
      {
        author: ['Alexandre Astier'],
        text: `[Arthur: Pour faire simple: on peut douter de tout sauf de la nécessité de se trouver du côté des opprimés] Ah bon! C'est marrant parce que mon père, il a une phrase presque pareil: "On peut douter de tout sauf de la nécessité de se trouver du côté de celui qui a le pognon".`,
      },
      {
        author: ['Alexandre Astier'],
        text: `La chevalerie, c'est pas là où on range les chevaux ?`,
      },
      {
        author: ['Alexandre Astier'],
        text: `(Gauvain: Excusez nous mon oncle, notre vocabulaire n'est pas tres fourni) Ouais bah vous encore ça va, moi, même le mot vocabulaire je suis pas sûr à 100% !`,
      },
      {
        author: ['Alexandre Astier'],
        text: `(À propos d'une catapulte) Est-ce qu'on peut s'en servir pour donner de l'élan à un pigeon ?`,
      },
      {
        author: ['Alexandre Astier'],
        text: `En revanche, je suis triste pour un autre truc mais ça m'embête d'en parler... J'estime que chacun a le droit à son jardin secret.`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Je crois que je me suis coupé la gencive avec un grumeau cuit. C'est possible ou pas ?`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Dans ma chambre c'est le bordel, ça pue et y a des charançons.`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Et si on envoyait quelqu'un qui se faufile dans leur camp sans se faire repérer pour observer leurs faits et gestes ? […] Ou alors, ça fait doublon avec l'espionnage ? Je me rends pas compte.`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Parce que en fait dans notre langue, il y a que deux mots qui riment avec complète : c'est quiquette et biseautée. Alors ça va être chaud !`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Ne vous laissez pas embobiner… Ils cherchent à vous rembobiner !`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Il s'est acharné sur moi avec une sauvagerie mêlée de férocité. […] Celui qu'avait qu'une jambe. […] Oui, bah du coup, c'était le plus hargneux. C'était comme s'il se vengeait sur moi de sa jambe euh... Avec une sauvagerie mêlée de férocité.`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Ça pique trop de la vie, quoi : ça pique, ça lance, et derrière, comment ça re-pique trop.`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Vous pouvez pas savoir comment on est trop jouasse d'être là !`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Ouais, alors là où je vois que je suis vraiment à cran, c'est que quand vous avez dit malédiction, j'ai fait une série de tout petits pets comme ça : pft pft pft pft pft pft.`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Ah bah ouais mais là euh... Le voile noir, le chaos... J'ai passé un cap hein.`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Mais c'est trop sur votre route quoi ! Bon y'a une colline, deux collines du coup bi-collines et après c'est carrément votre route !`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Femme, cesse donc de nous esbaudir les oreilles ! Olala, il suffit !`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Ah bravo femme. Ce repas fut des plus roboratifs !`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Femme, comme je le disais tantôt,tu nous a roboré. Mais sauras tu nous régaler d'un dessert de ton choix ?`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Allez femme, robore nous donc de quelques fruits bien sucrés. Il s'agit d'une régalade !`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Femme ! Tu nous esbaubis les oreilles ! Rabats un peu ta casquette !`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Oh l'Irlande !`,
      },
      {
        author: ['Alexandre Astier'],
        text: `N'empêche que chez nous, on sait construire ! Les aqueducs, c'est quand même un petit peu plus classe que vos murs en merde séchée… Enfin, je dis ça, je dis tout !`,
      },
      {
        author: ['Alexandre Astier'],
        text: `On fait marrer tout le monde avec nos chenilles à la purée d'fraises et nos couilles d'oursins aux amandes, et je sais plus quelles autres saloperies !`,
      },
      {
        author: ['Alexandre Astier'],
        text: `MAIS ARRÊTEZ J'ARRÊTE PAS DE RETROUVER DES P'TITES BOULETTES DE CACA PARTOUT ! Me prenez pas pour un con, sans blague, c'était une bergerie ici ?`,
      },
      {
        author: ['Alexandre Astier'],
        text: `J'ai toujours dit que je supportais pas les jupes ; mais c'est l'uniforme réglementaire, j'y suis pour rien !`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Jamais je ne trahirai. Ave César ! Ave César ! […] La seule chose que je voudrais savoir, c'est si dans deux jours, je change d'avis… Est-ce que la proposition tient toujours ?`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Le poisson qui étouffe sur la berge remue plus que celui qui est dans l'eau. C'est bien la preuve de ce que je dis : si on se débat, c'est qu'on est en train de crever.`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Non, mais là vous auriez pu prévenir qu'il y avait un couvert de plus. Bon ça va que j'ai pas fait à manger, mais bon, c'est chaud.`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Ah bah en fait, c'est tout moisi seigneur breton. Parce qu'en plus, il faut que je nourrisse des mecs.`,
      },
      {
        author: ['Alexandre Astier'],
        text: `- Hé les connards ! Vous pouvez faire griller un porcelet s'il vous plaît ?`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Je bosse le jour, moi. Je suis dans l'armée, je tiens pas un stand de crêpes.`,
      },
      {
        author: ['Alexandre Astier'],
        text: `J'y suis dans ma maison pourrie. Les 2 pieds dans la merde de poules. Ça vous va ?`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Ah mais il y a un fouet ?! [...] Ah pardon... Ah ouais mais j'en sais rien, moi je vois pas d'ici... Mais si il y a un fouet je parle, c'est Arturus qui vous a tapé dessus... C'est bon là ? vous pouvez me détacher s'il vous plait ?`,
      },
      {
        author: ['Alexandre Astier'],
        text: `(En hurlant) MAGIE NOIRE ! MAGIE NOIRE ! Tais-toi, tais-toi, tais-toi la patte de poulet Satan hérétique ! !`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Oui eh ben ça a été dit et re-dit et re-re-dit, la magie est une activité démoniaque, il faut brûler cette personne. On va brûler. AU BÛCHER.`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Mon activité dans ce gouvernement est de brûler les personnes démoniaques, je VEUX BRÛLER CETTE PERSONNE !`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Ah, non, pour moi les femmes, j'aime pas ça… C'est de la saloperie !`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Vous venez me voir en confession... […] Ça prend cinq minutes et puis après on est tranquille, on peut faire ce qu'on veut.`,
      },
      {
        author: ['Alexandre Astier'],
        text: `(En parlant à Kadoc) Simplet ! Le démon a vidé ton cerveau, y'a plus rien dedans. Tu périras par la main de Dieu, tu comprends ça ?`,
      },
      {
        author: ['Alexandre Astier'],
        text: `(En parlant à Kadoc) Oh Regarde, Simplet, Regarde ! Il y a un morceau de charcuterie qui arrive ! Regarde le, Regarde ! (il attaque avec son épée) AU BÛCHER !`,
      },
      {
        author: ['Alexandre Astier'],
        text: `(En criant à Lancelot) Ce n'est pas notre affaire ! (Faisant semblant de pleurnicher) Alors voilà, j'ai un enfant de 4 ans et puis je vole des vêtements, je vole de la viande et puis personne ne me dit rien. Hunhun mon petit enfant de 4 ans, il n'a rien à manger.(En criant) S'il n'a rien à manger, il ne mange rien voilà ! La sentence est prononcée, voilà c'est fini !`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Sire, qu'est-ce que j'apprends de manière inopinée ? La rumeur colporte que vous ne vous êtes jamais confessé ! […] La confession, sire ! Sans confession, point de salut ! Sans salut, point... point ne sert de... à rien qui ne sait partir.`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Attention, attention… il va y arriver un moment où il y a des granges qui vont se mettre à flamber, faudra pas demander d'où ça vient !`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Je vais rentrer mes vaches, là ; elles sont accessibles ou faut que je fasse monter un échafaudage ?`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Ce que je dis, tout le monde s'en tamponne ! Je gueule, je gueule, j'pourrais gueuler dans le cul d'un poney ce serait pareil !`,
      },
      {
        author: ['Alexandre Astier'],
        text: `(À Roparzh) Non mais vous allez faire chier le monde pendant combien de temps vous encore, avec vos vaches pourries là, hein ?! Vous voyez pas que vous êtes pas fait pour l'agriculture ?! Hein, vous avez qu'à vous recycler dans la mendicité ! En plus, vous avez… Vous avez déjà la tenue !`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Je lui rembourse mes genoux, et si il a filé la vérole à mes bêtes, chuis... chuis un marteau moi ! Je crame tout, moi ! Ma ferme, la sienne, celles des autres, le château, j'fais flamber la moitié de la Bretagne.`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Ces bourgeois, ils savent plus quoi inventer ! A force de lire et d'écrire, ils deviennent tous plus cons les uns qu'les autres.`,
      },
      {
        author: ['Alexandre Astier'],
        text: `(À Roparzh) Excusez ! Y a moyen de vous entretenir deux secondes ? [Roparzh : Oui, c'est au sujet de quoi-t'est-ce ?] C'est au sujet que ce matin je suis passé par hasard devant vos enclos, et j'ai vu que vous aviez une jolie p'tite poule blanche ! [Roparzh : Oui, tout à fait !] Une jolie petite poule 'voyez, le bel animal […] C'est au sujet qu'en fait c'est la mienne, et que vous allez prendre un pain dans la tête, mais quelque chose de violent ! `,
      },
      {
        author: ['Alexandre Astier'],
        text: `(À Roparzh) Vous avez tué ma poule ?! Non mais est-ce que vous êtes pas un peu marteau, vous ? Parce que moi ça y est, j'ai les nerfs qui commencent à vriller ! Je vous montre : moi je bondis comme ça, et je vous arrive dessus en piqué diagonal. Et là c'est l'hymne à la cruauté, hein, un autel dressé au culte de la barbarie !`,
      },
      {
        author: ['Alexandre Astier'],
        text: `(À Roparzh) Messieurs dames, dans quelques instants le grand spectacle de la souffrance. Si vous pouvez tâcher moyen de vous éloigner de 25 pieds, bons pieds, hein parce que ça va gicler un peu. !`,
      },
      {
        author: ['Alexandre Astier'],
        text: `C'est que la nature est trop hostile pour un gars comme ça, hein.`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Vous êtes arrivés dans un fameux merdier ! Des fourches dans le gras du cul, c'est ça que vous allez ramasser comme cadeau de bienvenue !`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Mon oncle, mon coeur est empli de la noblesse de cette quête !`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Je me sens la fureur de l'ours ! […] Je me sens le courage de l'oiseau ! […] Je suis sautillant comme le mulot ! […] Je frétille comme une p'tite truite ! […] J'ai la vigueur d'un insecte !`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Et à un moment... Le sorcier s'est mis à nous menacer, avec ses parties génitales.`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Mon oncle, n'est-ce pas vous même qui m'avez dit que rien ne remplaçait une véritable amitié et qu'en cas d'urgence c'était la seule corde à laquelle on pouvait vraiment se raccrocher ?.`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Noblesse bien remisée ne trouve jamais l'hiver à sa porte... Non, porte close...`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Nous sommes jeunes, nous marchons à pieds… J'opterai donc pour un surnom en rapport : "les Petits Pédestres".`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Seigneur Bohort, pouvons-nous nous retirer afin d'aller prendre notre goûter ?`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Ah tiens, demain midi y a des côtes de porc.`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Ah tiens, aujourd'hui j'ai fait tailler le rosier de l'arrière-cour parce qu'il en avait drôlement besoin. […] Et vous, vous me racontez pas votre petite journée ?`,
      },
      {
        author: ['Alexandre Astier'],
        text: `J'y connais rien, hein, mais… À votre avis, le fait que vous me touchiez pratiquement jamais, ça a une influence sur la fécondité ?`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Guenièvre: Mais qu'est-ce que je vais devenir, maintenant que mon corps s'est habitué ?Arthur: Et ben vous vous deshabituerez. Comment vous faisiez avant ? Guenièvre: Mais avant ma vie, c'était de la merde vous entendez ? Recevoir le chef de ci, le roi de mi, toujours polie, toujours bien mise, le symbole de la nation bretonne, ha ! Il en faut bien des compensations pour encaisser toute ces conneries hein ! Toujours s'occuper de tout, pis surtout de vous, parce que vous avez des responsabilités ! Et qui s'occupe de moi pendant c'temps ? Alors oui, maintenant qu'y a plus de pâte d'amande, je tourne en rond, je suis sur les nerfs ! J'ai pas d'amis, pas de loisirs… Comme vous me touchez pas, les choses de l'amour je m'assois dessus, et je parle au figuré, alors je m'suis plongée dans la pâte d'amande ! Quand je vous regarde et que j'vois comment vous m'traitez, hein, je m'dis que j'aurais meilleur compte d'aller d'ici jusqu'à Rome à pied pour en chercher parce que c'est finalement la meilleure chose qui me soit arrivée…`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Ils n'ont pas de bras les oiseaux, c'est affreux, j'ai toujours l'impression qu'il vont culbuter vers l'avant, ça n'a aucun sens.`,
      },
      {
        author: ['Alexandre Astier'],
        text: `(À Arthur et Lancelot) De toute façon, Calogrenant, c'est un abruti !`,
      },
      {
        author: ['Alexandre Astier'],
        text: `(À Demetra) Vous savez où vous pouvez vous la mettre, votre potion ?`,
      },
      {
        author: ['Alexandre Astier'],
        text: `(Imitant Ygerne) Si votre père était vivant, il se retournerait dans sa tombe.`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Eh ben moi une fois, j'ai pissé par la fenêtre !`,
      },
      {
        author: ['Alexandre Astier'],
        text: `(À Arthur) Vous me prenez vraiment pour une conne.`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Boum ! La duchesse d'Aquitaine !`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Mais je n'ai rien à dire moi, on a rien à dire quand on est con comme une chaise !`,
      },
      {
        author: ['Alexandre Astier'],
        text: `(À Arthur) Mouais. Méfiez-vous des cons. Y en a qui vont beaucoup plus loin qu'on ne pense !`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Ah d'accord, vous me prenez vraiment pour la reine des pécores.`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Vous savez, euh si on fait fouetter les ouvriers et qu'on menace de les brûler vifs, ils peuvent peut-être finir tout à l'heure, hein... (regard désespéré à Arthur) Non ? Oh bon, bah… je vais… pleurer un petit peu… (sanglots)... Excusez-moi.`,
      },
      {
        author: ['Alexandre Astier'],
        text: `(À Dame Ygerne, qui veut lui raconter son cauchemar) Oh je vous en prie, faites, ça fait tellement longtemps que je ne me suis pas évanouie dans mes urines…`,
      },
      {
        author: ['Alexandre Astier'],
        text: `(À Dame Ygerne, qui lui raconte son cauchemar) Ah, ça y est, il arrive le pipi !`,
      },
      {
        author: ['Alexandre Astier'],
        text: `(À Dame Ygerne, qui lui raconte son cauchemar) Ça vous ennuie, si j'me taille les veines ?`,
      },
      {
        author: ['Alexandre Astier'],
        text: `(À Bohort qui vient de lui déclarer que Lancelot est amoureux d'elle) Mais qu'est-ce que vous déconnez, Seigneur Bohort ? Vous avez picolé ?`,
      },
      {
        author: ['Alexandre Astier'],
        text: `(À Lancelot) On a beau expliquer tout ce qu'on veut expliquer… Au bout d'un moment, pour savoir faire du cheval, il faut faire du cheval !`,
      },
      {
        author: ['Alexandre Astier'],
        text: `(À Lancelot) Eh ben, on est pas sortis du sable !`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Ah non, avec les jolies seulement. C'est de là que j'ai conclu que, comme y m'touchait pas, je faisais moi-même partie des grosses mochetés.`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Je rêve ou je vous ai cloué le bec ?`,
      },
      {
        author: ['Alexandre Astier'],
        text: `[Excalibur] Elle est plantée ? (Arthur : « tout à fait. ») Bon ben mon petit vieux, vous allez prendre vos cliques et vos claques, et vous allez vous trouver une chambre a l'étage des visiteurs. Moi je suis reine de Bretagne, je dors avec le roi, pas avec un petit bonhomme qui n'as même plus son épée. […] Je vous signale que je connais parfaitement les lois bretonnes, et que si pour une raison ou pour une autre, le roi n'est plus roi, c'est la reine qui doit désigner celui qui assumera le pouvoir en son absence. Alors je sais pas encore qui je vais choisir, mais certainement pas vous.`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Je voulais savoir pourquoi vous laissiez tous vos chevaliers former des clans séparatistes, alors que l'une de vos plus importantes missions a toujours été de fédérer les clans existants autour de votre royaume et de la quête du Graal ? Enfin c'était pas tout à fait ça…`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Quand vous étiez roi, vous étiez pas censé faire des cochonneries avec la reine ?`,
      },
      {
        author: ['Alexandre Astier'],
        text: `(À propos des moutons) Mais je n'comprends pas, c'est pas des moutons ça ? […] Bah ils sont tout… tout bizarres… […] Tondus ? Oh mon Dieu mais quelle horreur ! Mais pourquoi vous avez fait ça ?`,
      },
      {
        author: ['Alexandre Astier'],
        text: `(Parlant de la tentative de suicide d'Arthur) Le sang qui vous manque, moi je l'ai vu, hein. […] Le sang qui vous manque, je l'ai vu. Je dors avec ma mère maintenant, en Carmélide, toutes les nuits. Parce qu'à chaque fois que je ferme les yeux, je vois tout le sang qui vous manque par terre, avec vos coupures au poignet, et puis vos yeux vides... Alors, vous m'avez jamais avoué que vous vous étiez marié une première fois, hein, mais ça, vous me l'avez laissé voir. […] Oh si, si, si, si. Y'en a, d'autres, hein, des moyens de se buter. Se jeter du haut d'une falaise, par exemple, ça, ça emmerde personne. Mais vous, c'est pas ça que vous avez fait. Vous vous êtes ouvert les veines dans un bain que j'avais moi-même fait couler.`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Juste à notre aplomb, une corneille est posée sur une branche. Dans quelques secondes, elle va s'envoler... (La corneille s'envole.) Voilà. Nous avons franchi le solstice d'été. Et pendant que d'autres célèbrent le jour le plus interminable de l'année, nous allons secrètement nous réjouir du retour des longues nuits... (Pause) Levez-vous.`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Mais je pensais que vous auriez trouvé une petite clairière… avec un ruisseau. Les tocards prennent toujours leur retraite près d'un ruisseau, à cause de la soif. Pourtant une retraite, c'est une retraite de tout, ne croyez-vous pas ? Moi, quand j'ai plus rien à faire ici, je me retire… Plus une goutte d'eau. Plus un rayon de soleil. Je me dessèche, de la tête aux pieds, en un petit cadavre sous un tas de feuilles… Les saisons me survolent sans me soupçonner… Et puis, un jour, la corneille raconte qu'elle a entendu au loin quelqu'un qui recommence à pleurer. Guenièvre ! Guenièvre ! Alors là, j'ouvre un oeil, je rampe, mangeant la neige, léchant l'eau croupie… et à me voir boire, mes ennemis tressaillent, car ils comprennent que je suis de retour. (Pause) Vous m'faites pas rentrer ? (Ricanement) Magnifique...`,
      },
      {
        author: ['Alexandre Astier'],
        text: `LANCELOT : Je suis sûr que l'on raconte partout que je suis fou...</br>MÉLÉAGANT : Ou mort, ça dépend des villages...</br>LANCELOT : Et à ceux qui me croient fou, qu'est-ce que vous leur dites ?</br>MÉLÉAGANT : Que vous êtes mort...`,
      },
      {
        author: ['Alexandre Astier'],
        text: `LA DAME DU LAC : Vous voulez vraiment pas me dire qui vous êtes ?</br>MÉLÉAGANT : Non, mon nom ne vous dira rien... Mais chez vous on m'appelle... La réponse [...] Mais oui ma p'tite fée !!! La réponse à votre pathétique... désastre !! `,
      },
      {
        author: ['Alexandre Astier'],
        text: `LANCELOT : La dame du lac ??!!</br>MÉLÉAGANT : (Ironique et frappant dans les mains) Héhéhé ! On va passer... Une bonne soirée ! MAGNIFIQUE !`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Cette épée grotesque est le plus pitoyable tour de passe-passe que les dieux aient jamais bricolé pour arriver à leurs fins.`,
      },
      {
        author: ['Alexandre Astier'],
        text: `LANCELOT : Si vous tenez tant à la mort d'Arthur, vous n'avez qu'à vous en occuper vous-même.</br>MÉLÉAGANT : Je n'ai aucun intérêt à la mort des gens.</br>LANCELOT : Mais alors, à quoi ? Bon sang, à quoi ?</br>MÉLÉAGANT : A leur sabordage.`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Mais c'est de ma faute, à moi, si vous semez des pères adoptifs dans tout le pays ?`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Vous pouvez rentrer à Kaamelott. Vous regarderez les gens. Vous regarderez les choses. Rien ne sera plus triste que vous.`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Tout cela n'est rien. Absolument rien ! Il y a peu de temps quelque chose a fait « Boum » ! Voilà... Nous sommes sur une toute petite miette expulsée par ce boum, qui dérive et tournicote sur elle-même, en attendant sa fin... proche ! Sur cette miette, de tous petits organismes gesticulent : ça naît, ça vit, et ça meurt ! Tout cela n'a aucune conséquence.`,
      },
      {
        author: ['Alexandre Astier'],
        text: `(LANCELOT : Si la vie ne vaut rien, alors la vôtre non plus !)</br>Ahh, la mienne !... Je dirais que ma vie ne représente pas la période la plus captivante de... mon existence.`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Sinon, pour rester sur le thème du pied, il y a ça: vous serrez la vis jusqu'à ce que vous entendiez le bruit de l'os. `,
      },
      {
        author: ['Alexandre Astier'],
        text: `(Au sujet des instruments de torture) [Arthur : Mais qui c'est qui invente ces trucs, vous les connaissez les mecs vous ?] [Léodagan : ça ça a toujours plus ou moins existé] De temps en temps on tombe sur un farfelu qui croit qu'il a inventé l'eau chaude mais le plus souvent, c'est l'adaptation d'un modèle existant. `,
      },
      {
        author: ['Alexandre Astier'],
        text: `Si vous aimez ; j'ai ça, c'est pour arracher les noix [Bohort : Les noix... Les fruits ?] Ah, non, les noix... les noix.`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Viens voir biquette ! tortille un peu du fion pour le roi Arthur !`,
      },
      {
        author: ['Alexandre Astier'],
        text: `C'est un pote pirate qui me les ramène des îles d'Irlande, par contre c'est des cagaudes hein faut pas leur demander de compter jusqu'à dix.`,
      },
      {
        author: ['Alexandre Astier'],
        text: `(Parlant des chefs de clans) Si on les invite et qu'y a pas d'femmes, vous allez fédérer mes couilles...`,
      },
      {
        author: ['Nicolas Gabion'],
        text: `(Au sujet d'une cathédrale) Ben, tout ce qui est niveau de prestations, finitions, déco... Ben ouais, si vous voulez que ça ait de la gueule, faut définir un style, une ambiance... Bon, par exemple, on peut faire genre sobre, avec des teintes unies, pierres apparentes... Ou alors, on donne dans le plus chaud, tentures colorées, statues de gonzesses à poil... Ben quoi ?`,
      },
      {
        author: ['Nicolas Gabion'],
        text: `Je vous ai déjà dit que je prête du pognon à des taux vraiment pas dégueulasses ?`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Des bandits ? Nooon... Des gars futés !`,
      },
      {
        author: ['Alexandre Astier'],
        text: `(à propos de Yvain et Gauvain) Si ils sont de sang royal, le bon coup pour se faire un gros paquet de blé, ce serait de les vendre.`,
      },
      {
        author: ['Alexandre Astier'],
        text: `[Arthur: Nan, mais ici elles sont pas punies les femmes qui trompent leur mari.] Ah ouais, ben si vous faites n'importe quoi la justice, on s'en sortira pas, c'est sûr.`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Mais j'fais toujours esclaves ! J'ai un dépôt-vente sur la côte ! Mais c'est complémentaire avec la cathédrale. Si j'ai un coup de bourre sur l'chantier, j'renforce mon équipe avec du chinetoque ou du bouquaque, selon ce que j'ai en stock sur le moment, comme ça je suis jamais pris de court !`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Ah. Ah ben ça, ça vous pendait au nez. C'est un vrai fromage à trous, là, votre baraque : y'a pas une porte qui ferme, les gardes sont toujours en train de roupiller…`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Moi, officiellement, j'suis censé vendre du miel ! Comme ça, en cas de contrôle, tac ! Trois étalages de miel en-dessous de la boutique, et les esclaves, j'les accuse de vol à la tire. Ni vu, ni connu !`,
      },
      {
        author: ['Alexandre Astier'],
        text: `(À propos d'une ancienne vente d'esclave) Attendez, ça on en a déjà parlé ! Celui de l'autre fois, il m'avait pas dit qu'il était unijambiste !`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Pourquoi vous faites ça ? A quoi est-ce que ça vous sert de libérer des galériens ? En plus c'est que de la racaille tout ça !`,
      },
      {
        author: ['Alexandre Astier'],
        text: `(à propos du travail des esclave) J'ai fait double journée au début, mais il y en a six qui sont morts. Ça va ! Je vais pas vous dévaliser non plus.`,
      },
      {
        author: ['Alexandre Astier'],
        text: `ça le pognon ça reste à la pogne, c'est la règle.`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Non, mais c'est entre amis, il parait que c'est toléré entre amis.`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Truqué ! Ben tout de suite les grands mots ! Non, mon chien, il est entraîné, eux ils ont pas de chien, alors je leur en prête un que j'ai là, alors évidemment, il est à moitié crevé le machin il fait pas des miracles.`,
      },
      {
        author: ['Alexandre Astier'],
        text: `( à Arthur à propos de la vente d'esclave)Attendez, je vous pète les prix, vous continuez à râler.`,
      },
      {
        author: ['Alexandre Astier'],
        text: `(au sujet de l'anonymat de son espion) Alexandre le Grand tout le monde sait qui c'est, bon c'est pas pour ça que je saurais le reconnaître si je le croisais à la taverne !`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Tenez lui aussi il le dit qu'il est votre espion ! [Arthur: Quoi ?] Non mais enfin il va pas le crier sur les marchés mais quand il peut placer discret qu'il espionne pour le roi Arthur... C'est important aujourd'hui les curriculums.`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Non mais sans vous grouiller, heu, vous serez gentil de pas lambiner ! Parce que moi de l'autre côté, j'ai tous mes supporters qui ont payé double. Et puis, comme c'est quand même des très très gros cons, je voudrais pas qu'ils me volent dans les plumes, sous prétexte que je livre pas ce que j'ai dit.`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Les petits pères, les affaires reprennent. Parce que la couronne, là, j'aime autant vous dire qu'elle date pas d'hier. Là, y a de la relique ou je m'appelle pas Venec. […] Qu'est-ce vous en dites ? Bon, hein, imaginez que j'ai mon froc, ça me donne du style ou pas ?`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Je suis pas son associé, je suis pas son associé, si je lui donnais trente pour cent il serait peut-être moins catégorique, si ?`,
      },
      {
        author: ['Alexandre Astier'],
        text: `(Parlant à ses compères du roi Arthur) Donc là, pour le voyageur isolé y'a deux solutions : soit il dépose ses armes, ses objets, sa bouffe et ses fringues par terre, et il s'en va d'où il est venu à poil dans la neige, soit il décide de se battre... À un contre dix.`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Ben p't'être... n'empêche que moi, j'préfère quand même quand c'est vous l'roi !`,
      },
      {
        author: ['Alexandre Astier'],
        text: `C'que j'vous explique depuis trois quart d'heure. J'en ai rien a foutre de devenir chevalier. Ce qui m'intéresse, si y a un nouveau roi qui chapeaute tout l'système, c'est d'être en affaires avec.(Maître d'armes : Nan mais vous avez quand même écouté notre topo sur la fédération ?)J'vous ai pas coupés en plein milieu parce que bon... Mais effectivement ça m'concerne pas votre bordel. Qu'vous vous réunissiez pour faire des fédérations, même jouer aux cartes... c'qui compte c'est qu'ce soit moi qui vous fournisse en putes.`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Au moins vous serez en sécurité ! [Arthur: Non mais attendez je vais probablement crever pendant le voyage alors...] Vous crèverez en essayant de faire quelque chose, allez, accrochez-vous.`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Invoquer une meute de loups ? Moi je veux bien, mais je vous préviens : s'ils se retournent contre nous pour nous bouffer les miches, vous viendrez pas pleurer !`,
      },
      {
        author: ['Alexandre Astier'],
        text: `(au Répurgateur) Mais moi je viens pas vous emmerder quand vous cramez des sorcières, alors foutez-moi la paix.`,
      },
      {
        author: ['Alexandre Astier'],
        text: `- Qu'est-ce qui est petit et marron ? [Élias de Kelliwic'h : Un marron.] - Putain, il est fort ce con.`,
      },
      {
        author: ['Alexandre Astier'],
        text: `[À la fée Morgane] : J'adore la châtaigne. Je m'en ferais péter le bide. Vous en voulez ?`,
      },
      {
        author: ['Alexandre Astier'],
        text: `[A Karadoc et Perceval] : La boutique est fermée, adressez-vous à la concurrence. (Cette réplique sera reprise dans le Livre V, lorsque Merlin quitte Kaamelott)`,
      },
      {
        author: ['Alexandre Astier'],
        text: `(À propos du rassemblement du corbeau) J'aime pas y aller à ce truc. Ça me gonfle. Y'a tous les clodos du pays qui portent une barbiche et qui se prennent pour des druides !`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Mais évidemment, c'est sans alcool !`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Alors le chevalier il crie au Romain : Hé ! Vous vous prenez pour le Colisée ?`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Hé toi là-bas avec ton casque à cornes, présente-moi ta femme, tu sauras pourquoi t'as des cornes !`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Franchement, une potion pour faire pisser bleu, ça presse forcément la minute ?`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Ah ben j'suis mi-démon, moi, les démons c'est pas foutu pareil. D'ailleurs, dans le calendrier démonique je vais bientôt avoir sept ans. J'aurai le droit d'avoir une mogriave. […] Une mogriave ? C'est comme un petit chien, mais hyper vilain.`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Arthur, je suis désolé je peux plus rien faire. Et vous lui rappellerez que s'il est roi, c'est aussi grâce a bibi, et que Excalibur, c'est moi qui l'ai emmené la chercher la première fois quand il avait même pas quatre ans... Oui môssieur Blaise ! Je lui ai torché le cul à Arthur, je lui ai trouvé un père adoptif ! Tout ça pour qu'il me remplace par l'autre guignol d'Elias de Kelliwic'h !`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Ça fait des années que je me démène à apprendre des machins d'enchanteur ! Des grimoires plein les étages. J'en ai marre ! Je suis druide ! DRUI-DE ! Les trucs de flambeur pour amuser la galerie ça ne m'in-te-re-sse pas ! Alors salut tout le monde, je déserte. [Mevanwi : Merlin faites pas l'imbécile...Père Blaise : Et euh où est-ce que vous allez aller ?] Mais dehors ! A ma place ! Parce que oui, quand on a deux ronds de bon sens on demande pas à un druide de travailler dans un endroit clos, bande de crétins ! La quasi-totalité de mes pouvoirs est annulée quand j'ai un toit au dessus de la tête... Alors Merlin, il retourne à la belle étoile et si on vous demande ce qu'il a dit en partant, vous répondrez "merde" !`,
      },
      {
        author: ['Alexandre Astier'],
        text: `J'ai tout entendu et c'est honteux !!`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Vous n'êtes pas le plus fort, Môssieur Élias ! Quand on confond un clafoutis et UNE PART de clafoutis, on vient pas la ramener !`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Attendez, je veux être là quand vous lui mettez une chasse !`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Un arbre ça pousse, c'est là où vous pourrez faire la différence : le camouflage, il pousse pas !`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Quand je dis que Rome est à la Cité ce que la chèvre est au fromage de chèvre, je veux dire que c'est le petit plus qui est corollaire au noyau mais qui est pas directement dans le coeur du fruit !`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Quand vous êtes parti, je me suis dit : Je vais me promener ? Je vais me pas promener ? Finalement j'ai décidé de me beurrer la gueule.`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Moi, je dis que c'est magique à cause des merdes qui pendouillent, mais ça se trouve, c'est pas ça...`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Remarquez que moi, j'ai un pote poissonnier qui sait boire du lait à la paille par les trous de nez !`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Moi j'ai vomi deux fois, mais c'est moi qu'ai ramassé !`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Ah mais foutez-moi la paix ! J'ai traversé l'île en long, en large et en travers ! Pareil en Aquitaine et en Armorique ! Vous croyez que j'me souviens de tous les trous du cul à qui j'ai balancé mon laïus ?`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Arthur: Tout ce qui était sous le joug de mon de mon père quoi. Merlin : Sous le ? Arthur : Sous le joug. Merlin : Le ? Arthur : Le Joug. Merlin : Comme le joug de fruit ?`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Pas besoin d'hommage puisque je vous dis que je vais vous le rafistoler. [Arthur: Ça fait vingt fois que vous essayez de me rafistoler comme vous dites, ça marche jamais.] Ça marche jamais parce que vous avez pas envie, c'est tout ! [...] Vous avez pas envie de refabriquer ce sang qui vous manque... Combien de temps ça fait que vous vous êtes taillé les veines ? Six mois, un an ?! Vous êtes toujours blanc comme une fesse ! [Bohort: Merlin, ne vous emballez pas...] J'm'emballe pas, ça m'énerve ! Il suffirait que vous vous donniez un bon coup de pied au fion et vous reprendriez du poil de la bête, mais non ! Et voilà ! Il s'endort, maintenant !`,
      },
      {
        author: ['Alexandre Astier'],
        text: `N'ayez crainte, Sire, je protégerai la reine de la férocité des bêtes de la nuit !`,
      },
      {
        author: ['Alexandre Astier'],
        text: `(À Guéthenoc) Si votre but c'était de séduire les dames fallait faire chevalier, c'est tout !`,
      },
      {
        author: ['Alexandre Astier'],
        text: `(À Guenièvre qui n'est pas ravie de devoir porter une ceinture de chasteté) Nan mais si vous voulez, je passerai vous voir discrètement le soir et je vous la débouclerai... Comme ça vous passerez une bonne nuit...`,
      },
      {
        author: ['Alexandre Astier'],
        text: `(À Gallessin qui se moque du soin qu'il apporte à son physique) Apollon il va se lever et vous le mettre dans le pif son casque !!`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Bah ça va, je picole pas souvent !`,
      },
      {
        author: ['Alexandre Astier'],
        text: `(À Arthur) Non mais je sais pas comment c'est arrivé sur le tapis… On parlait d'esclavage, je crois. Les autres disaient que vous l'aboliriez sans doute dans l'avenir ; moi j'ai dit que c'est parce que vous aviez pas le courage de l'faire maintenant ; il y en a un qui m'a dit qu'il fallait pas que je me prenne pour le roi et voilà ! (un peu gêné) Alors j'ai dit… "Le roi je l'emmerde"… Mais c'était dit sans méchanceté.`,
      },
      {
        author: ['Alexandre Astier'],
        text: `(À Arthur) Alors faites des efforts pour arrêter de vous comporter comme un connard ! Moi j'en ai plein le cul de seconder un merdeux de dix ans même pas foutu de trouver un Graal ou de faire un gamin à sa femme ! Oui alors voilà, je me suis assis sur votre trône parce que je fais la moitié de votre boulot… Et je vous emmerde !`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Les villageois, je les emmerde !`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Un village assailli de brigands, une femme qui se fait tabasser, une poule qui boîte, c'est pas les opprimés qui manquent ! Et là au moins, j'aurai l'impression de servir à quelque chose.`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Ils ont rien ramené parce que c'est des débiles. Arrêtez d'envoyer Perceval et Karadoc en mission, c'est ridicule !`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Vous savez que j'occupe à mi-temps ma place à la Table Ronde, et que l'autre moitié de mon temps je reprends ma place de chevalier errant... Eh bien tout ça, c'est fini. [ARTHUR : C'est-à-dire, vous revenez définitivement ?] Non, je 'pars' définitivement.`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Qu'est-ce que vous voulez que je développe ? Vous n'êtes pas de taille à mener la quête du Graal, vous n'avez pas les épaules. De plus comme vous êtes incapable de vous séparer de la bande de pantins ridicules qui vous sert de gouvernement, vous passez pour un faible et un laxiste aux yeux du peuple et des pays voisins, et puis je parle pas des dieux évidemment, ceux-là, s'ils pouvaient parler... […] Et même tout nu et sur un pied, j'irai toujours cent fois plus loin que vous et votre risible compagnie de crétins !`,
      },
      {
        author: ['Alexandre Astier'],
        text: `(Bohort : L'équilibre du royaume est en péril !). Ça fait longtemps qu'il est en péril l'équilibre ! Ça fait des lustres que je m'échine à le faire tenir debout ! J'abandonne ! Et tirez-vous de chez moi avant que je me fâche pour de bon.`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Vous allez me lâcher les noyaux, oui ? Y'a pas assez à faire dans ce camp sans venir me les péter toutes les deux minutes ?! Faut forcément que je vous colle un ordre à chaque fois qu'il s'agit de ratisser un tas de feuilles ?! Mettez moi de l'ordre dans ce campement nom d'un chien ! Vous êtes pas à Kaamelott ici ! Je veux pas voir traîner un quignon d'pain c'est compris ?! Revue de détail dans un quart d'heure, allez zou !`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Pour tout vous dire, je crois pas que ce soit bon pour mon autorité que mes soldats apprennent que je suis "une grosse pucelle" !`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Non, je suis désolé, c'est pas possible ; on se lève pas à midi dans un camp militaire ! Demain matin, celui qui est pas debout à l'aube, je le pends à un arbre, c'est clair ?`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Je préfère vous tuer de mes mains plutôt que de vous perdre.`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Est-ce que je suis votre maîtresse préférée ?`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Vous vous rendez compte que vous amenez des boucs dans ma chambre ?`,
      },
      {
        author: ['Alexandre Astier'],
        text: `On vous offre des boucs, à vous, maintenant ?`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Parce que j'ai le même type que les Jumelles maintenant ? `,
      },
      {
        author: ['Alexandre Astier'],
        text: `Votre père, il a les cheveux noirs. Alors on continue de traiter tout le monde de bâtard ou on se calme ? `,
      },
      {
        author: ['Alexandre Astier'],
        text: `C'est vexant de me ressembler ? C'est pour ça qu'on vous a choisi et qu'on vous a sorti de votre cambrousse, alors du respect ! `,
      },
      {
        author: ['Alexandre Astier'],
        text: `Et surtout : pensez POUVOIR ! `,
      },
      {
        author: ['Alexandre Astier'],
        text: `Par exemple, je trouve que quand elle est partie du jour au lendemain sans prévenir, elle s'est conduite comme la reine des putes. `,
      },
      {
        author: ['Alexandre Astier'],
        text: `Jo le rigolo ???!!!`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Faut que j'enlève mon armure sinon y va se passer quelque chose d'atroce.[Part... Revient] J'ai pas eu le temps d'enlever mon armure...`,
      },
      {
        author: ['Alexandre Astier'],
        text: `D'après mes derniers renseignements, il serait tout à fait possible que le Graal ne soit ni un vase, ni une coupe, mais... un récipient.`,
      },
      {
        author: ['Alexandre Astier'],
        text: `(À Arthur, Léodagan et Venec) Ça vous ennuie si je vomis ?`,
      },
      {
        author: ['Alexandre Astier'],
        text: `J'irai me coucher quand vous m'aurez juré qu'il n'y a pas dans cette forêt d'animal plus dangereux que le lapin adulte !`,
      },
      {
        author: ['Alexandre Astier'],
        text: `(À Arthur, Perceval et Léodagan) Moi aussi, je ne me sens pas dans mon assiette, j'ai jamais beaucoup aimé les tunnels.`,
      },
      {
        author: ['Alexandre Astier'],
        text: `(Au maître d'armes) Vous êtes un grand malade mental !`,
      },
      {
        author: ['Alexandre Astier'],
        text: `(Hurlant à plein poumons) MÉÉCRÉÉAAAAAAAAANTS !`,
      },
      {
        author: ['Alexandre Astier'],
        text: `La neige... On l'enlève, elle revient. Toujours... encore et encore... Et nous, pauvres âmes chagrines, nous perdons nos regards dans l'horizon blanc de notre solitude.`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Fort heureusement, je tiens à préciser que l'incident n'a fait aucune victime.`,
      },
      {
        author: ['Alexandre Astier'],
        text: `(Criant) NOUS ALLONS TOUS MOURIR !`,
      },
      {
        author: ['Alexandre Astier'],
        text: `(À Arthur et Lancelot) Ah bah ça va, excusez moi d'avoir paniqué... Finalement c'est pas des démons. C'est juste les pires bestioles de tout l'univers. Mettons deux gardes là devant et allons boire un coup !`,
      },
      {
        author: ['Alexandre Astier'],
        text: `C'est une catastrophe !`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Arbre, mon ami, majestueux témoin de ma gloire abattue, entends avec moi le céleste appel !`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Balancez-leur les radasses et qu'ils s'en aillent au diable !`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Je suis un misérable !`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Et les petits pigeons ? Vous croyez peut-être qu'ils se nourrissent tout seuls, les petits pigeons ? [Arthur : Bohort, vous commencez sérieusement à m'emmerder !]`,
      },
      {
        author: ['Alexandre Astier'],
        text: `En même temps, admettez que me tuer n'aurait pas beaucoup de sens ! Vos nerfs seraient soulagés dans un premier temps, je ne dis pas, mais si vous considérez la situation avec un minimum de recul, vous vous apercevrez que le transport de votre hargne sur ma personne n'est pas départi d'une certaine forme d'absurdité. Et c'est là que j'ai envie de dire : est-ce que ça vaut bien le coup ?`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Eh bien puisque c'est ça, allez-y : détruisez tout ! Entretuez-vous ! Mettez la Bretagne à feu et à sang ! Et ne comptez plus sur moi pour vous amener mes gâteaux à la purée de pomme dont vous êtes si friand ! Dorénavant, vous devrez vous les cuisiner vous-même ! ENTRE DEUX MISES À SAC !`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Qui veut une tartelette ?`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Moi, je suis en charge des négociations protocolaires de la surveillance intérieure de l'inspection de certains postes avancés, eh bien, voyez-vous, si on me disait : Bohort, tout ça c'est fini, à partir de maintenant, vous vous occuperez des pâtisseries et du linge de maison, je vous assure, je n'hésiterai pas une seconde .`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Vous prenez votre arc et vous le bouffez ! Espèce de dégénéré sanguinaire !`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Séchez vos larmes mon épousée, je m'occupe d'aller chercher ces petites salopes par la peau du fion !`,
      },
      {
        author: ['Alexandre Astier'],
        text: `(En coin, à sa mère) Pardon, mère.`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Sire, sachez déjà que je ne suis pas homme à me méprendre sur le gaillard d'en face et mon petit doigt me dit que vous en êtes pas la moitié d'un !`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Au même titre que le bar est fermé, sauf si c'est un poisson, tout travail mérite salaire !`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Prêtez l'oreille sans ristourne !`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Tête bien pensante est par deux fois force de décision !`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Homme sans métier n'est plus apte à exercer une activité professionnelle !`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Renommée, renommée, qui es-tu renommée ?!`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Bonne proposition fait force de respect.`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Quand on connaît trop, on hésite et c'est un prompt renfort !`,
      },
      {
        author: ['Alexandre Astier'],
        text: `J'espère que tu fabules, bourgeois de bon aloi ! As-tu la fabulette bien preste ?`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Vous préférez "Bohort le jeune" ou "Bohort l'ami du raisin" ? Parce que j'avais réfléchi à la seconde possibilité, ça fait plus fruité !`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Méfie toi, riche homme : on ne berne pas deux fois Urgan l'homme goujon, même une fois !`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Patience est mère de famille !`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Tu ne t'en tireras à si bon compte que s'ils font les bons amis !`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Pour savoir s'y a du vent, il faut mettre son doigt dans le cul du coq.`,
      },
      {
        author: ['Alexandre Astier'],
        text: `On met du beurre dans le fond du plat pour pas que le gratin colle.`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Y'a des méchants ?`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Je présente vos hommages au roi Arthur.`,
      },
      {
        author: ['Alexandre Astier'],
        text: `J'ai le droit d'être 4 jours pas chez moi, et après chez moi. Mais y a du voyage qui se prépare, et pour soigner les bêtes, y a pas que ma tante, y a moi aussi.`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Pourquoi je peux pas avoir un chien moi ? […] Mais c'est juste pour mettre des coups de pied dedans ! […] Moi j'en ai marre de toujours donner des coups de pied aux poules !`,
      },
      {
        author: ['Alexandre Astier'],
        text: `À Kadoc ! À Kadoc !`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Tatan, elle fait des flans.`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Les pattes de canaaaaaaaaaaaaaaaaaaaaaaaaaaaaard !`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Elle est où la poulette ?`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Mooordu! Mooordu! Mordu mordu mordu mordu la ligne !!!!`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Karadoc il s'occupe, mais c'est pas ma Tatan !`,
      },
      {
        author: ['Alexandre Astier'],
        text: `(à propos du père Blaise) Il ressemble à Tatan !`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Le caca des pigeons c'est caca, faut pas manger.`,
      },
      {
        author: ['Alexandre Astier'],
        text: `(Sur l'air de Promenons-nous dans les bois) Pas du tout, les lapins, les lapins, c'est gentil ! Le poissooon ! Le petit poissooon !`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Des fois on n'a pas le choix faut sacrifier des jeunes, c'est le grand qu'a dit.`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Dans trois jours, ma tata elle m'emmène à la mer pour me noyer.`,
      },
      {
        author: ['Alexandre Astier'],
        text: `(Sur l'air de Promenons-nous dans les bois) Y' vont faire des beignets !`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Quand y'a plus de roi, c'est caca.`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Ça suffit ! Elle est où la poulette ? Elle est bien cachée ?`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Vous rendez la poulette sinon c'est plus vous qui donnez à manger aux lapins !`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Ça suffit !!! Ça suffit !!! Ça suffiiiiiiiit !!!`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Vous rendez la poulette ou c'est tout nus dans les orties !`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Le caca des canards c'est caca.`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Il est où Kadoc ? Il est bien caché ?`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Camouflage caca...`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Il faut pas respirer la compote, ça fait tousser.`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Caca.`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Ça suffit, vous rendez la poulette, sinon papi va se mettre en colère.`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Si Kadoc il surveille bien, il aura des p'tits cubes de fromage.`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Y sont où les quignons à Kadoc ? Y sont dans la poche? Y sont bien cachés ?`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Kadoc il peut mettre trente-sept mirabelles dans ses fesses !`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Ah bah on parle pas la même chose ! Moi j'connais mon métier ! C'est pas compliqué, faites une visite chez lui vous verrez ! Y a un signe qui trompe pas : toutes ses bêtes sentent la pisse ! Et puis fort ! Déjà vous passez devant son portail, ça vous prend le museau là ! Nan, c'est pas du boulot.`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Je vais le tuer, Sire ! Je vais tellement si tant y taper sa gueule qu'il va décéder !`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Qu'est-ce qu'il a, l'bourgeois ? Il a les yeux qui piquent ?`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Qu'est-ce que vous voulez-vous insinuyer Sire ?`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Oui bien sûr, C'est au sujet de quoi t'est-ce ?`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Non mais faut rentrer chez vous là m'sieur ! Faut laisser travailler les honnêtes paysans ! Sans ça vous allez ramasser des fourches dans le cul !`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Oh ben merde ! La tuile ! Ch'uis ben confus ! Eh ben votre poule elle est entièrement décédée ! J'ai retiré la tête du reste pas plus tard que ce matin ! J'espère que ça va pas vous faire défaut !`,
      },
      {
        author: ['Alexandre Astier'],
        text: `(À Guethenoc) Mais tout à fait ! Eh ben je dirais également que le genou peut partir dans les noix de manière assez soudaine et que ça pourrait éventuellement vous faire sortir les baloches par les oreilles. N'y voyez aucune malice !`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Mais tout à fait ! En parlant de... d'antidote hein, je souhaiterais vous suggérer un endroit où vous pourriez éventuellement vous le carrer... en vous remerciant !`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Non mais vous croyez pas qu'j'marche au sifflet ! Mais qu'est-ce que j'en ai à foutre de vos horaires ? J'arrive quand j'arrive et puis c'est tout.`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Bon ben je vous préviens, je vous écoute 30 secondes pas une de plus. Si il y a un mot plus haut que l'autre, je vous mets toute la tartine dans la gueule et je rentre chez moi, j'ai pas que ça à glander.`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Ah bah non ! On va leur foutre deux, trois pierres dans la gueule et on va allumer des incendies... Mais faut pas déconner, ils y sont pour rien.`,
      },
      {
        author: ['Alexandre Astier'],
        text: `(Léodagan: Bon bah il y a personne qui rentre là.) C'est bizarre, d'habitude il y a un gros con a moustache qui se présente et qui dit que la cabane est a lui.`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Commencez pas à noyer la peau de l'ours avant d'avoir vendu le poisson.`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Et qu'est-ce qui font-ils, au gouvernement ? Y's'roucent les poules ! Y's'poulent les rouces ! [Guethenoc : Y's'roulent les pouces !] Voilà, mieux !`,
      },
      {
        author: ['Alexandre Astier'],
        text: `(À Guethenoc) Je vous donnerai la main, j'en ai une aussi de masse moi aussi, comme ça j'en profiterai pour vous en mettre un coup dans la gueule, c'est pas bien méchant ! (Il commence à se battre avec Guethenoc)`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Môssieur Sire, en chair et en personne ! […] (À Guethenoc) J'étais v'nu pour vous emmerder, mais là ça m'coupe le sifflet !`,
      },
      {
        author: ['Alexandre Astier'],
        text: `(Complètement ivre) Quand j'étais jeune, je pouvais faire rentrer un pigeon directement dans la bouteille sans la casser... C'est pas compliqué, vous prenez un pigeon, vous y faites sécher jusqu'à qu'ce soit presque friable. Après vous y mettez sur les... sur la branche de prunier, autour de la fleur... Comme ça la poire elle pousse directement à l'intérieur du pigeon séché, et avec le liquide... ça gon... ça gonfle heu... et ça fait r'prende une... heu... ça fait r'prende une forme de pigeon. (Il s'écroule.)`,
      },
      {
        author: ['Alexandre Astier'],
        text: `(Complètement ivres) (Belt : -Je lève le verre à notre souverain) Notre souverain, -rain -rain !`,
      },
      {
        author: ['Alexandre Astier'],
        text: `(Complètement ivre) I faut faire tenir un balai en équilibre sur le pif pour s'faire servir ici, ou quoi qu'ce soiye ? `,
      },
      {
        author: ['Alexandre Astier'],
        text: `Vous pouvez pas vous les compter vous-même vos points ? Faut forcément qu'on vous tienne le zizi ? `,
      },
      {
        author: ['Alexandre Astier'],
        text: `Ce soir, j'rentre à ma ferme, j'empoisone toutes mes bêtes même les petites, je fous le feu à mes récoltes, et je tue ma femme ! `,
      },
      {
        author: ['Alexandre Astier'],
        text: `Ca fait deux cent ans qu'il y a que les paysans qui payent les taxes, alors je vois pas pourquoi aujourd'hui ça change, comme ça d'un seul coup et ça me tombe dessus comme une merde sur une planche !`,
      },
      {
        author: ['Alexandre Astier'],
        text: `2500 pièces d'or ???! Eh... eh... C'est une blague? 2500 pièces d'or, mais où voulez vous que je trouve 2500 pièces d'or, dans le cul d'une vache ?!`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Excusez moi Sire, c'est sur le coup du...[dit à plusieurs reprises]`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Et le seigneur Lothar, il paye pas, lui, je sais il me l'a dit ...[Léodagan : non il paye pas, parce qu'il participe au combat]... Mais vous vous foutez de moi?! Il a au moins 95 ans, il a une jambe raide, il est tellement bigleux qu'il trouverait même pas sa bite pour pisser !`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Attendez, ça fait combien de dizaines d'années que je leur laisse cultiver mes terres, à ces connards ? En plus de ça ils sont même pas polis, ils sont cons... Comme des tables ! Ils font un pain dégueulasse - on s'pète les dents dessus - non, là, j'ai besoin d'un peu de pognon, alors j'aime autant vous dire qu'ils vont passer à la caisse, les pécores !`,
      },
      {
        author: ['Alexandre Astier', 'Simon Astier'],
        text: `Si on faisait le coup du bouclier humain ? [...] Par exemple, Sire, Léodagan et moi, on fait semblant de vous prendre en otage : on vous met une dague sous le cou et on traverse le camp adverse en gueulant : "Bougez pas, bougez pas ou on bute le roi!"...`,
      },
      {
        author: ['Alexandre Astier', 'Simon Astier'],
        text: `Putain, en plein dans sa mouille !`,
      },
      {
        author: ['Alexandre Astier', 'Simon Astier'],
        text: `Faut faire comme avec les scorpions qui se suicident quand ils sont entourés par le feu, faut faire un feu en forme de cercle, autour d'eux, comme ça ils se suicident, pendant que nous on fait le tour et on lance de la caillasse de l'autre côté pour brouiller... Non ?`,
      },
      {
        author: ['Alexandre Astier'],
        text: `C'est pas faux.`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Toi, un jour, je te crame ta famille, toi.`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Faut arrêter ces conneries de nord et de sud ! Une fois pour toutes, le nord, suivant comment on est tourné, ça change tout !`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Donc, pour résumer, je suis souvent victime des colibris, sous-entendu des types qu'oublient toujours tout. Euh, non… Bref, tout ça pour dire, que je voudrais bien qu'on me considère en tant que Tel.`,
      },
      {
        author: ['Alexandre Astier'],
        text: `(Entrant subitement dans la Salle de la Table Ronde) Excusez, c'est juste pour vous dire que je vais pas pouvoir rester aujourd'hui ! Faut que je retourne à la ferme de mes vieux ! Y a ma grand-mère qui a glissé sur une bouse ! C'est le vrai merdier !`,
      },
      {
        author: ['Alexandre Astier'],
        text: `On a même un tabouret ! Quand on s'assoit d'ssus, on se retrouve sur un autre tabouret dans une taverne dans le Languedoc [...] Ouais, le siège de transport qu'ils appellent. En plus, comme par hasard c'est moi qui ai essayé le premier. Deux semaines et demi plus le bateau qu'ça m'a pris pour revenir. J'avais pas compris qu'en me rasseyant d'ssus, ça me ramenait de l'aut'côté. Et à l'arrivée j'me suis fait mettre une chasse, parce que j'avais ramené l'autre tabouret, et que soit-disant il aurait fallu qu'il reste là-bas. Pourtant ils marchent les deux tabourets ! Eh ben ils sont l'un à côté de l'autre. Alors ça fait pas pareil.`,
      },
      {
        author: ['Alexandre Astier'],
        text: `C'est pour ça : j'lis jamais rien. C'est un vrai piège à cons c't'histoire-là. En plus j'sais pas lire.`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Ben si, si c'est l'même volume sonore, on dit "équidistant" [...] S'ils sont équidistants en même temps que nous, on peut repérer le dragon par rapport à une certaine distance. Si le dragon s'éloigne, on s'ra équidistant, mais ça s'ra vachement moins précis et... et pas réciproque.`,
      },
      {
        author: ['Alexandre Astier'],
        text: `(Assommant Karadoc)Ah ! oui... j' l'ai fait trop fulgurant, là. Ça va ?`,
      },
      {
        author: ['Alexandre Astier'],
        text: `(À Arthur) Sire, avec tout le respect, est-ce que la reine a les fesses blanches ?`,
      },
      {
        author: ['Alexandre Astier'],
        text: `(À Arthur et Lancelot) Ça sert à rien, un siège, si elle est enceinte, il faut des linges blancs et une bassine d'eau chaude.`,
      },
      {
        author: ['Alexandre Astier'],
        text: `(À Arthur et Lancelot) Une fois, à une exécution, je m'approche d'une fille. Pour rigoler, je lui fais : " "... C'était sa soeur. Bonjour l'approche !`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Si Joseph d'Arimathie a pas été trop con, vous pouvez être sûr que le Graal, c'est un bocal à anchois.`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Sire, Sire ! On en a gros !`,
      },
      {
        author: ['Alexandre Astier'],
        text: `(À Arthur) Moi j'crois plutôt que la prochaine fois, vous nous enverrez bouler tout pareil, c'est pas vrai ? (...) Ha... On en a gros...`,
      },
      {
        author: ['Alexandre Astier'],
        text: `(À Arthur) Moi, j'serais vous, je vous écouterais... Non, moi, j'serais nous, je vous... Si moi, j'étais vous, je vous écouterais ! Non, elle me fait chier, cette phrase !`,
      },
      {
        author: ['Alexandre Astier'],
        text: `C'est marrant les petits bouts de fromage par terre. C'est ça que vous appelez une fondue ?`,
      },
      {
        author: ['Alexandre Astier'],
        text: `J'voudrais pas faire ma raclette, mais la soirée s'annonce pas super.`,
      },
      {
        author: ['Alexandre Astier'],
        text: `(En parlant des clients de la taverne) Quand même, ils sont onze. J'ai calculé sur les treize dernières années, dans les deux heures qui précèdent le coucher du soleil, vous en êtes à une moyenne de 8,422.`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Après demain, à partir d'aujourd'hui ?`,
      },
      {
        author: ['Alexandre Astier'],
        text: `De toutes façons, les réunions de la Table Ronde c'est deux fois par mois. Donc, si le mec il dit après-demain à partir de dans deux jours, suivant s'il le dit à la fin du mois, ça reporte.`,
      },
      {
        author: ['Alexandre Astier'],
        text: `C'qui compte, c'est les valeurs !`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Là, vous faites sirop de vingt-et-un et vous dites : beau sirop, mi-sirop, siroté, gagne-sirop, sirop-grelot, passe-montagne, sirop au bon goût.`,
      },
      {
        author: ['Alexandre Astier'],
        text: `LEODAGAN CONTRE-ATTAQUE !!! (il passe la balle à Léodagan)`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Et toc ! Remonte ton slibard, Lothard !`,
      },
      {
        author: ['Alexandre Astier'],
        text: `13, 14, 15... Enfin tous les chiffres impairs jusqu'à 22.`,
      },
      {
        author: ['Alexandre Astier'],
        text: `J'le dis pas (en parlant de la date de son anniversaire). [...] A l'époque quand je le disais, tout le monde oubliait de me le souhaiter. Ça me faisait pleurer. Ça m'a gonflé, j'ai arrêté.`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Dans la vie, j'avais deux ennemis : le vocabulaire et les épinards. Maintenant j'ai la botte secrète et je bouffe plus d'épinards. Merci, de rien, au revoir messieurs-dames.`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Salut, Sire. Je trouve qu'il fait beau, mais encore frais, mais beau !`,
      },
      {
        author: ['Alexandre Astier'],
        text: `(Montrant ses cousins à Arthur) Alors là, c'est Ashton, lui c'est Rutz, lui c'est Pierce, l'autre derrière c'est Pierce aussi, j'ai jamais compris pourquoi, et lui euh, j'crois qu'il a pas d'prénom, tout le monde l'appelle Connard...`,
      },
      {
        author: ['Alexandre Astier'],
        text: `(À Arthur) C'est l'anniversaire dans tous les recoins, c'est presque tous les ans qu'on a l'anniversaire. Grâce à cet anni... c'est la joie c'est pratique, c'est au moins un principe à retenir pour faire la frite... c'est huuuum lalalalala. Cette année c'est bien, l'anniversaire tombe à pic !`,
      },
      {
        author: ['Alexandre Astier'],
        text: `(Ivre) PAYS DE GALLES INDÉPENDANT ! J'ai un pivert dans la tête... C'est normal ?`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Ben j'en ai marre. Ça revient à chaque fois sur le tapis ça. [Arthur: Quoi ça ?] Fédéré! D'habitude j'dis rien mais là zut! J'sais pas c'que ça veut dire. Moi j'veux bien faire des efforts pour comprendre les réunions mais faut que chacun y mette du sien aussi. Là on est partis pour une heure avec des fédérés par-ci des fédérés par-là, j'vais encore rien biter et ça me gonfle.`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Sans blague on pourrait pas fêter la mort des mecs que je connais pour une fois ? Comment ça ? C'est toujours la mort de vos potes à vous que l'on fête, moi dans quatre jours c'est l'anniversaire de la mort d'un oncle à moi, sans faire exprès il s'est tiré dessus avec un arc.`,
      },
      {
        author: ['Alexandre Astier'],
        text: `(Aux jeunes chevaliers) Le Graal, c'est une vraie saloperie, méfiez-vous. Un jour c'est un vase, une semaine après une pierre incandescente. [...] Incandescente, c'est : qui peut accaparer des objets sans resurgir sur autrui.`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Non, vous, vous vous maravez. Quand on a pas de technique, il faut y aller à la zob.`,
      },
      {
        author: ['Alexandre Astier'],
        text: `SI VOUS VOULEZ QU'ON SORTE LES PIEDS DEVANT, FAUDRA NOUS PASSER SUR L'COOOORPS !`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Le code c'est "le code" ? Ça va, ils se sont pas trop cassé le bonnet, pour l'trouver celui-là !`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Y'a du grabuge alors on appelle les 2 couillons... On met les glandus à profit !`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Les framboises sont perchées sur le tabouret de mon grand-père.`,
      },
      {
        author: ['Alexandre Astier'],
        text: `(A Arthur) Ça prouve que j'ai de l'ubiquité... De l'humilité ? C'est pas quand il y a des infiltrations ?`,
      },
      {
        author: ['Alexandre Astier'],
        text: `À ROULEEEEETTES !! HOULA... J'l'ai un peu trop gueulé ça, non ? À roulettes.`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Ah, mais c'est de là que ça vient ! Quand on dit "ça va comme sur des roulettes". En fait ça veut dire qu'le mec il peut balancer un morceau de rocher comme une catapulte, il continue quand même d'avancer d'façon mobile. `,
      },
      {
        author: ['Alexandre Astier'],
        text: `Une maquette ?! Vous avez pas dit qu'c'était une catapulte ?`,
      },
      {
        author: ['Alexandre Astier'],
        text: `[En parlant de la Dame du Lac que, pour une fois, tout le monde, sauf Arthur, peut voir] Ouh làlà! elle va pas me gonfler longtemps, la rouquine !!!`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Les 3 actes, c'est les bonnes femmes qui sont mi-taupes mi-déesses, et qui ont forcé les mecs de Bethléem à construire les pyramides.`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Est-ce que vous avez assez de dés pour remplir un seau comme ça ? [Le tavernier n'en a que trois] C'est plus facile d'en tirer cent ou deux-cents d'un coup et d'additionner, parce que là avec trois, on va être obligés de tirer quarante fois de suite à chaque tour.`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Sloubi 1, sloubi 2, sloubi 3, sloubi 4, sloubi 5 [...] sloubi 324, sloubi 325!...`,
      },
      {
        author: ['Alexandre Astier'],
        text: `C'est moi qui remporte le tour. Quand on remporte le tour à Sloubi, on a quatorze solutions possibles : soit on annule le tour ; soit on passe ; soit on change de sens ; soit on recalcule les points ; soit on compte ; soit on divise par six ; soit on jette les bouts de bois de quinze pouces, ça c'est quand on joue avec les bouts de bois ; soit on se couche ; soit on joue sans atouts. Et après y'a les appels : plus un ; plus deux ; attrape oiseaux ; régoudon ; ou chante Sloubi. [...] Comme vous êtes second, vous avez plus que dix-neuf solutions possibles : soit vous passez ; soit vous sciez en deux les cinquante poutrelles de trente pieds, mais ça c'est quand on joue avec les bouts de bois. Sinon c'est les relances : doublette ; jeu carré ; jeu de piste ; jeu gagnant ; jeu moulin ; jeu-jeu ; joue-jeu ; joue-joue ; joue-jié ; joue-ganou ; gagnar ; catakt ; tacat ; cacatac ; cagat-cata et ratacat-mic. Ou : chante Sloubi. Nous, on va faire que chante Sloubi.`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Je vous ai vu une fois dans une carriole, tirée par un cheval. Enfin, la carriole tirée par un cheval.`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Dans le Languedoc, ils m'appellent Provençal. Mais c'est moi qui m'suis gouré en disant mon nom. Sinon, en Bretagne, c'est le Gros Faisan au sud, et au nord, c'est juste Ducon ..`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Au printemps, j'aime bien pisser du haut des remparts au lever du soleil… Y'a une belle vue !`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Ils ont pas de bol, quand même ! Mettre au point un truc pareil et tomber sur des cerveaux comme nous !`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Sur une échelle de 2 à 76, et là je préfère prendre large, de 2 à 71 on ne nous écoute pas, de 72 à 75, on nous écoute toujours pas, et seulement à 76 on nous laisse parler sans nous engueuler.`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Mais cherchez pas à faire des phrases pourries... On en a gros, c'est tout !`,
      },
      {
        author: ['Alexandre Astier'],
        text: `En plus je connais une technique pour tuer trois hommes en un coup rien qu'avec des feuilles mortes ! Alors là, vous êtes deux, vous avez bien de la chance.`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Vous vous prenez pour un enseignant ?... Non j' s'entais que c'était le moment d'faire une vanne mais y'a rien qui est sorti.`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Bon ça suffit maintenant ! Vous voulez qu'j'me foute en rogne comme un enseignant ? ... Qu'est ce que j'ai avec ça moi ?`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Mais moi, j'm'en fous des honneurs, rien à péter, le Graal aussi, rien à péter. Moi, c'est Arthur qui compte. Moi je suis pas un as de la stratégie ou du tir à l'arc, mais je peux me vanter de savoir ce que c'est que d'aimer quelqu'un.`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Y en a qui picolent, d'autres qui se battent à l'épée, moi je fais ça. Au moins je fais de mal à personne.`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Moi, la canne, ça m'aide. Je visualise le caillou dans l'eau, j'ai l'impression de faire partie d'un tout, moi, le caillou, le fil, le lac, le ciel, c'est entier, vous comprenez ? C'est bien fini. C'est pour ça, moi je me dis, c'est dans ces moments-là qu'on peut bien comprendre des trucs. Vous me prenez pour un con, non ?|précisions=Arthur répond : Pas du tout. Les poissons, eux en revanche, vous prennent certainement pour un con.`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Ah ça y'est, j'viens de comprendre à quoi ça sert la canne. En fait ça sert à rien… Du coup ça nous renvoie à notre propre utilité : l'Homme face à l'Absurde !`,
      },
      {
        author: ['Alexandre Astier'],
        text: `C'est pas moi qu'explique mal, c'est les autres qui sont cons !`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Non mais Sire, c'est n'importe quoi, là.|précisions=En voix off, après qu'Arthur a donné des coups de poing à Karadoc et Perceval. Selon Perceval, Arthur n'a pas fait les choses dans les règles, ou plutôt dans LEURS règles.`,
      },
      {
        author: ['Alexandre Astier'],
        text: `On va pas installer notre carré germinal à la taverne !`,
      },
      {
        author: ['Alexandre Astier'],
        text: `(À Mevanwi) Elle a compris la vilaine frisée ? On a dans l'projet de fonder un clan autonome pour partir à l'aventure et ramener du pognon pour entretenir vos grosses miches !! Alors le cageot il dit merci et il ferme sa boîte à caca!!!`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Oh! Vous voulez que je vous foute en rogne?C'est ce que vous cherchez? La serrurerie, c'est une technique extrêmement précise, d'accord? Des fois il y a six mois de boulot sur une serrure. Alors vos tiges, vous vous les foutez quelque part. Moi en tout cas, j'ai le respect des artisans, et si j'ai pas exactement la bonne clé, je crochète pas.`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Une fois pour toute, il a que Arthur qui peut la [Excalibur] retirer! Votre chintok il peut passer trois semaines a tirer dessus, il repartira chez lui aussi con qu'il est venu! VOILÀ!`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Vous, vous avez une idée derrière la main, j'en mettrais ma tête au feu!`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Si on avait bu un coup dans des trucs qui s'cassent, j'en aurais pété un par terre avant d'monter dans ma chambre, pour bien montrer comment j'suis colère.`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Je vais vous poser une série de questions. Vous répondez par oui, non, ou Zbradaraldjan. Ok c'est parti : où se trouve l'oiseau ?... Allez c'est facile ça. Trouve pas ? Bon tant pis. C'était "sur la branche". Eh oui, y a des pièges.`,
      },
      {
        author: ['Alexandre Astier'],
        text: `(Mevanwi: Moi je dors en haut) Ah bah non. Je voulais y aller moi, je vais pas coucher a coté de la mère cageot`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Si la mémoire est à la tête ce que le passé, peut-on y accéder à six ? Oui, non, zbradaraldjan ?`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Ma tante me demande de trouver un endroit pour y entreposer 667 noix. A la cave il y a de la place pour 595, à la remise il y a la place pour 337. Qu'est-ce que je fais ? Je les ?... Allez on cherche bon dieu ! Je les... Zbradaraldjan le grenier!... Allez il dégage le bourrin !`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Je crois que c'est rentré par là, et c'est ressorti par là ; et c'est re-rentré par là, et c'est RE-RE-SORTI PAR LA. ET NOUS ON S'SAIGNE AUX QUATRE FROMAGES !!!`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Par contre pas un mot là, sinon la porte. Bon là y en a pas, mais ce n'est pas la première fois qu'on fabrique une porte à la dernière minute pour virer un petit trou de balle qui fait son malin.`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Progressif... N'oubliez pas, dans la casse, le plus important, c'est les suites d'épaisseurs ... Bûche de 10, Bûche de 16; Bûche de 32, Bûbûche, Bibuchette, et re-Bûche de 6 !!!`,
      },
      {
        author: ['Alexandre Astier'],
        text: `(En parlant de Dame Mevanwi) Ouais ouais ben j'suis pas trop. Sauf que quand on fait des choix il faut les tenir un minimum. Et ça change de chambre et ça change de mari... (Personnage : Mais mêlez vous de vos fesses !)Ouais ouais ouais ! Il faudrait peut-être commencer par se comporter en adulte !`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Votre femme, si j'avais pas la flemme de descendre de là, elle aurait pris mon pied dans son cul depuis un moment. Parce y'a un truc qu'on oublie quand on parle de retirer Excalibur : c'est le respect au Roi Arthur! Et le respect au Roi Arthur je remarque que Madame en avait un peu plus quand elle était dans son PLUMARD !!`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Non mais Sire, faut pas prendre ce qu'on dit au sérieux, vous savez bien qu'on est des cons, nous.`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Allez, y'a plein de bruit, là ! Si ça se trouve c'est bourré d'oiseaux venimeux. Y'en a des rouges, des jaunes, des re-rouges et des pourpres ! Y bouffent que des noisettes et des escalopes de veau. Et quand ils vous donnent un coup de bec vous voyez une grande lumière et ça vous donne la diarrhée !`,
      },
      {
        author: ['Alexandre Astier'],
        text: `(à Arthur) Ouais en même temps ça vous a prouvé qu'on avait pas froid au ventre ! (Personnage : aux yeux!) Comment ? (Personnage : Aux yeux, pas froid au ventre.) (Personnage : Froid aux yeux ? Comment c'est possible ça ?) Ben si, à la limite avec du vent… mais bon si on a froid aux yeux on les ferme !`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Nan mais je l'ai déjà impressionné, moi ! Je lui ai expliqué une nouvelle technique de combat : on se bat à moitié à mains nues, et à moitié avec du calcium. J'peux vous dire il faisait moins le malin !`,
      },
      {
        author: ['Alexandre Astier'],
        text: `(à Arthur qui vient de lui raconter longuement un rêve) C'est vraiment chouette comme rêve... Moi l'autre nuit j'ai rêvé que Karadoc avait des pinces... Personnage : (confus) C'est-à-dire? Comme un crabe... Personnage : Ah? Et qu'est-ce qu'il faisait avec ses pinces? Il me pinçait le ménisque. Personnage :(interloqué) Le ménisque? Comparés aux vôtres, ils sont pourris mes rêves, ou pas? `,
      },
      {
        author: ['Alexandre Astier'],
        text: `La patience est un plat qui se mange sans sauce.`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Evidemment qu'il est pas mort, ça fait dix ans que je vous le dit, gros salsifis !`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Glandussss ! [...] La patrouille de Kaamelott c'est des glanduuuus !`,
      },
      {
        author: ['Alexandre Astier'],
        text: `On est en souterrain, (en choeur avec karadoc) parce que c'est classe !`,
      },
      {
        author: ['Alexandre Astier'],
        text: `(Ils sont ou les semi croustillant ? Sur la Bretagne ?) Non mes petits coqs en pâte, ils sont (en choeur avec karadoc) sous la Bretagne !`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Des bons à rien, j'en ai vu, mais le coup de la Table Ronde, alors là… C'est le rendez-vous des mains dans les poches.`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Il y en a marre de se comporter comme des sagouins avec tout le monde, sous prétexte qu'on a des responsabilités !`,
      },
      {
        author: ['Alexandre Astier'],
        text: `(À Léodagan) Votre gendre. Eh ben, il a peur du noir !…`,
      },
      {
        author: ['Alexandre Astier'],
        text: `(À Léodagan) À l'heure qu'il est, dans la chambre de votre fille, il y a un tigre, une bête déchaînée ! Le petit prince est en marche, et qu'est-ce qu'on dit ? Merci mamie !`,
      },
      {
        author: ['Alexandre Astier'],
        text: `(À Léodagan)Vous je vous demande pas de me soutenir, ça serait miraculeux !`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Ah mais c'est vous qui m'cassez la tête ! Vous devriez être fier d'avoir un fils un peu moins bourrin qu'la moyenne !`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Comment j'ai fait pour élever cette gamine sans m'apercevoir qu'elle avait peur des oiseaux moi ?!`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Une fois j'ai craché sur les pompes de l'empereur Justinien, alors je vais pas me gratter pour l'un de ses sous-fifres !`,
      },
      {
        author: ['Alexandre Astier'],
        text: `(À Karadoc) Vous vous prenez peut-être pour une statue grecque ?`,
      },
      {
        author: ['Alexandre Astier'],
        text: `De toutes façons, dans votre bled on peut pas faire trois pas sans tomber sur un site magique alors, s'il fallait sauter par dessus à chaque fois !`,
      },
      {
        author: ['Alexandre Astier'],
        text: `[LEODAGAN : On comprend pas le Picte, nous.] Oh bah vous non hein, c'est sûr ! En trente ans vous avez pas été foutu d'apprendre à dire "merci" !`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Y'a pas d'équivoque ! Vous êtes un franchement un bourrin dans toutes circonstances !`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Mais je compte pas la choper en pleine course! Je vais la distraire avec du fromage !`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Eh ben oui voilà la partie moche ! Et estimez-vous heureuse d'recevoir quelque chose !`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Oh ! Ben c'était des pecnots, quoi ! Ils étaient sales !`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Quand vous vous l'vez pour bouffer, vous me réveillez, vous bougez, vous allumez les bougies, vous toussez, bref ! Vous ignorez mon existence ! [...] Eh ben là, pas un bruit, pas un mouvement, tout dans le furtif. Vous avez glissé du pageot comme un pet sur une plaque de verglas !`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Ou vous m'expliquez pourquoi vous rasez les murs comme un évadé de cachot, ou vous prenez ma main dans le pif ! `,
      },
      {
        author: ['Alexandre Astier'],
        text: `(À Guenièvre) Bohort il a une femme ! Vous pouvez me la refaire sans trembler des genoux celle-là ?`,
      },
      {
        author: ['Alexandre Astier'],
        text: `(À Bohort) Ben voyons, mon colon ! [Guenièvre (à Bohort aussi) : Bon, eh bien vous lui transmettrez notre bon souvenir] (toujours à Bohort, pour se moquer de lui) C'est ça, et pendant que vous y êtes, vous lui ferez un massage de la voûte plantaire. </br>[Bohort (naïvement) : Je n'y manquerai pas.]`,
      },
      {
        author: ['Alexandre Astier'],
        text: `(À Merlin) Le jour où vous serez à même de comprendre les rouages d'une monarchie, on aura soin de venir vous demander votre avis. En attendant, vous faites ce qu'on vous dit, ET VOUS LA BOUCLEZ !`,
      },
      {
        author: ['Alexandre Astier'],
        text: `(À Merlin) Soit vous fabriquez séance tenante une potion de fécondité qui fonctionne mieux que vos flacons de pisse habituels, soit mon mari ici présent se fera un plaisir d'outrepasser la hiérarchie et de vous mettre une trempe maison !`,
      },
      {
        author: ['Alexandre Astier'],
        text: `(À Léodagan) PIGNOUUUUF! (Puis à Elias et Merlin) Bon, et nous alors, qu'est-ce qu'on fait ? On traite ou on se fâche ? [Merlin : On se fâche. - Elias (à Merlin) : On traite !]`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Alors, le ratichon ! On a un p'tit creux ?`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Les placards sont fermés ! Vous allez retourner dans votre canfouine, au trot, et si la faim persiste, mangez des moustiques : c'est nourrissant, ça coûte rien, et ça débarrasse !`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Des fuites ? Apprenez qu'avec le budget bouffe de Kaamelott, y'a de quoi lever une armée parallèle et envahir la moitié du monde connu.`,
      },
      {
        author: ['Alexandre Astier'],
        text: `(Au Père Blaise) Jouez pas au con ! Dans votre branche, on fait pas voeu de bouffer léger, quelque chose comme ça ?`,
      },
      {
        author: ['Alexandre Astier'],
        text: `(À Arthur, Léodagan et au Père Blaise) Je vais vous la faire à la cantonade dans le genre tragédie grecque, tâchez de vous partager ça au mieux : LA BOUFFE EST INTERDITE EN DEHORS DES HEURES DES REPAS !!!`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Les reines, y en a deux sortes : les chefs d'état et les gourdasses. Je vous le dis tout de suite, notre fille fait partie de la deuxième catégorie.`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Tout le monde le sait, en Carmélide, que vous êtes une patate. Seulement, ça passe parce que les gens savent que c'est moi qui tire les ficelles dans l'arrière boutique.`,
      },
      {
        author: ['Alexandre Astier'],
        text: `(À Mévanwi) : Oh bah c'est normal ça, moi si j'avais foutu un royaume en l'air et qu'la pérennité d'une civilisation tout entière était remise en question à cause de mes p'tites coucheries, moi non plus j'me sentirais pas bien...`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Admirez-nous un peu après trente ans de souplesse… Trente ans d'éducation laxiste !… Entre la fille princesse qui abandonne le trône pour mettre les bouts dans la forêt avec un jean-foutre et le fils chevalier qui sait pas tenir sa cuillère et qui est pas foutu de se lever avant midi, vous verrez qu'à force d'être souples, on va finir par passer définitivement pour des romanos ! Et ils se sont pas levés !`,
      },
      {
        author: ['Alexandre Astier'],
        text: `(À Yvain) : Avec votre père, on n'arrive pas à se mettre d'accord. Moi, je prétends que le zinzin là, vous auriez pas pu trouver mieux pour nous emmerder; et lui, il pense que, justement, quand il s'agit de nous emmerder, vous faites preuve d'une imagination débordante. Qu'est-ce que vous en pensez, vous ?`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Je vous préviens, la matinée a eu sa bonne dose de pignoufs, je suis plus que crevée... Alors je préconise un déjeuner dans le calme.`,
      },
      {
        author: ['Alexandre Astier'],
        text: `(À Ygerne et Cryda) C'est des tartes dans le museau qu'elles cherchent, les soeurs Tape-Dur ?`,
      },
      {
        author: ['Alexandre Astier'],
        text: `(À Ygerne et Cryda) C'est qu'elles nous accuseraient de conspiration, les siamoises !`,
      },
      {
        author: ['Alexandre Astier'],
        text: `(À Yvain et à Guenièvre) Si les dieux avaient dû être de notre côté, ils nous auraient pas refilé des enfants comme vous. `,
      },
      {
        author: ['Alexandre Astier'],
        text: `(À Guenièvre) Votre petit train-train quotidien de reine de Bretagne. Quand je pense à toutes les pécores qui se couperaient les mains pour avoir le tiers de vos soucis, ma pauvre !`,
      },
      {
        author: ['Alexandre Astier'],
        text: `(Toujours à Guenièvre) Si vous préférez retourner dans votre cabane de trappeur avec votre dégénéré de Lancelot, libre à vous !`,
      },
      {
        author: ['Alexandre Astier'],
        text: `(Encore à Guenièvre) Nous aussi, on vous aime. A partir du moment où vous gardez vos miches sur le trône et où vous foutez pas l'camp dès qu'un blondinet vous fait d'l'oeil.`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Y a pas si longtemps vous aviez un enchanteur qui s'appelait Merlin. Vous vous souvenez ? A force d'être traité comme une sous-merde il a foutu le camp, et bah ça ça fait partie des trois bricoles qu'il a pas prises avec lui. C'est des abricots vieux de trois ans, conservés selon un processus qu'il a inventé et dont il a jamais pu vous parler, parce que vous aviez pas le temps !`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Bah voilà. Finalement ce serait peut-être pas mal que ce soit le duc qui retire l'épée, il se comporterait peut-être un peu moins comme un fumier !`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Vous vous étonnerez pas si vous ressentez une vive douleur sur le sommet du crâne. C'est sûrement que vous aurez pris le plat à gigot dans la tronche !`,
      },
      {
        author: ['Alexandre Astier'],
        text: `(À Léodagan) Quand on vous propose du pognon, vous prenez. C'est comme ça, c'est tout, c'est la règle, c'est simple. Et si dans un second temps, vous tenez absolument à réfléchir, bah rien ne vous empêche de vous amuser. Mais d'abord, crrrr !`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Cassez-vous ! Cassez-vous ! Cassez-vous ! Décarrez d'chez moi, bande de clampins ! Taillez-vous vite fait ! Et j'vous conseille de vous mettre au turbin, vous m'entendez ? Et le prochain qui se pointe avec un prototype, un vase à fleurs ou le pot de chambre de sa mamie, j'l'envoie garder les moutons dans les Highlands, pigé ?! Et tenez, reprenez vos merdes ! J'suis pas vide-grenier !`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Si ça s'trouve ? Alors pour nous sortir de là il va nous falloir un peu plus solide que du "si ça s'trouve" !`,
      },
      {
        author: ['Alexandre Astier'],
        text: `[Dame Séli : La pêche, les tartes, tout ça c'est du patrimoine] (Arthur, montrant la tarte) C'est du patrimoine, ça ?`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Y'a pas à dire, dès qu'il y a du dessert, le repas est tout de suite plus chaleureux !`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Qu'est-ce qu'ils foutent, ces cons de Saxons ?`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Mon père, il n'était pas ébouriffé, déjà, hein, il avait une coupe à la con mais c'était plutôt aplati, et puis il était pas vaporeux, voilà ! Allez, au lit !`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Mais Bohort, j'vais vous faire mettre au cachot [...]. Non mais j'vous écoute, j'vous écoute seulement j'vous préviens, j'vous l'dis, j'vais vous faire descendre en cabane avec un pichet de flotte et un bout de pain sec. J'suis désolé, j'suis démuni, j'vois pas d'autre solution. Et puis j'pense que ça vous donnera un peu l'occasion de... de réfléchir un peu à tout ça à tête reposée, de prendre un peu d'recul sur les choses parce que Bohort, on n'réveille pas son roi en pleine nuit pour des conneries, encore moins deux fois d'suite...`,
      },
      {
        author: ['Alexandre Astier'],
        text: `(À Merlin) C'est vrai ce qu'on dit, vous êtes le fils d'un démon et d'une pucelle ? […] Vous avez plus pris de la pucelle.`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Mais vous allez me foutre le camp, espèce de con !?`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Mais ils s'débrouillent ! Une relève toutes les deux s'maines, j'me fous pas d'eux quand même ! C'est ça monter la garde, hein, j'suis désolé. On n'a jamais dit qu'c'était une sinécure...`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Nouvelle technique : on passe pour des cons, les autres se marrent, et on frappe. C'est nouveau. […] Ah non, ça c'est que nous. Parce qu'il faut être capable de passer pour des cons en un temps record. Ah non, là-dessus on a une avance considérable.`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Il commence à doucement me faire chier celui-là, aussi !`,
      },
      {
        author: ['Alexandre Astier'],
        text: `(à son armée) Oh ! Bah si on vous emmerde, vous prévenez ! Bah oui, c'est un peu là que ça se passe ! `,
      },
      {
        author: ['Alexandre Astier'],
        text: `Sortez-vous les doigts du cuuuuuuul !!!`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Moi je serais vous, j'irai me recoucher vite fait avant de prendre un pain !`,
      },
      {
        author: ['Alexandre Astier'],
        text: `(À Perceval) Vous en ce moment c'est pas terrible. La gloire, la légende, les quêtes, tout ça c'est… C'est… c'est pas terrible. (Perceval et Karadoc se regardent, à moitié d'accord) Ah non, mais ne réfléchissez pas ! J'vous l'affirme ! C'est pas terrible ! C'est nul, nul, archi nul, vous êtes des ZEROS ! `,
      },
      {
        author: ['Alexandre Astier'],
        text: `(S'adressant au seigneur Perceval) Sur le principe, la Table ronde, c'est pas obligatoire.`,
      },
      {
        author: ['Alexandre Astier'],
        text: `(À Lancelot) Oui, je sais, j'ai arbitré un peu sec. Mais en même temps...`,
      },
      {
        author: ['Alexandre Astier'],
        text: `(À Guenièvre, à propos de sa mère, Dame Ygerne) Avec ma mère, faut que tout soit carré.`,
      },
      {
        author: ['Alexandre Astier'],
        text: `(À sa mère, Dame Ygerne) Oui… non… nous, on mange quand on a faim.`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Ah, mais des tanches pareilles, on devrait les mettre sous verre, hein !`,
      },
      {
        author: ['Alexandre Astier'],
        text: `(À Perceval, à propos de Merlin) Au bout d'un moment, il est vraiment druide, c'mec-là, ou ça fait quinze ans qu'il me prend pour un con ?`,
      },
      {
        author: ['Alexandre Astier'],
        text: `(Après avoir planté la seringue dans le bras de Merlin) Ah ! ben ça… i'faut se méfier, avec les mecs à cran !…`,
      },
      {
        author: ['Alexandre Astier'],
        text: `On se fait couper les deux bras, on revient vous voir, et 5 minutes après on retourne se mettre sur la gueule ! Mettez-vous à la place des ennemis, c'est désespérant.`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Non, moi j'crois qu'il faut qu'vous arrêtiez d'essayer d'dire des trucs. Ça vous fatigue, déjà, et pour les autres, vous vous rendez pas compte de c'que c'est... Moi quand vous faites ça, ça me fout une angoisse... J'pourrais vous tuer, j'crois. De chagrin, hein ! J'vous jure c'est pas bien. Il faut plus que vous parliez avec des gens.`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Quand je viens vous voir, pour vous demander des trucs ; c'est l'enchanteur que je viens voir ; pour qu'il m'donne des solutions d'enchanteur : pas des combines à la noix ou des remèdes de bonne femme ! Vous êtes mon enchanteur, vous êtes pas ma grand-mère, OK ?`,
      },
      {
        author: ['Alexandre Astier'],
        text: `(À Guenièvre) La prochaine fois que vous faites venir un barde, je lui ouvre le bide de là à là, j'lui sors les boyaux et je file sa langue à bouffer aux chiens. C'est clair, ça ?`,
      },
      {
        author: ['Alexandre Astier'],
        text: `(À propos d'une statue grecque) Ah bah ça change, oui ! Un type tout nu qui balance des assiettes !`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Et alors figurez-vous que les dux bellorum, ils décorent pas leurs chambres avec des bonshommes sportifs qui se baladent le sifflet a l'air ! C'est pas tellement l'ambiance !`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Ça vous fait pas mal à la tête de glandouiller vingt-quatre heures sur vingt-quatre ?`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Qu'est ce qui vous prend à tous cette nuit ? vous voulez que je vous balance dans les douves ou quoi ?`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Oh, mais c'est pas vrai, mais vous allez m'gonfler jusqu'à quand ? Une heure que j'crapahute dans tout le château avec ma bougie, ça va bien, maintenant !`,
      },
      {
        author: ['Alexandre Astier'],
        text: `J'en ai rien à foutre ! Vous pourriez vous marier avec une chèvre si ça vous chante. Et puis, si y en a une qu'est d'accord, rappelez-vous qu'c'est inespéré, puis sautez sur l'occasion.`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Dieu ! Depuis qu'vous êtes arrivé - ça fait quoi, ça fait deux-trois ans à peu près, enfin j'veux dire deux-trois ans que le truc a bien pris, quoi, qu'les gens en parlent, tout ça - moi j'fais tout c'que j'peux pour mettre les gars au pas. La quête du Graal, le côté symbolique, la lumière, la salvation, tout ça... j'crois qu'c'est bien rentré. Parce que c'était pas gagné quand même. Moi les mectons d'la Table Ronde c'est pas des flèches, vous êtes au courant d'ça. Quand j'leur parle du Graal, eux ils cherchent un vase, et c'est marre. Si j'commence à m'lancer dans des explications comme quoi c'est pas l'objet qui est important mais le côté symbolique, le sang d'vot'fils, la vie éternelle alors là, les gars y me regardent avec des billes comme ça et puis y décrochent, ah hein, rideau ! Alors j'crois que c'qu'y s'rait pas mal, si on veut faire un peu avancer l'histoire, voyez, ça s'rait de faire péter un signe, mais un truc commac, hein. Parce que la Dame du Lac c'est bien gentil, mais euh, comme y a que moi qui peux la voir, c'est pas très encourageant pour les autres. Non au contraire, quand y m'voient causer tout seul, y s'demandent si j'ai pas carrément tourné la carte. Alors voilà, faites c'que vous pouvez, quoi. J'compte sur vous. Donc euh… amen… enfin euh… deo gratias j'sais pu quoi… j'suis désolé, j'ai pas eu le temps de potasser les formules.`,
      },
      {
        author: ['Alexandre Astier'],
        text: `(À Guenièvre) Merlin, i'sait déjà pas monter des blancs en neige, alors préparer une potion de polymorphie… Permettez-moi d'avoir des doutes.`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Mais comment voulez-vous que j'vous prouve que j'suis moi, ça devient débile, à la fin !`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Me parler ? A c'te heure-ci ? Vous voulez mon pied au cul ?`,
      },
      {
        author: ['Alexandre Astier'],
        text: `De toutes façons, c'est ma mère, j'vais pas la faire tabasser par la garde.`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Qu'est-ce que c'est, le Graal ? Vous savez pas vraiment ! Et moi non plus ! Et j'en ai rien à cirer ! Regardez-nous : y'en a pas deux qui ont le même âge, pas deux qui viennent du même endroit ! Des seigneurs, des chevaliers errants, des riches, des pauvres ! MAIS : à la table ronde, pour la première fois dans toute l'histoire du peuple breton, nous cherchons tous la même chose : le Graal ! C'est le Graal qui fait de vous des chevaliers, des hommes civilisés, qui nous différencie des tribus barbares. Le Graal, c'est notre union. Le Graal, c'est notre grandeur.`,
      },
      {
        author: ['Alexandre Astier'],
        text: `J'suis chef de guerre moi, j'suis pas là pour agiter des drapeaux et jouer d'la trompette...`,
      },
      {
        author: ['Alexandre Astier'],
        text: `(À Perceval) Rangez-moi ça, débile, la table ronde, c'est pas la fête de l'artisanat !`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Au gros sel ? Qu'est-ce que c'est que ces conneries ? Vous me prenez pour une épaule d'agneau ?`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Mais j'ai pas l'temps de faire de la broderie maintenant ! J'vous dis qu'on est en train de se prendre une peignée !`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Un jour je vais lui fumer sa gueule à ce connard !`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Mais mariez-vous avec qui vous voulez et allez crever.`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Vous croyez vraiment que vous avez les moyens de me convoquer ? Je suis là parce que j'veux bien... Et si vous m'avez fait déplacer pour rien, je vous balance quinze jours dans une cage sans boire ni bouffer et je me démerde pour que vous chopiez le typhus. Je vous écoute. (Perceval : bon, on va faire simple.) J'vous l'conseille, oui.`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Il faut affranchir nos compagnons. Vous vous souviendrez ?`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Quel tas de merdier... Non mais sérieusement, quel merdier ! Vous vous croyez où ?`,
      },
      {
        author: ['Alexandre Astier'],
        text: `"Décarre tes troupes de chez moi ou j'crame ton pays". C'est assez simple comme vocabulaire ?`,
      },
      {
        author: ['Fabien Rault'],
        text: `(À Perceval) Arthur, le dragon, Arthur... Y'a rien qui gigote là-dedans ?`,
      },
      {
        author: ['Fabien Rault'],
        text: `Vous, vous devriez arrêter de sourire. J'vous promets, ça devient vraiment malsain.`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Quand vous voyez des gadins de 15 pieds de haut plantés en rond, figurez-vous qu'ils ont pas poussé dans la nuit.`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Vil félon, où as-tu dissimulé le Graal Sacré ? Dans ton cul ! Tu paieras pour cet affront ! `,
      },
      {
        author: ['Alexandre Astier'],
        text: `Non mais regardez. Maintenant que j'ai enlevé le mie de mon pain, "Aaah ouh, Arthur ! Le Graal tu t'en iras quérir.. Mam mam mam mam... mam".`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Attention, l'ogre des collines !`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Sire, nous voici a l'entrée de la grotte... Pied à terre mon fidèle Lancelot, le Graal est à portée de main ! Attention sire derrière vous ! Le chevalier noir ! Euheuh hrrr... Hinhin Arthur ta dernière heure a sonné... Vil félon, ou as tu dissimulé le Graal sacré ? Dans ton cul ! Tu paieras pour cet affront ! Tfftftfftfff brrrr... BRRR ! Aaahh... Victoire sire ! Le Graal enfin ! Il est vachement gros ! Attention il est pas du tout comme j'imaginais ! Sire écoutez, les villageois, ils vous acclament comme des villageois ! Vive Arthur, vive le roi de Bretagne, vive Arthur ! Hourraaa ! Hourraaa !Au secours, au secours, appelez Merlin ! Merlin arrive, oaaaahhh, apparition inexpliquée, boule de feu boule de feu brrf brrf pffifff. Attention l'ogre des collines : bbhhheeuh, disparaissez de mes terres, périssez êtres inférieurs ! Catapuuultttttess catapuuultees catapuuullttes tirrrreeeezzz ! Pfrioou pfriouuu pfrioou pfriouuu pfrioou pfriouuu… (La servante arrive)C'est bon vous pouvez débarrasser...`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Fleur, unique, belle, vite ! J'ai besoin d'exprimer mon transport. (Guethenoc répond : Pour le transport, vaut mieux la brouette !)`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Mais je vous emmerde, mon petit pote ! Vous commandez ce que je vous dis de commander et vous la fermez bien comme il faut !`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Le plus intéressant, c'est : comment vous arrivez à faire un truc aussi immonde avec des ingrédients normaux ? [...] Mais c'est incroyable, j'ai l'impression de bouffer de la terre avec de la bouse et du gravier, ça sent le poulailler, mais c'est du céleri et des oignons... C'est prodigieux.`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Ah, le printemps ! La nature se réveille, les oiseaux reviennent, on crame des mecs...`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Une heure avant, je me dis toujours : « Tiens, je vais déjeuner avec Perceval, ça me fait plaisir ». [...] Ça vous la coupe, ça, hein ? Bon, après, une fois que j'ai bouffé avec vous, je regrette, hein, on est d'accord. Arrivé au milieu du repas, j'ai toujours envie de vous éclater le crâne avec le tranchant de la coupe, là, vous voyez, pour vous faire... fermer votre gueule une bonne fois pour toutes... mais sinon... je vous aime.`,
      },
      {
        author: ['Alexandre Astier'],
        text: `C'est parce que je cherche le Graal que je suis roi. Et du coup que vous êtes reine. Si je cherchais pas le Graal, vous seriez encore en Carmélide en train de torcher le cul des vaches dans une des fermes de votre con de père !`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Mais je ne suis pas romain, merde !`,
      },
      {
        author: ['Alexandre Astier'],
        text: `( parlant tout seul, ivre) On y voit comme à travers un pelle là-dedans... Hé lumière !!! Pff bande de fainéants... Ah ça, pour roupiller, vous êtes fortiches (s'esclaffe) Les chevaliers de la Table Ronde... CHEVALIERS DE MES DEUX !!! Chuis p... chuis pas roi, moi ? C'est p..., c'est pas moi le roi ?! (dégainant Excalibur) Et ça, c'est du nougat ??? Tout seul, je vais le chercher le Graal, moi, et la vie éternelle, c'est pour bibi !!! Et vous, vous irez vous gratter !!!`,
      },
      {
        author: ['Alexandre Astier'],
        text: `(à Demetra) Vous savez quelle est la différence entre la chèvre et vous ? (Demetra, énervée : Je ne sais pas, mais je sens que ça ne va pas me plaire.) La chèvre elle a couiné cinq minutes ; vous, vous râlez depuis trois heures.`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Le seigneur Perceval ne se met jamais en situation dangereuse. Pour ça, il fait preuve d'une intelligence redoutable.`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Mais vous êtes pas mort, espèce de connard ?`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Oubliez ce que je viens de dire. Le Graal, c'est de la merde.`,
      },
      {
        author: ['Alexandre Astier'],
        text: `J'vais vous dire : même si le pays était à feu et à sang, il serait hors de question que j'rate un truc pareil !`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Et si je vous dis que vous êtes deux glands, là, vous avez du péremptoire. C'est vous qui voyez.`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Je gueule ; c'est vrai, j'suis un peu sec, tout ça... Mais pour quelqu'un comme moi, qui a facilement tendance à la dépression, c'est très important ce que vous faites, parce que... Comment vous dire... C'est systématiquement débile mais c'est toujours inattendu. Et ça c'est très important pour la... la santé du... du cigare...`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Mais ça va, maintenant, arrêtez le cirque, on va pas y passer la journée ! J'vous dis qu'il faut qu'j'aille chez Dagonet, alors j'attends qu'vous vous pétiez un bras, et j'me casse, alors magnez-vous l'tronc !`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Y'a trop de clampins qui se disent poètes qui sortent la licence poétique dès qu'ils pondent trois merdes que personne comprend.`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Au printemps, le sommeil ne cesse dès l'aurore. Partout se font ouïr les gazouillis d'oiseaux. La nuit s'achève enfin dans le souffle des eaux, qui sait combien de fleurs seront tombées encore. Ah, ben oui, c'est sûr, c'est du chinetoque (poème de [[Meng Haoran]] - VIII°s), hein, les mecs ils se râclent un peu la soupière avant de sortir n'importe quelle connerie !`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Mais qu'est-ce que que vous faites là, trou du cul ?`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Est-ce que vous avez conscience que j'ai de menues responsabilités au sein de ce gouvernement qui me tiennent relativement éloigné des problèmes de répartition des piaules ?`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Non non non, il vous a pas traité de cheval ! C'est même pas mon ministre en plus.(MINISTRE : C'est qui alors ?)C'est... pff.. C'est personne, c'est un un... connard. Asseyez-vous.`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Si il lâche une caisse... ça le fait ou pas ? `,
      },
      {
        author: ['Alexandre Astier'],
        text: `Si vous dites "fer à cheval", j'vous colle aux travaux forcés pendant six mois.`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Je file votre chambre à personne ! J'en ai rien à carrer, je me lave !`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Et alors vous allez me libérer les locaux avant ce soir vous entendez ? J'veux les turnes impeccables, les draps en tas dans le couloir et les clefs sur la porte, vous retournez crécher dans vos pays de débiles et vous foutez le camp de ma salle de bain !`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Bohort, je vous donne l'ordre de vous rendre immédiatement en Andalousie pour y rencontrer le chef wisigoth et lui transmettre le message de paix suivant :... « Coucou »...`,
      },
      {
        author: ['Alexandre Astier'],
        text: `(à Roparzh et Guethenoc) Alors, à qui qu'elle est morte, la vavache ?`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Eh bien, c'est l'histoire d'un petit ourson qui s'appelle... Arthur.Et y'a une fée, un jour, qui vient voir le petit ourson et qui lui dit : Arthur, tu vas partir à la recherche du Vase Magique. Et elle lui donne une épée hmm… magique (ouais, parce qu'y a plein de trucs magiques dans l'histoire, bref) alors le petit ourson il se dit : "Heu, chercher le Vase Magique ça doit être drôlement difficile, alors il faut que je parte dans la forêt pour trouver des amis pour m'aider."Alors il va voir son ami Lancelot... le cerf (parce que le cerf c'est majestueux, comme ça), heu, Bohort le faisan et puis Léodagan... heu... l'ours, ouais c'est un ours aussi, c'est pas tout à fait le même ours mais bon.Donc Léodagan qui est le père de la femme du petit ourson, qui s'appelle Guenièvre la truite... non, non, parce que c'est la fille de... non c'est un ours aussi puisque c'est la fille de l'autre ours, non parce qu'après ça fait des machins mixtes, en fait un ours et une truite... non en fait on comprend pas, ça va pas.Bref, sinon y'a Gauvain le neveu du petit ourson qui est le fils de sa soeur Anna, qui est restée à Tintagel avec sa mère Igerne la... bah non, ouais du coup je suis obligé de foutre des ours de partout sinon on pige plus rien dans la famille... Donc c'est des ours, en gros, enfin bref.Ils sont tous là et donc Petit Ourson il part avec sa troupe à la recherche du Vase Magique. Mais il le trouve pas, il le trouve pas parce qu'en fait pour la plupart d'entre eux c'est... c'est des nazes : ils sont hyper mous, ils sont bêtes, en plus y'en a qu'ont la trouille...Donc il décide de les faire brûler dans une grange pour s'en débarrasser... Donc la fée revient pour lui dire : "Attention petit ourson, il faut être gentil avec ses amis de la forêt" quand même c'est vrai, et du coup Petit Ourson il lui met un taquet dans la tête à la fée, comme ça : "BAH !".Alors la fée elle est comme ça et elle s'en va... et voilà et en fait il trouve pas le vase. En fait il est... il trouve euh... pas... et Petit Ourson il fait de la dépression et tous les jours il se demande s'il va se tuer ou... pas...`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Mais non, mais je vous prête pas une grange pour stocker des chinois ![Venec : Deux semaines! Le temps de trouver preneur.] Mais ça fait six ans que j'essaie d'abolir l'esclavage sur le territoire, je vais pas foutre des chinois dans une grange !`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Tenez, le Graal : personne ne sait ce que c'est ! Même vous, les dieux, vous êtes pas foutus de vous mettre d'accord, et moi j'me trimbale que des tarés ! Pas un pour racheter l'autre ! Si, y a Lancelot qui tient debout, seulement Lancelot, lui, il va foutre le camp ! [...] Le Graal, je sais pas où il est mais il va y rester un moment, c'est moi qui vous l'dis !`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Quoi, Excalibur ? Vous la voulez ? Tenez, je vous la rends ! Confiez-la donc à Perceval, il paraît qu'il a un plus grand destin que le mien !`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Quand on file une histoire à un copiste, pour qu'il en fasse 3 exemplaires, qu'ça va lui prendre trois mois,et qu'ça va coûter la peau des fesses, c'est pas pour raconter le temps qu'il fait ou ce que vous avez bouffé le midi, hein, il faut qu'ça pète !`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Le Saint-Suaire ? Vous avez foutu en l'air le Saint-Suaire ?`,
      },
      {
        author: ['Alexandre Astier'],
        text: `La religion c'est le bordel, admettez-le ! Alors laissez-moi prier c'que j'veux tranquille. 'M'empêche pas d'la chercher, votre saloperie de Graal.`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Mais c'est pas vrai mais c'est pas vrai mais c'est pas vraiiiiiiii !`,
      },
      {
        author: ['Alexandre Astier'],
        text: `[Bohort: Ça dépend, Attila vous le comptez comme un Hun ?]Ben évidemment, j'le compte pas comme un Ibère !`,
      },
      {
        author: ['Alexandre Astier'],
        text: `(À Perceval) Est-ce que vous avez souvenir qu'il se soit passé quelque chose entre Mevanwi et moi ? Perceval : À quel niveau ? Au niveau... du chou rouge.`,
      },
      {
        author: ['Alexandre Astier'],
        text: `(À Sefriane d'aquitaine) Mais votre oncle mes béliers pourris il va se les prendre dans le fion !`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Le Roi a décidé pour le jour d'aujourd'hui Qu'en vers de douze pieds vous devrez vous comprendre Depuis l'aube levée et ce jusqu'à la nuit Ainsi célébrerez le trépas d'Alexandre.`,
      },
      {
        author: ['Alexandre Astier'],
        text: `(À Léodagan) J'vais vous en faire préparer un de bon de sortie. Signé, tamponné, tout ce qu'il y a de plus officiel. Et puisque vous aimez les catapultes, on va vous mettre les miches dedans, vous, votre fils, votre femme, et tout l'orchestre. Et paf ! Feu nourri, direction Carmélide, la Bretagne vue du ciel ! Ça vous apprendra à bouffer à tous les râteliers !`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Et ben si ils veulent la place les gars, je leur laisse !Qu'ils y viennent chercher le Graal, avec la compagnie de loustics que je me promène... Je leur souhaite un bon séjour aux mecs ! Ils se les farciront, les séances de la Table Ronde où tout le monde roupille du début à la fin ! Les doléances, les revendications, les clans ! Moi, pendant ce temps-là, j'irai glander en Andalousie ! Là-bas au moins, on peut se baigner sans avoir les doigts de pieds tout bleus au bout de cinq minutes !`,
      },
      {
        author: ['Alexandre Astier'],
        text: `C'était quand la dernière fois qu'on s'est retrouvés tous d'accord sur un truc !?`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Franchement, j'ai connu des cafards moins opiniâtres...`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Vous allez voir qu'il n'y a aucun problème... Siècle des larmes, hurlements... Très bien. Au jour, Dieu Roi de... Roi de Logres ? Fait affront du Lac combattant frère à l'épée Femme de Vannes épousée commet faute Panique, ruines, fin d'un monde Sur Terre, sans démons ni sorcières Vient dieu des morts solitaire des frayeurs Du ciel à l'insulte la Réponse […] Là, ça pue du cul, mais violent.`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Je pense que vous glandouillez bien assez comme ça dans la réalité pour qu'on puisse se permettre d'optimiser le fictionnel.`,
      },
      {
        author: ['Alexandre Astier'],
        text: `(À Gauvain) Non, comme salope en Orcanie, y'a ma soeur, la reine. Votre mère quoi, mais vous le saviez, ça ?`,
      },
      {
        author: ['Alexandre Astier'],
        text: `[Dame Séli] Bon qu'est-ce qu'y a ? C'est pas bon ? [Arthur] Naaan mais c'est au-delà de ça je crois. L'autre jour, je rentrais de la plage et j'suis tombé sur un coin à fraises. Alors j'm'en suis fait un plein ventre ... paske les fraises, quand on leur fout la paix en fait, elles sont consommables. Là c'est aussi des fraises, probablement les mêmes d'ailleurs, mais par un procédé miraculeux, que j'arrive pas à m'imaginer ... on dirait des gadins.`,
      },
      {
        author: ['Alexandre Astier'],
        text: `(à Perceval et Karadoc) Vous vous entraînez à mettre le merdier ?!?`,
      },
      {
        author: ['Alexandre Astier'],
        text: `J'bouff'rais un ch'val en salade !!!`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Non mais... Que vous soyez débile c'est une chose, mais là y a de la mauvaise volonté quand même !`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Le fait est que je n'ai pas de place pour une histoire comme la nôtre. J'avoue, j'ai un peu profité de nous pour me soutirer à une condition pas toujours facile : le Graal, le seigneur Lancelot, la Bretagne, le peuple... Mais les Dieux n'aiment pas ça, les Dieux n'aiment pas notre histoire, ils le prouvent tous les jours. Alors on va arrêter le tir. Je renonce, à vous. Je suis désolé, c'est la meilleure chose à faire. Faites ce que vous pouvez pour m'en vouloir le moins possible. `,
      },
      {
        author: ['Alexandre Astier'],
        text: `MAIS C'EST PAS POSSIBLE QUE LA DAME DU LAC ELLE SACHE PAS NAGER !!!`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Faire tourner cette baraque... et guider tous ces débiles jusqu'au Graal, c'est sur moi que c'est tombé. Les dieux ont trouvé une bonne pomme pour s'arracher les cheveux avec cette histoire de dingues, ils sont pas près de la lâcher.`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Puis des collaborateurs qui savent rien faire, excusez-moi mais depuis la table ronde j'ai que ça, des collaborateurs qui savent rien faire. [Léodagan: Dites, oubliez pas que je suis dans le lot.] Parce que, quoi ? Vous avez trouvé le Graal la semaine dernière c'est ça ? Vous me le dites pas pour me faire une surprise ?`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Je suis désolé, mais les dieux ont pas l'air de votre avis. Je crois qu'ils en ont marre de ma tronche.`,
      },
      {
        author: ['Alexandre Astier'],
        text: `J'suis roi de Bretagne, j'ai pas de conseil à recevoir d'une clodo !`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Mais enfin, ça fait 15 lieues que vous nous pétez les noyaux avec vos bestioles : les moutons, les chèvres, les poules, vous croyez que ça nous intéresse ça ? (...) Oh là là, mais c'est pas vrai, les poules euh… c'est plus ce que c'était, les chèvres c'est pas rentable, maintenant les moutons c'est fastidieux ! Vous savez même pas ce que ça veut dire « fastidieux » !`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Arrêtez de m'appeler Sire.`,
      },
      {
        author: ['Alexandre Astier'],
        text: `(À Anton) Je parle moins maintenant, je terrasse plus mes ennemis par l'éloquence. Plus je vieillis, plus je ferme ma gueule. Aujourd'hui, ce qu'il me faudrait c'est le médaillon d'Harpocrate avec le doigt sur la bouche, comme ça. Je suis... désolé de jamais être revenu vous voir.`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Pour le Graal, j'ai bâti une forteresse, moi. Kaamelott, ça s'appelle. J'ai été chercher des chevaliers dans tout le royaume. En Calédonie, en Carmélide, à Gaunes, à Vannes, aux Pays de Galles... J'ai fait construire une grande table, pour que les chevaliers s'assoient ensemble. Je l'ai voulue ronde, pour qu'aucun d'entre eux ne se retrouve assis dans un angle, ou en bout de table. C'était compliqué, alors j'ai essayé d'expliquer ce qu'était le Graal, pour que tout le monde comprenne. C'était difficile, alors j'ai essayé de rigoler pour que personne ne s'ennuie. J'ai raté, mais je veux pas qu'on dise que j'ai rien foutu, parce que c'est pas vrai.`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Qu'est-ce que c'est que quelqu'un qui souffre et qui fait couler son sang par terre pour que tout le monde soit coupable ? Tous les suicidés sont le Christ. Toutes les baignoires sont le Graal... `,
      },
      {
        author: ['Alexandre Astier'],
        text: `Ça fait une heure qu'on vous achète tout ce qui vous passe sous le nez ! Si jamais on vous attaque, les gardes peuvent même pas vous défendre parce qu'ils sont obligés de transporter vos saloperies !`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Les rêves, ça se compare pas.`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Je suis le Roi Arthur, je ne désespère pas. Jamais je perds courage. Je suis un exemple pour les enfants.`,
      },
      {
        author: ['Alexandre Astier'],
        text: `(à Lancelot) Dans cette tablette, vous avez les pleins pouvoirs. [Lancelot: Pardon ?!] La forteresse de Kaamelott, le royaume de Logres, la fédération bretonne, la table ronde, la quête du Graal. C'est vous qui êtes en charge maintenant. [Lancelot: Je, je ne comprends pas…] Mais il y a rien a comprendre. Vous voulez essayer ? Eh ben essayez. Voilà, c'est votre récompense pour m'avoir sauvé la vie : les pleins pouvoirs.`,
      },
      {
        author: ['Alexandre Astier'],
        text: `(à Lancelot) Vous vous souvenez de l'époque ou vous croyiez aux mêmes choses que moi ? Parce que moi je m'en souviens. Vous savez ce qu'on va faire ? On va faire comme si il s'était rien passé depuis.`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Lancelot, vous êtes un grand chef ou pas ? (Lancelot: Je, je crois oui.) Alors rappelez-vous toujours de ça : Les grands chefs n'ont qu'un point commun. Ils ne se battent que pour la dignité des faibles.`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Seigneur, je me vouerai tout entier à la noble quête dont Vous m'honorâtes. Mais avec l'équipe de romanos que je me promène, on n'est pas sorti des ronces.`,
      },
      {
        author: ['Alexandre Astier'],
        text: `(Venec : Je vous rappelle que la cage de l'autre con, c'est moi qui la coltine.)Non mais là tu sera dedans, tu pourra te reposer.`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Quand il dit "pute", il dit pas ça dans le mauvais sens du terme.`,
      },
      {
        author: ['Alexandre Astier'],
        text: `(Quarto : il est pas recherché, lui ?) Non, il est pas recherché puisque je l'ai trouvé.`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Hé ben, si un jour j'oublie que je suis boniche, vous serez gentil de me le rappeler !`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Si Monsieur et Madame préfèrent s'envoyer des fions dans l'intimité, je peux aussi me retirer.`,
      },
      {
        author: ['Alexandre Astier'],
        text: `(À Arthur et à Mevanwi ensemble dans leur lit) Entre le calme plat du temps de Madame et la guérilla de cette nuit, je me permets de dire à Monsieur que Monsieur n'a pas bien le sens de la mesure... Monsieur est en dents de scie...`,
      },
      {
        author: ['Alexandre Astier'],
        text: `(À Arthur au sujet de Mevanwi) Je dois avouer que la chose a du bon, si c'est pour m'éviter la vue de la grande décarade, le défilé des nouvelles têtes, la parade des amoureuses à calcul, les poids lourds de la jambe légère, le festival de la morue, en somme...`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Si Monsieur et Madame pouvaient remettre leurs roulages de galoches à plus tard, il me semblerait judicieux de foutre le camp d'ici au plus vite.`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Monsieur peut considérer que je fais partie d'une sorte de [[:wikt:blot|blot]]. Je viens en sus.`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Quand on veut être sûr de son coup, mon petit bonhomme, on plante des carottes, on ne joue pas les chefs d'État !`,
      },
      {
        author: ['Alexandre Astier'],
        text: `(S'adressant au roi Loth) Excusez-moi, est-ce qu'à un seul moment, j'aurais par mégarde donné le moindre signe de vouloir discuter avec vous ?`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Vous êtes une gigantesque tarlouze.`,
      },
      {
        author: ['Alexandre Astier'],
        text: `(Loth : Je lèverai pas le petit doigt !)C'est pourtant bien la seule chose que vous seriez capable de lever.`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Jusqu'à présent, vous cumuliez trois statuts : bâtard, fils d'assassin et usurpateur. Bâtard, vous le serez toujours, de même que vous serez toujours le fils de votre sale ordure de père... Mais aujourd'hui, vous n'êtes plus roi, vous n'usurpez plus votre titre, c'est déjà ça.`,
      },
      {
        author: ['Alexandre Astier'],
        text: `(au Maître d'Armes) J'pensais à une chose, en toute amitié, un gros pain dans votre tête, ça serait de nature à vous convenir ?`,
      },
      {
        author: ['Alexandre Astier'],
        text: `En fait, je m'en suis pris deux, mais j'ai cherché la merde.`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Ouais, c'est bien qu'on reste un peu dehors, comme ça j'pourrais vous mettre une grosse tarte en plein air.`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Désolé mais vous l'avez chié votre mariage. Ce s'rait rien si c'était pas juste la deuxième fois.`,
      },
      {
        author: ['Alexandre Astier'],
        text: `(aux jumelles du pêcheur) Votre frère il va attaquer un trirème avec une barque ?`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Je vais tout casser, ici, MOI ! Kaamelott, Kaamelott... Y va rester un tas de caaaailloux, comme ça ! Je veux l'or, tout l'or sinon c'est la guerre !`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Je te mettrai à genoux, Arthur de Bretagne !`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Pourquoi pas ?`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Alors les femmes ! [...] Donnez-nous les femmes ! [...] Tous les femmes !!! [...] AAAAAAHH !!!`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Elle voumit ?`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Arthur ! Kaamelott, c'est zéro ! Des cailloux, des cailloux, des cailloux... ça m'énerve ! !`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Cette fois-ci, on part avec les femmes ! HAHAAAHA !!!!`,
      },
      {
        author: ['Alexandre Astier'],
        text: `(Beurré) Sire, vous êtes quand même un sacré souverain. Accueillir des péquenots qui sentent la bouse, comme ça, dans votre chapeau, ben je dis château !`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Sire, est-ce qu'on est vraiment obligés de perdre du temps avec tout les pignoufs de la région qui se prennent pour des exploitants ?`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Pardon ! Moi, je suis peut-être un peu inattentif parce que je dois subir de fortes pressions dues à ma condition, mais j'ai très bien entendu qu'on voulait du pognon.`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Moi J'ai mis quatre mois pour mettre cette betterave de côté ! Eh bah je la donne pas !`,
      },
      {
        author: ['Alexandre Astier'],
        text: `(solennel) Qui méritait de mourir gentiment, déployé sur sa terre grasse, Pour qu'un souffle de joie, lui emporta la caresse consolante, d'un tourbillon de pollen ! `,
      },
      {
        author: ['Alexandre Astier'],
        text: `Sire, on en a déjà parlé de la pierre ! Je peux pas monter une pierre d'une toise et demie dans un escalier en colimaçon !`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Le cuir, ça restera toujours le cuir. Le cuir, ça traverse les âges, les frontières, les modes. D'autant qu'là j'vous ai pas mis d'la vache moisie, attention ! C'est d'la tannerie d'luxe ! Assemblé au crochet de six ! Y'a des heures de main d'oeuvre derrière !`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Ça vous dérange si… si j'mets ma p'tite griffe là ? Si y'a un chef de clan qui vient poser ses miches par là devant et il trouve ça cossu... Ben le jour où il voudra faire un buffet ou un plumard sur mesure... il saura où m'trouver, quoi.`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Ben, d'la réclame beau Dieu !`,
      },
      {
        author: ['Alexandre Astier'],
        text: `C'est carré-carré chez vous, hein ?`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Après, moi, pour le détail, je sais pas...`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Passe de côté, esquive, attaque droite, hop ! La dague dans la main gauche, garde inversée et crac ! Dix pouces de ferraille dans les côtelettes !`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Vous n'avez qu'à considérer que je suis officiellement cul nu !`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Quoi ? Vous voulez que j'humilie ma terre natale pour une connerie d'armure rouillée ?`,
      },
      {
        author: ['Alexandre Astier'],
        text: `(En parlant à Arthur d'un cadeau offert par un clan saxon) Mais c'est un petit mâle, il s'appelle... « Ferme ta gueule ». C'est que quand il est né il arrêtait pas de couiner...`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Attendez, on dit "chef de clan" parce qu'il faut dire quelque chose, hein ! Mais Conran, il doit y avoir trois cahutes sur la plage, ils sont une dizaine à tout casser, et c'est tous des clodos, alors...`,
      },
      {
        author: ['Alexandre Astier'],
        text: `(En Parlant d'Hervé de Rinel) Ah mais c'est ça qui pue !`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Non mais là les chrétiens c'est pas pareil, ils aiment bien le fric. Il parait même qu'ils sont forts pour ça.`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Alors j'ai pas tout compris, mais ils ont eu un problème avec leur cadeau, du coup pour pas venir les mains vides, ils vous ont ramassé des amanites jonquilles. Ils disent qu'ils sont désolés mais qu'il y a que ça cette saison, et qu'il faut bien les faire bouillir sinon ça donne la diarrhée.`,
      },
      {
        author: ['Alexandre Astier'],
        text: `(Un sénateur : - J'vais vous dire : le jour où j'ai accepté d'être sénateur, j'aurais mieux fait de m'péter une jambe.) Ça peut encore s'arranger.`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Ça s'enferme les registres ! (Glaucia : Ah bon ?) Ouais ! Et les trous du cul qui font pas leur boulot, ça s'enferme aussi !`,
      },
      {
        author: ['Alexandre Astier'],
        text: `(Glaucia : - Ave Publius Servius Capito, t'avais demandé un rendez-vous ?) Non. J'ai pas envoyé de fleurs non plus.`,
      },
      {
        author: ['Alexandre Astier'],
        text: `(S'adressant à Merlin) Vous préférez monter dans la barque, maintenant, de plein gré, ou dans vingt secondes avec un coup de pompe dans l'oignon ?`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Tu salues plus les généraux ? C'est pourtant largement au-dessus de ton grade merdique.`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Alors, sans vouloir te commander, aurais-tu l'obligeance de bien vouloir te magner le cul ?`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Sans rire, vous foutez quoi là-dedans, là ? Pourtant, vous croulez pas sous les visites diplomatiques, il me semble ? Une fois tous les dix ans, vous pouvez donner un coup de balai, non ? `,
      },
      {
        author: ['Alexandre Astier'],
        text: `J'ai à peu près compris le principe du double-jeu, mais je ne saurais dire pourquoi, j'ai l'impression que tu nous l'as mis dans l'os... Et je pense que si tu refous les pieds à Rome - ne le prends pas mal hein... je te ferai éliminer.`,
      },
      {
        author: ['Alexandre Astier'],
        text: `A l'époque, quand je levais le doigt, y avait 15000 soldats qui gueulaient Imperator ! Maintenant, quand je lève le doigt, c'est pour aller pisser...`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Imperator ! Aaaaah ! Imperator ! Ah ça fait du bien crénom ! Ça me change de tous ces glands-là... Votre tranquillité par-ci, votre tranquillité par-là… Ça, dis donc… Pour être tranquille, 24h sur 24 au plumard… À pioncer, à bouffer de la compote… Ça, c'est sûr que j'enchaîne pas les crises de nerfs… Mais assieds-toi, là ! On dirait que tu vas chanter une chanson ! Allez ! `,
      },
      {
        author: ['Alexandre Astier'],
        text: `Te laisse pas faire Arturus. (Arturus : C'est-à-dire ?) J'en sais rien, je sais pas. Fais-en ce que tu veux... Démerdes-toi, te laisse pas faire, c'est un ordre.`,
      },
      {
        author: ['Alexandre Astier'],
        text: `On devient pas chef parce qu'on le mérite, andouille ! On devient chef par un concours de circonstances, on le mérite après ! Moi, il m'a p'têt' fallu dix ans pour mériter mon grade, si pas vingt. Tous les jours, j'ai travaillé pour pas nager dans mon uniforme. Y'a pas trente-six solutions. Arturus ? Hein ? Fais semblant ! Fais semblant d'être Dux. Fais semblant de mériter ton grade. Fais semblant d'être un grand chef de guerre. Si tu fais bien semblant, un jour tu verras, t'auras plus besoin !`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Mais moi non plus, je suis pas le chef suprême de la première puissance mondiale ! Le chef suprême de la première puissance mondiale, c'est celui qui tire les ficelles dans l'arrière-boutique ; moi je suis juste un spectacle de marionnettes. Voilà ! La petite journée désarticulée de César le pantin. Et ça se passe dans le ghetto !`,
      },
      {
        author: ['Alexandre Astier'],
        text: `[S'adressant à Arthur.] Des chefs de guerre, il y en a de toutes sortes. Des bons, des mauvais, des pleines cagettes, il y en a. Mais une fois de temps en temps, il en sort un. Exceptionnel. Un héros. Une légende. Des chefs comme ça, il n'y en a presque jamais. Mais tu sais ce qu'ils ont tous en commun ? Tu sais ce que c'est, leur pouvoir secret ? Ils ne se battent que pour la dignité des faibles.`,
      },
      {
        author: ['Alexandre Astier'],
        text: `[César offre à Arthur la bague de contrôle des lames] C'est pour t'apprendre à faire confiance à la magie... Parce qu'il n'y a que ça qui marche sur Terre, Arturus, la magie. Le reste, ça ne vaut pas un rond.`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Des gamins de partout, plein la chambre. Je sais pas... soixante, quatre-vingt. Des tout petits, de quatre ou cinq ans, et tous ensemble : "Ave votre tranquillité", alors moi comme un con : "Ave les enfants. Alors, ça vous a plu, la visite du palais ? Qu'est-ce que vous avez vu de beau ?" Euh, bref. Je raconte mes conneries habituelles, puis tout d'un coup j'en repère un, sur le devant, un petit mec, avec des mèches en pétard, et un petit paquet dans la main. On aurait dit que, il faisait la gueule. "Comment tu t'appelles ?" Ptt, pas de réponse. "Il est drôlement joli ton paquet". Oh, ni oui ni merde. "Tu veux pas me dire ce que c'est ?" "C'est un cadeau pour le général", qu'y me fait. Bah vous me croirez ou non, j'ai eu beau lui dire que c'était moi le général, y a pas eu moyen. Alors je l'ai pris tout seul avec moi, ça m'a pris la journée. J'ai montré mon uniforme, je l'ai emmené dans la salle des cartes, j'ai montré des maquettes de bateaux. Un moment il faisait presque nuit, je lui ai dit "écoute, ça va peut-être aller là, non ? Bah, tu vois quand même bien que c'est moi le général, hein, alors tu me donnes le paquet pis on n'en parle plus". Il m'a dit "d'accord". C'était des petites meringues, blanches, rondes comme ça. Ah, drôlement bonnes. On les a mangées tous les deux sur la terrasse, sans rien dire. Voilà. Si je devais choisir une journée à revivre, je prendrais celle-là.`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Pourtant on m'avait prévenu que c'était moche Kaamelott, mais franchement je m'attendais pas à ça ! [...] Ah bah c'est pas compliqué, on dirait un tas de fumier posé sur la colline.`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Ahhh, oui c'est vrai, le mariage ! Oh dis donc c'est magique hein, le mariage ! En trente secondes, on passe de fille de fermier à reine de Bretagne.`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Attention, j'ai rien contre les bouseux... D'habitude je mange pas avec, c'est tout.`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Mmh ! Bâtard ! Quand j'y pense, je crois que je préfèrerais être la tante d'un cochon pesteux.`,
      },
      {
        author: ['Alexandre Astier'],
        text: `D'ailleurs on se faisait une réflexion amusante : c'est vrai, autour de votre Table Ronde, y'a pratiquement que des connards !`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Bah oui ! Elle doit pas vous déranger beaucoup Tintagel, vous n'y foutez jamais les pieds !`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Bon encore, nous l'échange d'épouses, on était plutôt pour. (Séli : QUOI ?!) Ben oui, désolée. On préférait la noblesse du pays de Vannes aux pécores nouveaux-riches de Carmélide.`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Ah bah ! Vous croyez peut-être qu'on a besoin de vos permissions pour venir visiter le fils de Pendragon ?`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Allez, vous devriez mettre les bouts, les demi-sels ! C'est gentil d'être passés ! On va vous faire un p'tit sac avec des restes pour manger chez vous.`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Le premier truc qui frappe, c'est la langue. Vous savez ce que c'est, on arrive sur place, boum… En fait, c'est quand on commence à entendre les gens parler que là… là, on se dit : je suis pas chez moi.`,
      },
      {
        author: ['Alexandre Astier'],
        text: `[Le vieux] a essayé de me vendre un genre de turban, comme ils se mettent sur la tête, là-bas. J'ai d'abord commencé par l'envoyer chier, puis je me suis dit que ça ferait sûrement plaisir au seigneur Karadoc.`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Heureusement qu'on n'a aucune dignité… Sinon on serait bien dans la merde.|précisions=S'adressant au roi Loth et au seigneur Galessin`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Eh... Il a pas inventé le plat de la main morte, celui-là.`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Attendez faut que je fasse une multiplication par trois la ? J'espère que vous avez prévu une collation. [...] Si je la pose je vais plus vite mais c'est toujours faux.`,
      },
      {
        author: ['Alexandre Astier'],
        text: `On est pas tellement des gens de terrain nous. Après on est pas des cerveaux non plus me faites pas dire ce que j'ai pas dit`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Il faut dormir un peu, maintenant. Si si, maintenant. Parce que vous êtes fatigué. Et quand vous vous réveillerez, vous aurez oublié vos soucis.`,
      },
      {
        author: ['Alexandre Astier'],
        text: `C'est pas bien, ce que vous avez fait. On n'abandonne pas une mission sous prétexte que... (Arthur ne bronche pas d'un poil) Vous ne me voyez pas ? Houhou ! Y a quelqu'un ?... Vous ne m'entendez pas non plus ?... (Arthur ne réagit toujours pas) Si c'est comme ça, je m'en vais... (Elle disparaît. Arthur se retourne et tire la langue) ALORS ÇA C'EST VRAIMENT PAS MALIN !`,
      },
      {
        author: ['Alexandre Astier'],
        text: `J'ai dit "elle aussi" ? […] Oh, ça m'étonne, ça... Vous êtes sûr que j'ai pas dit "elle est sympa" ?`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Vous n'avez aucun courage. Aucune dignité. Votre manque de foi est en train de tout détruire.`,
      },
      {
        author: ['Alexandre Astier'],
        text: `(Terrorisée) Ils m'ont ba... Ils m'ont ba... (Arthur essaie divers mots) ILS M'ONT BANNIE !`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Au départ, je devais vous guider vers la lumière, vers le Graal. Mais vous, vous préférez n'en faire qu'à votre tête : Lancelot s'en va ? Pas grave, qu'il s'en aille ! Guenièvre part avec lui ? Eh ben qu'elle se tire, ça fera de l'air ! Il faut jamais convoiter la femme d'un autre chevalier ? Ben eh, je m'en fous, moi ! Je la convoite quand même ! Résultat : bannie ! Ah vous pouvez être fier de vous ! (elle pleure)`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Je sais ni boire, ni manger, ni m'habiller, ni me laver, ni rien ! Vous sentez que je vais être un fardeau pour vous, ou pas ?|précisions=S'adressant à Arthur.`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Vous ne voulez pas larguer votre femme illégitime et lever une armée pour aller reprendre votre femme légitime ? Honnêtement, ça m'arrangerait.`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Gardez votre épée et servez-vous en pour trouver le Graal ! [Arthur replante Excalibur]`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Hé ! Hééé ! J'suis pas une spécialiste, mais à mon avis, là, vous allez mourir, hein !`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Mille excuses... Normalement, je devrais pas dire ça à un prêtre chrétien, mais, comme vous m'avez tout l'air d'être un gros baltringue euh, je me permets ?(Père Blaise : Mmmh ?...) Vous avez oublié les alliances.`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Je préviens Monsieur et Madame que s'ils ont dans l'idée de remplacer leur hypothétique progéniture par des groupes d'amis dans le style de celui-ci ; en ce qui me concerne, y a d'la démission dans l'air.`,
      },
      {
        author: ['Alexandre Astier'],
        text: `"Ah ! Ah le con ! Ah le con, le con, le con ! Ah non mais qu'il est con ! ... Ah non mais là, ça, vous êtes spécialement con ! ... Ah non mais oui mais là... Ah le débile ! ... La différence d'âge ? Ah le petit con ! Ah oui ça suffit !`,
      },
      {
        author: ['Alexandre Astier'],
        text: `(Présentant sa nouvelle femme à Seli, Arthur et Leodagan) Ah mais non... Mais vous vous êtes encore sur l'ancienne ! […] Tout à fait, excusez-moi, j'ai pas percuté. Non non, l'autre elle est morte. Heu... Les articulations soutenaient plus son poids. Donc elle a commencé par se remplir d'eau par les coudes et après c'est passé aux chevilles, c'est remonté aux genoux et un matin, elle avait tellement gonflé que j'ai appelé la garde. Alors heu... Ils sont venus, ils lui ont mis un coup de lance et puis elle a essayé de se... de se faufiler comme ça, pour se cacher sous le buffet. Pis elle passait pas parce que bon ben... Elle avait plus conscience de sa masse donc elle est restée là, comme ça, pis... Bah six heures après, elle était crevée. Donc : la Duchesse d'Aquitaine.`,
      },
      {
        author: ['Alexandre Astier'],
        text: `(Récitant d'un ton peu convaincant) « Si c'est ma tête qui vous revient pas, vous pouvez toujours aller roupiller dans le couloir. […] Et à partir de maintenant, si j'entends un mot plus haut que l'autre je vous… renvoie dans votre bled d'at… natal à coups de pied dans… dans le fion. Comme ça vous pourrez aller ratisser la bouse et torcher le cul des poules, ça vous fera prendre l'air. »`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Non, mais on peut adapter. […] On peut dire, euh… <small>bon, je dis :</small> […] « Avec votre dégaine… euh… […] Avec votre dégaine de crevette, faites gaffe à pas vous faire bouffer par un mérou. »`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Coucou coucou !`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Si c'est le type le plus recherché du royaume c'est normal qu'il soit pas donné.`,
      },
      {
        author: ['Alexandre Astier'],
        text: `(Duchesse d'aquitaine : J'ai été insultée !) Oui bah ça va ! Vous l'avez traité de quoi ? De gredine ? (Duchesse : De pute !) Oui bon...`,
      },
      {
        author: ['Alexandre Astier'],
        text: `...surtout pour le peuple breton qui commençait sérieusement a tirer la langue.[...] En fait c'est métaphorique... ils tirent pas littéralement tous la langue. Ils sont au bout du rouleau quoi. La aussi c'est métaphorique, il y a pas littéralement un gros rouleau... Avec des gens au bout qui sont... (bégaye) Avec, Avec des gens au bout qui... `,
      },
      {
        author: ['Alexandre Astier'],
        text: `Je viens de débourser deux mille solidis pour vous éviter une mise a mort publique a Kaamelott, la moindre des choses ce serait de vous montrer un peu courtois quand je vous convie a un goûter.`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Il va lâcher deux milles raides pour acheter le type le plus recherché du royaume !`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Mais c'est pas juste, ça ! J'ai jamais porté de rose, hein. J'aime pas les fleurs, je me lave pas et je pisse dans mon armure, comme vous !`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Quoi, c'est parce que je préfère les hommes c'est ça ? À ce compte-là, faut virer Bohort aussi...`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Tapette, mais c'est qui qui se trimballe en robe à travers tout le pays ? […] Moi j'te parle p'tite fofolle !!`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Dehors le cureton ! Dehors le cureton ! (Les autres chevaliers reprennent tous ensemble avec elle)`,
      },
      {
        author: ['Alexandre Astier'],
        text: `FUMIERRRSSSSS !`,
      },
      {
        author: ['Alexandre Astier'],
        text: `ALLEZ VOUS FAIRE METTRE!`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Qu'est ce que vous allez faire ? Me foutre au cachot ?`,
      },
      {
        author: ['Alexandre Astier'],
        text: `À l'époque, tout ce qu'on voulait c'était la peau de ce fumier de Pendragon! [...] Ah bon ! Bah c'était une jolie petite salope, j'aime autant vous le dire !`,
      },
      {
        author: ['Alexandre Astier'],
        text: `J'vous dirais bien que j'vais m'tenir à carreau, mais j'me connais, j'vais tomber sur un romain, j'vais faire cramer une grange !`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Ouais non, j'suis un peu sur les nerfs en c'moment... 'Scusez moi... J'dors mal à cause de ma gangrène qui m'bouffe le pied !`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Ouais ! Qu'il y vienne patauger dans la merde !`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Nous on est Celtes ! Et on est fiers de l'être !`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Vous avez qu'à dire au pape que s'il trouve que ça traîne, il n'a qu'à venir le chercher lui-même, son gobelet à la con !`,
      },
      {
        author: ['Alexandre Astier'],
        text: `(Au Père Blaise)Il nous parle bien de travers, le cureton, aujourd'hui !`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Moi, à une époque, je voulais faire voeu de pauvreté (...) Mais avec le pognon que j'rentrais, j'arrivais pas à concilier les deux.`,
      },
      {
        author: ['Alexandre Astier'],
        text: `(A Lancelot) Han le lèche-pompe ! On vous dérange, Apollon ? C'est votre casque qui vous gêne ? `,
      },
      {
        author: ['Alexandre Astier'],
        text: `Oui... Ben non !`,
      },
      {
        author: ['Alexandre Astier'],
        text: `(A Lancelot) Et ben allez-y, recevez-le dans la merde ! Y'a pas un siège pour s'asseoir, pas un truc à lui offrir à boire (...) C'est le roi d'Orcanie quand même. C'est pas Jo le Clodo.`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Vous me faites penser à ces types qui se servent jamais en premier pour faire poli, et quand c'est à eux, ils prennent tout le fromage gratiné ; et les autres, ils sont obligés de manger le légume seul.`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Regardez-moi c'qu'on fait par ici ! J'croyais qu'c'était une fête de bourges ! Alors madame, on accueille des soldats dans ses soirées ? Des soldats sans permission ! Mais c'est qu'c'est drôlement interdit, ça ! J'allais m'envoyer la morue, là, mais c'est peut-être carrément la patronne que j'vais pouvoir m'farcir ! Oh ! Tu m'entends ?! Aconia !! Depuis 15 ans que j'rêve de t'monter dessus, c'est peut-être le moment de t'faire ma demande !`,
      },
      {
        author: ['Alexandre Astier'],
        text: `T'as pas toujours été ici, on accouche pas des gonzesses ici ! T'es né quelque part avant d'être ici !`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Tu as une permission ce soir ?(Caius : Ben oui…)Eh ben t'en as plus ! Il y a une fête Villa Aconia, on m'a demandé un service d'ordre, c'est toi qui fera les entrées... Allez barre-toi !`,
      },
      {
        author: ['Alexandre Astier'],
        text: `J'aime autant te prévenir, je suis pas dans ce qu'on pourrait appeler un bon jour.`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Ta gueule !`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Pour la dernière fois Caïus, qui m'a marravé la gueule hier soir ?`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Tu sais ce que c'est un homme en colère !`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Si je me demerde bien, alors je te promets rien hein, attention... Je devrais pouvoir t'obtenir les lions [...] Ouais si je chougne bien, si je montre ma blessure, je suis sûr que j'arrive à te faire bouffer ! Qu'est-ce que t'en penses ?`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Salustius, je l'emmerde !`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Vos gueules ! C'est une fête privée, vous êtes priés de foutre le camp !`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Pas plus haut que moi ? Dux Bellorum ? Moi je suis responsable d'une bande de glands dans une caserne pourrie. Une milice dont tout le monde se fout ! Arturus, il est chef de guerre ! Général ! Il peut rencontrer César en personne, gros taré !`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Si tu fermes pas ta gueule maintenant, je te retrograde ! [...] Je sais que tu sais pas ce que ça veut dire !`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Marre de cette compagnie de branleurs ! Marre, marre ! Et le pire de tout, c'est de me farcir ta tronche, Manilius. Alors que tu devrais être dans un lion a l'heure qu'il est !`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Remets-lui une tarte. [Maintenant?] Bah oui, pas demain !`,
      },
      {
        author: ['Alexandre Astier'],
        text: `(Aux rois assemblés :) FUMIEEEERS !!!!... Je peux en avoir un, de vos biscuits à la con ?|précisions=`,
      },
      {
        author: ['Alexandre Astier'],
        text: `(À Arthur au sujet de l'héritier) Je comprends qu'avec deux livres de viande sur l'estomac, on ne soit pas très actif dans une chambre à coucher. Ça ronfle à faire craquer le joint des murs...|précisions=`,
      },
      {
        author: ['Alexandre Astier'],
        text: `C'est justement parce que vous avez été cocollé par une lopette de jardinier que vous gouvernez comme une femme !`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Allons, je suis humilié. Moi qui croyais que le Romain respectait ses ennemis, et ben non ! En voilà encore une belle désillusion. S'ils croient que c'est avec une mentalité pareille qu'ils vont fédérer le pays, on leur rend leur fric, on remonte sur les chevaux et on leur met sur la gueule ! D'un autre côté, restituer une pareille quantité de blé, ça frise le mauvais goût... Je suis désolé, ça ne se fait pas ! Ne serait-ce par respect pour les plus nécessiteux. Bon allons, après, il y a le serment : si je garde le blé, j'attaque pas ! Et ben voilà : je garde le blé, j'attaque pas ; un serment c'est sacré. Oui mais ce qui m'ennuie, c'est que c'est pile le jour que j'avais choisi pour vous passer le pouvoir... C'est quelque chose, les dates, hein ?! Je garde le blé, j'attaque pas, je suis sous serment. Mais vous, maintenant que vous êtes roi de Carmélide, si... s'il vous prend le goût d'aller leur dérouiller le cul, je ne vois vraiment pas comment je pourrais vous en empêcher !`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Alors c'est ça, la stratégie moderne ? Réunir cinq trous-de-balle en cercle et s'balancer des fions ?`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Alors écoutez-moi bien les sent-la-pisse, vous êtes probablement en train d'insulter un roi désigné par les dieux... Et s'il y a une chose dont il ne faut pas se foutre, c'est les dieux !`,
      },
      {
        author: ['Alexandre Astier'],
        text: `(À Arthur et Guenièvre) Hé ! A l'origine j'étais sorti pour lâcher une caisse, mais quand on vous voit comme ça dans le clair de lune, on a pas envie de bousiller le tableau. J'vais aller loufer à l'intérieur pour emboucaner les autres fumiers. Profitez ! Le plus beau dans les histoires d'amour, c'est le début...`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Je vous ai passé le pouvoir, je vais pas vous le reprendre. Mais faites attention de pas devenir une tarlouze...`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Et ben vous inviterez vos copains à la maison, on vous organisera une petite après-midi à la plage et vous pourrez faire des pâtés !`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Allez ! Et si on part assez tôt, on pourra peut-être s'arrêter deux minutes si on tombe sur des champis !`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Tenez j'ai trouvé ça devant la porte[...] C'est un corbeau décédé.`,
      },
      {
        author: ['Alexandre Astier'],
        text: `J'ai rêvé qu'il y avait des scorpions qui voulaient me piquer. En plus, y en avait un il était mi-ours, mi-scorpion et re mi-ours derrière !`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Non, sans blague, Seigneur Bohort, avec tout le respect que je vous dois, la prochaine fois que je vous revois tourner autour de la chambre du roi, je vous déglingue la tête.`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Moi, un jour j'ai rêvé qu'y avait un type qui venait me voir. Il me dit : « Vous avez jamais connu vos parents ? » J'lui réponds « non ». Et là, il me dit : « Eh ben, vous inquiétez pas, ils sont fromagers. »`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Ben ils m'ont dit d'aller me faire mettre. Après, ils m'ont jeté des gadins et une marmite avec un restant de soupe de poisson.`,
      },
      {
        author: ['Alexandre Astier'],
        text: `J'ai pénétré leur lieu d'habitation de façon subrogative […] en tapinant.`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Ahhh, c'est pour ça que vous avez changé de siège, c'est parce que vous êtes pépé... Heu non, c'est parce que vous êtes roi.`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Y'a plusieurs personnes qui sont passées par votre siège là, et beeen, le tout premier, je crois qu'il s'appelait... Carbure. Ca fait vachement longtemps qu'on l'a pas vu. Moi, je serais vous, je lancerais des recherches.`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Euh, moi cette semaine j'ai rien foutu. (Léodagan : Vous voulez dire par rapport aux autres semaines ?) [...] Non, celle d'avant non plus j'ai rien foutu.`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Depuis que je suis aventurier, c'est la deuxième fois que je croise un maître du combat chinois. [...] Votre grand-mère là, c'est un maître chinois non ? [...] Pardon, j'avais l'impression parce que... elle se déplace un peu comme une mante religieuse.`,
      },
      {
        author: ['Alexandre Astier'],
        text: `L'adjectif qui me correspond le mieux, c'est : le plancton.`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Vous savez, nous autres saxons sommes très accommodants.`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Il n'y a aucun type bien autour de cette table.`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Vous vous rendez pas compte de ce que c'est les burgondes ! Déjà, c'est un miracle qu'ils soient pas tous crevés. Ils font n'importe quoi, et en plus ils sont plus qu'une poignée !`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Déjà, à la base, un Burgonde, c'est con comme une meule, alors celui-là ! Ah, vous pouvez pas savoir c'que c'est que de tomber interprète avec un engin pareil ! (bruit de pet) Tiens, vous voyez ? Toute la journée, c'est comme ça ! Il pue, il pète, il lâche des ruines ! Tiens, l'autre jour à table... Il devient tout bleu. Il était en train de s'étouffer avec un os de caille, cet abruti ! Il tousse, il crache, il re-tousse, et BINGO ! Il m'dégueule dessus ! Vous l'croyez, ça ?`,
      },
      {
        author: ['Alexandre Astier'],
        text: `La culture burgonde ? Je savais même pas qu'y en avait une… Non, moi je voulais faire grec moderne, mais y avait plus de place. Il restait que burgonde ou anglais. "Aaaaanglais" ! Mais c'est encore moins répandu !`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Nous, si vous réfléchissez bien, on a quatre bras. Avec les vôtres, ça fait six ! Posez tout ça sur le trône, imaginez un peu les possibilités…`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Peau de vache.`,
      },
      {
        author: ['Alexandre Astier'],
        text: `(Au Père Blaise) Z'êtes un glandeur. Un gros... GLANDEUR !!!`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Pour le moment je... Je m'attelle à dresser un petit portrait de la situation exacte des archives. J'ai envie de dire que le bilan est plutôt positif même si, de toute évidence, on se trouve en présence d'un classement-catalogage qui mériterait une petite optimisation mais bon... Disons qu'on peut tout trouver, à condition qu'on tombe dessus !`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Ah non ! AH NON ! On ne se vautre pas dans la bouffe, c'est INTOLÉRABLE !!! Vous allez arrrrrrêter !!!`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Ah mais vous êtes pas ma mère, hein ! Si j'ai envie de mettre des grosses morues dans mon plumard, JE FAIS CE QUE JE VEUX !!! Soyez gentille, lâchez-moi la chemise...`,
      },
      {
        author: ['Alexandre Astier'],
        text: `BANDES DE TROUS DU CUL !!!`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Mais vous êtes une grosse morue !`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Une nuit, une nuit à attendre... Une longue nuit avant de savoir si le souverain ennemi acceptera un traité de paix, si fragile, si friable qu'on aurait même de la peine à le prendre au sérieux. Des solutions précaires, du rafistolage, voilà tout ce que j'ai su inventer. La Bretagne résistait quand je suis arrivé, elle résistera encore quand je partirai. Je ne saurais dire pourquoi, je conserve encore, rescapé de mon découragement, une curiosité : existe-t-il quelqu'un parmi nous déjà - ou encore à naître - qui se destine à restaurer l'ordre sur l'île de Bretagne ? Et s'il existe, que peut-il bien posséder que je ne possède moi-même ? D'où vient-il ? Est-il romain ? Quelle arme tient-il à sa ceinture ? Celui qui vaincra là où j'ai échoué, je voudrais voir son visage une fois, car je lui conserve encore, rescapé de mon découragement, ma curiosité.`,
      },
      {
        author: ['Alexandre Astier'],
        text: `C'est tout ? Treize ans qu'ils me laissent pourrir sur pied, dans ce pays de merde ! Treize ans ! Maintenant ils m'envoient un message, il faut que je rentre chez moi ?![...] Mais qu'est ce qui leur fait croire que ça existe encore chez moi ?!! Est-ce qu'un type qui a foutu le camp treize ans peut encore avoir un chez soi ? C'est complètement absurde...`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Oh c'etait trop triste ce qu'il y avait dedans. Ça donnait une fausse image de moi. Parce que je suis d'un naturel rieur. D'après ma grand-mère en Macédoine, quand j'avais deux ans, j'étais blond, bouclé, et je souriais a tout le monde. Même aux étrangers. Toi par exemple, si tu m'avais connu quand j'avais deux ans, je t'aurais sûrement souri. Tu sais, comme j'ai détruit les tablettes, tu tomberas peut-être sur des gens qui voudront savoir comment j'étais. Dis-leur ça : blond, bouclé, toujours le sourire aux lèvres. Blond, bouclé, toujours le sourire aux lèvres... Toujours le sourire aux lèvres.`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Je voudrais, pour une fois dans ma vie, ne pas avoir l'impression de dormir dans un chenil ! […] Karadoc, soit vous montez dans ce bain, soit vous me perdez.`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Selon Karadoc, un lit n'est pas un lit s'il n'y a pas de quoi manger une semaine dedans sans en sortir.`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Une fois j'ai dormi avec un porc pendant une semaine. [Arthur: Un porc entier ?]Un porc... vivant.`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Je tiens à dire à monsieur que je suis vraiment pas contente ! J'ai longuement parlé avec mes collègues et d'après ce que j'ai compris, vous avez fait des cochonneries avec presque toutes !`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Monsieur va me faire le plaisir d'avaler son petit déjeuner et de s'occuper un peu de moi !`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Si je dis ça me dit rien, c'est que ça me dit rien. Note bien, si ça me disait, je t'enverrais chier tout pareil. Tu vois, je suis honnête.`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Les gars ! Il y aurai moyen de réduire la voilure sur la connerie ?`,
      },
      {
        author: ['Alexandre Astier'],
        text: `La ferme Aquila... [...] Mais ta gueule toi aussi ! Ils sont cons ces wisigoths ! Et après vous chouinez parce qu'on fait des blagues sur vous !`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Il vous faut du bâton dans la gueule pour amorcer le mouvement ?`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Regarde, vois ! Cette glorieuse cité cosmopolite, regarde... Carrefour des civilisations, hôtesse orgueilleuse de peuplades fascinées, regarde ! On nous reproche assez qu'il n'existe plus de vrais romains, hein ? Hein ? Allez trouve un breton, trouve.`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Ça y est ! C'est leur dernière saison aux débiles. Tu peux préparer les outils, on passe directement de la discussion à la désintégration.`,
      },
      {
        author: ['Alexandre Astier'],
        text: `(Capito : Les quatre en une seule fois, vous avez pas peur que ça soit un peu voyant non ?) Rien à foutre ! Tu peux même les crucifier sur une estrade au milieu du forum si ça te chante, c'est moi qui paie l'orchestre.`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Je vais poser une question simple : et vous, vous le méritez ? Ah non mais attendez, est-ce que vous le méritez, est-ce que vous méritez votre place ?! Lurco ! Tu devais aller en Germanie... C'est ta tante qui t'a fait entrer au sénat. Pisansius ! Pas une seule année dans la légion, pas une seule ! J'm...e demande même parfois si t'as déjà tenu une arme dans ta vie... Destisius ! C'est ton père qui a donné la moitié de ses terres pour que quelqu'un puisse prendre ta place en Afrique... C'est vrai ou c'est pas vrai ? Vous êtes tous des planqués, tous, tous, tous, tous, tous... [...] Vous allez me signer cette tablette, parce que le p'tit mérite largement son grade autant que vous vous méritez votre place au Sénat... Largement.`,
      },
      {
        author: ['Alexandre Astier'],
        text: `C'est vrai que, dans votre position, il y a plus de chance de subir un siège plutôt que d'en organiser un.`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Je suis assez grande pour voir que si vous achetez des troncs d'arbres à ce prix-là, vous êtes en train de vous faire enfler !`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Vous croyez quoi ? Que ça s'trouve dans l'cul des poules, le fric ?`,
      },
      {
        author: ['Alexandre Astier'],
        text: `(à Arthur, en le secouant) NON MAIS VOUS ALLEZ FAIRE VOTRE BOULOT, OUI ? (elle lui donne une claque, puis l'air de s'excuser) J'suis enceinte... J'suis enceinte !...`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Quand je vais raconter à mon oncle combien vous raquez pour vos béliers pourris, il va bien se marrer !`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Quoi ? Qu'est-ce qu'y a ? On cherche la marave ?`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Oh allez, mon pote ! Fais un effort ! Dans dix minutes, t'es pendu et on n'en parle plus. `,
      },
      {
        author: ['Alexandre Astier'],
        text: `D'autant que les orchestres en Bretagne, franchement, autant se frotter les noyaux avec des orties !`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Oui ... Et tu veux les jeter où, tes épluchures ? ... En Germanie ?Balance-moi tes saloperies, et radine sur le champ. PARCE-QUE QUAND je dis TOUT l'MONDE ... ET BEN C'EST TOUT L'MONDE !... Tu es gentil.`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Ça fait une demi-heure que j'essaie, j'arrive pas a le pigeonner, il voit tout.... L'oeil de taupe...`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Ah mais ouais... Ah mais bien sûr, les gars... évidemment... Nan mais allez-y, c'est mon truc les bateaux moi, je connais à mort... Allez-y hein... J'balance un caillou dans la flotte, y'en à trente qui r'montent.`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Parce que vous m'avez demandé où j'habitais avec deux tartes dans le museau. Alors moi, comme j'habite nulle part parce que je me considère comme un papillon, je vous ai parlé d'une fille chez qui j'allais souvent.`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Bah vu que je mange des tartes depuis ce midi, je commence a me faire une bonne idée, ouais...`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Vous avez de la chance que je ne supporte pas qu'on porte préjudice a l'intégrité physique de ma personne.`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Ah ouais non mais attends, c'est du joli boulot là, les p'tits sacripants... Oui, sacripants, oui. C'est un terme un peu craignos. D'ailleurs, ben voilà, même craignos, c'est craignos. Mais c'est parce que je suis choqué ! Qu'est-ce que j'entends ? Tu demandes en mariage une personne âgée ? Et la p'tite Julia alors, dans tout ça ? Ah il faut que j'm'en occupe tout seul, c'est ça ? Ah très bien... Merci les p'tits fripons... Tiens, ça aussi, c'est un peu craignos, tu vois ? Mais c'est parce que là ouuuh ! Et bravo général, beau boulot ! Ah les pots cassés, c'est Verinus qui répare les pots cassés tout simplement... Ok d'accord, très bien...`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Y'a un truc quand même qu'il faut que vous compreniez bien les gars… Si vous voulez, moi, à la base… j'suis une balance… C'est le postulat de départ, on a devant soi, une balance. Donc une personne, si vous voulez, qu'on n'a pas besoin de cogner, puisque elle vient elle-même délivrer l'information, sans que vous ayez même à la demander. Parce que non, pourquoi j'vous dis ça ? Puisque… on est quand même à une heure et demie de marrons dans la gueule là… Et si j'vous dis que je ne sais rien, c'est que je pense qu'effectivement…(Procyon le frappe)Pfff… Je n'sais rien…`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Ben dis donc, j'sais pas c'que c'est « la pire », mes p'tits cousins, mais j'peux vous garantir que, vu d'ici, ça fout les boules, hein… Ouuuh… Non, parce que, quand il a dit euh… Plusieurs options, j'ai fait toute une série de p'tits pets comme ça, pou, pou, pou...`,
      },
      {
        author: ['Alexandre Astier'],
        text: `Du temps de Pendragon, on avait le sens du dramatique : le Lac, Stonehenge, Avalon… Maintenant, dès qu'ils croisent un dragon, ils font un meeting.`,
      },
      {
        author: ['Lionnel Astier'],
        text: `(À propos du chateau de Kaamelott) Vulgaire ? Oui... Mais pas seulement.`,
      },
      {
        author: ['Lionnel Astier'],
        text: `[Arthur : Vous mangez à quelle heure, vous, à Tintagel ?] À Tintagel, on mange quand on l'a mérité, quand on sait qu'on a accompli ses commandements avec humilité et qu'on a glorifié sa famille ! [Arthur : Oui... Non, nous, on mange quand on a faim.]`,
      },
      {
        author: ['Lionnel Astier'],
        text: `(En parlant d'Arthur et en le regardant d'un air narquois) Au cas où il aurait une petite « faim-faim » !?`,
      },
      {
        author: ['Alexandre Astier'],
        text: `(À Arthur) Dîtes tout de suite que vous avez honte de votre éducation.`,
      },
      {
        author: ['Lionnel Astier'],
        text: `Mais je vous empêche pas de faire la guerre, mais vous la ferez guéri !`,
      },
      {
        author: ['Lionnel Astier'],
        text: `Allez-y ! Défilez, les petites fourmis. Mettez-vous bien en rang... Venez mesurer votre risible destin à celui des Pendragon... Venez constater la navrante insignifiance de vos existences. Vous avez pensé que les dieux allaient enfin reconnaitre en vous le souverain que personne n'avait vu ? Que vous alliez enfin donner au monde le spectacle de votre avènement ? Quel roi suis-je ? Un roi sévère ? Un roi conquérant ?Vous n'êtes rien... RIEN ! Vous retournerez chez vous comme vous en êtes partis... ANONYMES ! Paisiblement, mon fils viendra reprendre ce qui est à lui... Et vous mettrez un genou en terre. Et vous baisserez les yeux. Et vous jurerez fidélité. Car c'est tout ce qu'il vous reste !`,
      },
      {
        author: ['Lionnel Astier'],
        text: `Vous êtes des porcs !`,
      },
    ];

    const citationsAuthors = authorTextList.flatMap((item) => {
      const citationId = citationsMap[item.text];
      const authorIds = item.author.map((item) => authorsMap[item]);
      return authorIds.map((authorId) => ({
        citationId,
        authorId,
      }));
    });

    for (const citationAuthor of citationsAuthors) {
      await queryRunner.query(
        `INSERT INTO "citation_author" ("citationId", "authorId")
        VALUES ($1, $2)`,
        [citationAuthor.citationId, citationAuthor.authorId],
      );

      console.log('✅ Association citation author insérées');
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DELETE FROM "citation_author"
    `);

    console.log('🗑️ Association citation author supprimés');
  }
}
