import {GameObject} from "@/game/game-object/GameObject";
import {Game} from "@/game/Game";
import {ActionInterfaceType} from "@/constants/constants";
import {Game1} from "@/game/games/game1/Game1";
import {vue} from "@/main";
import {MagickKey} from "@/game/games/game1/items/MagickKey";
import {ConditionVictory} from "@/game/games/game1/constants";

export class Casket extends GameObject {
    constructor(zoneId: number, locationId: number) {
        super('shoukou_casket', 3, zoneId, locationId);
        this.icon = 'game1/objects/casket.jpg';
    }

    actions(): ActionInterfaceType[] {
        const actions: ActionInterfaceType[] = [];
        const currHero = Game.game.currentHero();
        if (currHero) {
            if (Game.game.haveHeroEnemiesInLocation(currHero.id)) {
                return actions;
            }
            actions.push({
                name: 'shoukou_open_magick_box_open',
                action: () => this.open(),
                disabled: currHero.notItemByClass(MagickKey)
            });
        }
        return actions;
    }

    open() {
        Game.game.heroAction(() => {
            const game1 = Game.game as Game1;
            const mauri = game1.heroMauri;
            if (mauri) {
                Game.game.addMessage(vue.$t('shoukou_clear_magick'));
                mauri.removeItemByClass(MagickKey);
                game1.statusGameConditionVictory.push(
                    game1.createStatusGameCondition(ConditionVictory.EscapeDate),
                    game1.createStatusGameCondition(ConditionVictory.EscapeMauri),
                );
                this.remove();
            }
        })
    }
}