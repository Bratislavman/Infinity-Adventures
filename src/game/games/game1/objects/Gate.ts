import {GameObject} from "@/game/game-object/GameObject";
import {Game} from "@/game/Game";
import {ActionInterfaceType} from "@/constants/constants";
import {Kitsune} from "@/game/games/game1/heroes/Kitsune";
import {Warrior} from "@/game/games/game1/heroes/Warrior";
import {vue} from "@/main";
import {Guard} from "@/game/games/game1/npc/Guard";
import {Game1} from "@/game/games/game1/Game1";
import {ConditionVictory} from "@/game/games/game1/constants";
import {Luck} from "@/game/games/game1/spells/Luck";

const hero_enter_castle = 'hero_enter_castle';
const hero_out_castle = 'hero_out_castle';

export class Gate extends GameObject {
    moveLocationId: number = 0;
    isOuterDoor: boolean;
    guardsCaused: boolean = false;

    constructor(zoneId: number, locationId: number, moveLocationId: number, isOuterDoor: boolean = false) {
        super('gate', 3, zoneId, locationId);
        this.icon = 'game1/objects/gate.jpg';
        this.moveLocationId = moveLocationId;
        this.isOuterDoor = isOuterDoor;
    }

    actions(): ActionInterfaceType[] {
        const currHero = Game.game.currentHero();
        const actions: ActionInterfaceType[] = [];

        if (currHero) {
            if (Game.game.haveHeroEnemiesInLocation(currHero.id)) {
                return actions;
            }

            //если дверь замка внутренняя, то просто выходим из замка
            if (this.isOuterDoor) {
                actions.push({name: 'castle_exit', action: () => this.exit()});
            } else {
                //если враги не вызваны
                if (!this.guardsCaused) {
                    actions.push({name: 'gate_storm', action: () => this.storm()});

                    //кицуне сможет поговорит ток человекм и её пропустят
                    if (currHero instanceof Kitsune) {
                        const action = {name: 'be_asked_to_enter', action: () => this.enter()};
                        currHero.disabledActionForKitsune(action);
                        actions.push(action);
                    }

                    if (currHero instanceof Warrior) {
                        actions.push({name: 'be_asked_to_enter', action: () => this.enterWarrior()});
                    }
                }
                //иначе враги уже убиты и можно просто войти
                else {
                    actions.push({name: 'enter', action: () => this.enter()});
                }
            }
        }
        return actions;
    }

    move(text: string = hero_enter_castle) {
        const currHero = Game.game.currentHero();
        if (currHero) {
            Game.game.moveCurrentHero(this.moveLocationId);
            Game.game.addMessage(vue.$t(text, {hero: vue.$t(currHero.name)}));
            if (text === hero_enter_castle) {
                Game.game.addMessage(vue.$t('warning_castle'));
            }
        }
    }

    exit() {
        Game.game.heroAction(() => {
            const currHero = Game.game.currentHero();
            if (currHero) {
                this.move(hero_out_castle);
                const game1 = Game.game as Game1;
                // если дате получил по морде и бесмертие разрушено, то выплняем квест побега(для дате и кицен отдельно)
                if (game1.checkCompleteQuestImmortalAndSasukePunch()) {
                    if (currHero instanceof Kitsune) {
                        game1.statusGameConditionDone(ConditionVictory.EscapeMauri)
                    }
                    if (currHero instanceof Warrior) {
                        game1.statusGameConditionDone(ConditionVictory.EscapeDate)
                    }
                }
            }
        });
    }

    enter() {
        Game.game.heroAction(() => {
            this.move();
        });
    }

    enterWarrior() {
        Game.game.heroAction(() => {
            if (Game.game.chanceCheck(50)) {
                Luck.luck();
                Game.game.addMessage(vue.$t('date_fanat'));
                this.move();
            } else {
                Game.game.addMessage(vue.$t('date_cancel'));
            }
        });
    }

    storm(): void {
        Game.game.heroAction(() => {
            Game.game.addMessage(vue.$t('guard_drives_away'));
            for (var i = 0; i < 3; i++) {
                Game.game.addEnemyPreparationForBattle(new Guard(this.zoneId, this.locationId));
            }
            this.guardsCaused = true;
        });
    }
}