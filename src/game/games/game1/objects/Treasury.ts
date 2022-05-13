import {GameObject} from "@/game/game-object/GameObject";
import {ActionInterfaceType} from "@/constants/constants";
import {Game} from "@/game/Game";
import {Kitsune} from "@/game/games/game1/heroes/Kitsune";
import {vue} from "@/main";
import {Guard} from "@/game/games/game1/npc/Guard";
import {Warrior} from "@/game/games/game1/heroes/Warrior";
import {MagickKey} from "@/game/games/game1/items/MagickKey";
import {Luck} from "@/game/games/game1/spells/Luck";

enum KeyStatusType {
    NotFound = 'magick_key_not_found',
    Founded = 'magick_key_founded',
    Taken = 'magick_key_taken',
}

export class Treasury extends GameObject {
    keyStatus: KeyStatusType = KeyStatusType.NotFound;

    constructor(zoneId: number, locationId: number) {
        super('treasury', 3, zoneId, locationId);
        this.icon = 'game1/objects/treasury.jpg';
    }

    actions(): ActionInterfaceType[] {
        const currHero = Game.game.currentHero();
        const actions: ActionInterfaceType[] = [];

        if (currHero) {
            if (Game.game.haveHeroEnemiesInLocation(currHero.id) || this.keyStatus === KeyStatusType.Taken) {
                return actions;
            }

            if (this.keyStatus === KeyStatusType.NotFound) {
                const action = {name: 'treasury_find', action: () => this.findKey()};
                Kitsune.disabledActionForKitsuneGlobal(currHero, action);
                actions.push(action);
            } else if (this.keyStatus === KeyStatusType.Founded) {
                const action = {name: 'treasury_get_key', action: () => this.getKey()};
                Kitsune.disabledActionForKitsuneGlobal(currHero, action);
                actions.push(action);
            }
        }

        return actions;
    }


    findKey() {
        Game.game.heroAction(() => {
            const currHero = Game.game.currentHero();
            if (currHero) {
                if (Game.game.chanceCheck(currHero instanceof Warrior ? 60 : 30)) {
                    if (currHero instanceof Warrior) {
                        Luck.luck();
                    }
                    Game.game.addMessage(vue.$t('treasury_key_founded'));
                    this.keyStatus = KeyStatusType.Founded;
                } else {
                    Game.game.addMessage(vue.$t('treasury_alarm'));
                    for (let i = 0; i < 3; i++) {
                        Game.game.addEnemyPreparationForBattle(new Guard(this.zoneId, this.locationId));
                    }
                }
            }
        });
    }

    getKey() {
        Game.game.heroAction(() => {
            const currHero = Game.game.currentHero();
            if (currHero) {
                if (currHero instanceof Warrior) {
                    Game.game.addMessage(vue.$t('treasury_key_taken_date'));
                } else {
                    Game.game.addMessage(vue.$t('treasury_key_taken_kitsune'));
                    currHero.items.push(new MagickKey(currHero.id));
                    this.keyStatus = KeyStatusType.Taken;
                }
            }
        });
    }
}