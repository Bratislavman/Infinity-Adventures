import {GameObject} from "@/game/game-object/GameObject";
import {Game} from "@/game/Game";
import {ActionInterfaceType} from "@/constants/constants";
import {Kitsune} from "@/game/games/game1/heroes/Kitsune";
import {vue} from "@/main";
import {Maid} from "@/game/games/game1/objects/Maid";
import {Game1} from "@/game/games/game1/Game1";
import {GunShell} from "@/game/games/game1/items/GunShell";
import {WonderfulWine} from "@/game/games/game1/items/WonderfulWine";

export class ChefsTable extends GameObject {
    haveVine: Boolean = true;

    constructor(zoneId: number, locationId: number) {
        super('chefs_table', 3, zoneId, locationId);
        this.icon = 'game1/objects/chefs_table.jpg';
    }

    actions(): ActionInterfaceType[] {
        const actions: ActionInterfaceType[] = [];
        const currHero = Game.game.currentHero();

        if (currHero) {
            if (Game.game.haveHeroEnemiesInLocation(currHero.id)) {
                return actions;
            }

            if (this.haveVine && Maid.maidSecret && currHero instanceof Kitsune) {
                actions.push({
                    name: 'take_vine',
                    action: () => this.takeVine(),
                    disabled: currHero.isKitsune()
                });
            }
        }

        return actions;
    }

    takeVine() {
        Game.game.heroAction(() => {
            this.haveVine = false;
            const game1 = Game.game as Game1;
            const mauri = game1.heroMauri;
            if (mauri) {
                mauri.items.push(new WonderfulWine(mauri.id));
                Game.game.addMessage(vue.$t('mauri_get_wine'));
            }
        });
    }
}