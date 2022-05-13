import {GameObject} from "@/game/game-object/GameObject";
import {Game} from "@/game/Game";
import {ActionInterfaceType} from "@/constants/constants";
import {Game1} from "@/game/games/game1/Game1";
import {vue} from "@/main";
import {Guard} from "@/game/games/game1/npc/Guard";
import {JadeGuard} from "@/game/games/game1/npc/JadeGuard";

export class Shoukou extends GameObject {
    constructor(zoneId: number, locationId: number) {
        super('story1.shoukou.name', 3, zoneId, locationId);
        this.icon = 'game1/npc/shoukou.jpg';
    }

    actions(): ActionInterfaceType[] {
        const actions: ActionInterfaceType[] = [];
        const currHero = Game.game.currentHero();
        if (currHero) {
            if (Game.game.haveHeroEnemiesInLocation(currHero.id)) {
                return actions;
            }
            actions.push({name: 'shoukou_attack', action: () => this.attack()});
        }
        return actions;
    }

    attack() {
        Game.game.heroAction(() => {
            const game1 = Game.game as Game1;
            if (game1.mauriAndDateTogether()) {
                Game.game.addMessage(vue.$t('shoukou_attack_text_success'));
                for (var i = 0; i < 3; i++) {
                    Game.game.addEnemyPreparationForBattle(new Guard(this.zoneId, this.locationId));
                }
                Game.game.addEnemyPreparationForBattle(new JadeGuard(this.zoneId, this.locationId));
                this.remove();
            } else {
                Game.game.addMessage(vue.$t('shoukou_attack_text_fail'));
            }
        })
    }
}