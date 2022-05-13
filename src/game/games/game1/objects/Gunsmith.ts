import {GameObject} from "@/game/game-object/GameObject";
import {Game} from "@/game/Game";
import {ActionInterfaceType} from "@/constants/constants";
import {Kitsune} from "@/game/games/game1/heroes/Kitsune";
import {Warrior} from "@/game/games/game1/heroes/Warrior";
import {vue} from "@/main";
import {Game1} from "@/game/games/game1/Game1";
import {GunShell} from "@/game/games/game1/items/GunShell";

export class Gunsmith extends GameObject {
    gaveNuclei: boolean = false;

    constructor(zoneId: number, locationId: number) {
        super('gunsmith', 3, zoneId, locationId);
        this.icon = 'game1/npc/guard.jpg';
    }

    actions(): ActionInterfaceType[] {
        const currHero = Game.game.currentHero();
        const actions: ActionInterfaceType[] = [];

        if (currHero) {
            if (Game.game.haveHeroEnemiesInLocation(currHero.id)) {
                return actions;
            }

            if (!this.gaveNuclei) {
                if (currHero instanceof Warrior) {
                    actions.push({name: 'ask_for_a_weapon', action: () => this.droveDate()});
                }
                if (currHero instanceof Kitsune) {
                    actions.push({
                        name: 'ask_for_a_weapon',
                        action: () => this.giveNucleiMauri(),
                        disabled: currHero.isKitsune()
                    });
                }
            }
        }

        return actions;
    }

    droveDate() {
        Game.game.heroAction(() => {
            Game.game.addMessage(vue.$t('gunsmith_drove_date'));
        });
    }

    giveNucleiMauri() {
        Game.game.heroAction(() => {
            const game1 = Game.game as Game1;
            let text = 'gunsmith_did_not_nuclei';
            if (game1.mauriAndDateTogether()) {
                text = 'gunsmith_give_nuclei_date';
                const date = game1.heroDate;
                if (date) {
                    date.items.push(new GunShell(date.id, 3));
                }
                this.gaveNuclei = true;
            }
            Game.game.addMessage(vue.$t(text));
        });
    }
}