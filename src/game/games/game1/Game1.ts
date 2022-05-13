import {Game} from "@/game/Game";
import {Zone} from "@/game/Zone";
import {Location} from "@/game/location/Location";
import {Kitsune} from "@/game/games/game1/heroes/Kitsune";
import {Warrior} from "@/game/games/game1/heroes/Warrior";
import {Gate} from "@/game/games/game1/objects/Gate";
import {Character} from "@/game/game-object/Character";
import {vue} from "@/main";
import {ConditionDefeat, ConditionVictory} from "@/game/games/game1/constants";
import {CharacterBehaviorTypes} from "@/constants/constants";
import {Luck} from "@/game/games/game1/spells/Luck";
import {GameObject} from "@/game/game-object/GameObject";
import {Guard} from "@/game/games/game1/npc/Guard";
import {Gunsmith} from "@/game/games/game1/objects/Gunsmith";
import {Maid} from "@/game/games/game1/objects/Maid";
import {ChefsTable} from "@/game/games/game1/objects/СhefsTable";
import {Sasuke as SasukeObj} from "@/game/games/game1/objects/Sasuke";
import {Sasuke} from "@/game/games/game1/npc/Sasuke";
import {Treasury} from "@/game/games/game1/objects/Treasury";
import {JadeGuard} from "@/game/games/game1/npc/JadeGuard";
import {Casket} from "@/game/games/game1/objects/Casket";
import {Shoukou} from "@/game/games/game1/objects/Shoukou";

export class Game1 extends Game {
    haveQuestsEscape: boolean = false;
    zoneIdCastle: number = 0;
    zoneIdStreet: number = 0;
    locationToilet: Location | null = null;

    zoneIdShoukou: number = 0;
    locationShoukou: Location | null = null;

    heroMauri: Kitsune | null = null;
    heroDate: Warrior | null = null;

    constructor() {
        super('story1.name', 'story1.description', 'game1/background.jpg');

        this.gameVictoryText = 'story1.happy_end';
        this.statusGameConditionVictory = this.createStatusGameConditions([
            ConditionVictory.SasukePunch,
            ConditionVictory.ShoukouMortal,
        ]);
        this.statusGameConditionDefeat = this.createStatusGameConditions([
            ConditionDefeat.HeroDeath,
            ConditionDefeat.SasukeDeathBeforePunch,
        ]);

        const zone1Loc001 = new Location(true);
        const zone1Loc002 = new Location();
        const zone1Loc003 = new Location();
        const zone1Loc004 = new Location();
        const zone1Loc005 = new Location();
        const zone1Loc006 = new Location();
        const zone1Loc007 = new Location();
        const zone1Loc008 = new Location();
        const zone2Loc001 = new Location();
        const zone2Loc002 = new Location();
        const zone2Loc003 = new Location();
        const zone2Loc004 = new Location();
        const zone2Loc006 = new Location();
        const zone2Loc007 = new Location();
        const zone2Loc008 = new Location();
        const zone2Loc009 = new Location();
        const zone2Loc010 = new Location();
        const zone2Loc011 = new Location();
        const zone2Loc012 = new Location();
        const zone2Loc013 = new Location();
        const zone2Loc014 = new Location();
        const zone2Loc015 = new Location();
        const zone2Loc016 = new Location();

        const zone1 = new Zone([
            [zone1Loc001, zone1Loc002, zone1Loc003],
            [zone1Loc004, this.crEL(), zone1Loc005],
            [zone1Loc006, zone1Loc007, zone1Loc008],
        ]);
        this.zoneIdStreet = zone1.id;

        const zone2 = new Zone([
            [this.crEL(), this.crEL(), zone2Loc001, this.crEL(), this.crEL()],
            [this.crEL(), zone2Loc002, zone2Loc003, zone2Loc004, this.crEL()],
            [zone2Loc006, zone2Loc007, zone2Loc008, zone2Loc009, zone2Loc010],
            [this.crEL(), zone2Loc011, zone2Loc012, zone2Loc013, this.crEL()],
            [this.crEL(), this.crEL(), zone2Loc014, zone2Loc015, zone2Loc016],
        ]);
        this.zoneIdCastle = zone2.id;
        this.locationToilet = zone2Loc016;
        this.zoneIdShoukou = zone2.id;
        this.locationShoukou = zone2Loc008;

        //OBJECTS
        //zone1
        new Gate(zone1.id, zone1Loc002.id, zone2Loc001.id);
        new Gate(zone1.id, zone1Loc004.id, zone2Loc006.id);
        new Gate(zone1.id, zone1Loc007.id, zone2Loc014.id);
        new Gate(zone1.id, zone1Loc005.id, zone2Loc010.id);

        //zone2
        new Gate(zone2.id, zone2Loc001.id, zone1Loc002.id, true);
        new Gate(zone2.id, zone2Loc006.id, zone1Loc004.id, true);
        new Gate(zone2.id, zone2Loc014.id, zone1Loc007.id, true);
        new Gate(zone2.id, zone2Loc010.id, zone1Loc005.id, true);

        new Gunsmith(zone2.id, zone2Loc011.id);

        new Maid(zone2.id, zone2Loc013.id);
        new ChefsTable(zone2.id, zone2Loc013.id);

        new SasukeObj(zone2.id, zone2Loc015.id);

        new Shoukou(zone2.id, zone2Loc008.id);
        for (var i = 0; i < 3; i++) {
            new Guard(zone2.id, zone2Loc008.id);
        }

        new Treasury(zone2.id, zone2Loc004.id);
        for (var i = 0; i < 3; i++) {
            new Guard(zone2.id, zone2Loc004.id);
        }

        //ГЕРОИ
        this.heroMauri = new Kitsune(zone1.id, zone1Loc001.id);
        this.heroDate = new Warrior(zone1.id, zone1Loc001.id);
        // this.heroMauri = new Kitsune(zone2.id, zone2Loc008.id);
        // this.heroDate = new Warrior(zone2.id, zone2Loc008.id);
        this.addHeroes(
            [
                this.heroMauri,
                this.heroDate,
            ]
        );
    }

    enemiesForAttackNPC(enemies: Character[]): Character[] {
        const enemiesForAttack = super.enemiesForAttackNPC(enemies);
        enemies.forEach(obj => {
            if (obj instanceof Kitsune && Game.game.chanceCheck(60)) {
                Game.game.addMessage(vue.$t('kitsune_charm.charm'));
            } else {
                enemiesForAttack.push(obj);
            }
        });
        return enemiesForAttack;
    }

    unitDied(unit: Character) {
        if (unit instanceof Sasuke && this.statusGameConditionNotDone(ConditionVictory.SasukePunch)) {
            this.statusGameConditionDone(ConditionDefeat.SasukeDeathBeforePunch, false);
        }
        if (unit.behaviorType === CharacterBehaviorTypes.Hero) {
            this.statusGameConditionDone(ConditionDefeat.HeroDeath, false);
        }
        if (unit instanceof JadeGuard) {
            const zoneId = this.zoneIdShoukou;
            const location = this.locationShoukou;
            if (zoneId && location) {
                new Casket(zoneId, location.id);
                Game.game.addMessage(vue.$t('shoukou_mega_guard_death'));
            }
        }
    }

    watcherGameStatusAddQuestions() {
        //даём тут квесты сбежать из замка по отдельности когда задания выполнены
        if (!this.haveQuestsEscape && this.checkCompleteQuestImmortalAndSasukePunch()) {
            this.statusGameConditionVictory.push(
                this.createStatusGameCondition(ConditionVictory.EscapeDate),
                this.createStatusGameCondition(ConditionVictory.EscapeMauri)
            );
            this.haveQuestsEscape = true;
        }
    }

    escapeHeroCheck(obj: GameObject) {
        const objIsDate = obj instanceof Warrior;
        const chance = objIsDate ? 60 : 30;
        if (this.chanceCheck(chance)) {
            if (objIsDate) {
                Luck.luck();
            }
            return true;
        }
        return false;
    }

    eventsCharacterMoveAfter(obj: GameObject) {
        //если в локации замка нет любых врагов, то проверяем появление стража
        if (!this.haveHeroEnemiesInLocation(obj.id, false) && obj.zoneId === this.zoneIdCastle) {
            let createGuard = false;

            if (this.chanceCheck(30)) {
                if (obj instanceof Warrior) {
                    if (this.chanceCheck(60)) {
                        Luck.luck();
                        this.addMessage(vue.$t('guard_fail_walked_to_date'));
                    } else {
                        createGuard = true;
                    }
                }
                if (obj instanceof Kitsune && !obj.isHuman() && this.chanceCheck(30)) {
                    createGuard = true;
                }
            }

            if (createGuard) {
                this.addMessage(vue.$t('guard_walked_to_hero', {hero: vue.$t(obj.name)}));
                this.addEnemyPreparationForBattle(new Guard(obj.zoneId, obj.locationId));
            }
        }
    }

    //если маюри и дате в одной локации
    mauriAndDateTogether() {
        const date = this.heroes.find(h => h instanceof Warrior);
        const mauri = this.heroes.find(h => h instanceof Kitsune);
        return date && mauri && date.locationId === mauri.locationId && date.zoneId === mauri.zoneId;
    }

    //когда основне кувесты выполнены
    checkCompleteQuestImmortalAndSasukePunch() {
        return this.statusGameConditionIsDone(ConditionVictory.SasukePunch) && this.statusGameConditionIsDone(ConditionVictory.ShoukouMortal)
    }
}