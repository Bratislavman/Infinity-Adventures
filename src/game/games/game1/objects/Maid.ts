import {GameObject} from "@/game/game-object/GameObject";
import {Game} from "@/game/Game";
import {ActionInterfaceType} from "@/constants/constants";
import {Kitsune} from "@/game/games/game1/heroes/Kitsune";
import {vue} from "@/main";

export class Maid extends GameObject {
    static maidSecret: Boolean = false;
    maidTrust: Boolean = false;

    constructor(zoneId: number, locationId: number) {
        super('maid', 3, zoneId, locationId);
        this.icon = 'game1/npc/maid.jpg';
    }

    actions(): ActionInterfaceType[] {
        const actions: ActionInterfaceType[] = [];
        const currHero = Game.game.currentHero();

        if (currHero) {
            if (Game.game.haveHeroEnemiesInLocation(currHero.id) || Maid.maidSecret) {
                return actions;
            }

            if (currHero instanceof Kitsune) {
                actions.push({
                    name: this.maidTrust ? 'talk_maid2' : 'talk_maid1',
                    action: () => this.talk(),
                    disabled: currHero.isKitsune()
                });
            }
        }

        return actions;
    }

    talk() {
        Game.game.heroAction(() => {
            if (this.maidTrust) {
                Game.game.addMessage(vue.$t('talk_maid2_text'));
                Maid.maidSecret = true;
            } else {
                this.maidTrust = true;
                Game.game.addMessage(vue.$t('talk_maid1_text'));
            }
        });
    }
}