import {GameObject} from "@/game/game-object/GameObject";
import {Game} from "@/game/Game";
import {ActionInterfaceType} from "@/constants/constants";
import {Kitsune} from "@/game/games/game1/heroes/Kitsune";
import {vue} from "@/main";
import {WonderfulWine} from "@/game/games/game1/items/WonderfulWine";
import {Guard} from "@/game/games/game1/npc/Guard";
import {Sasuke as SasukeNpc} from "@/game/games/game1/npc/Sasuke";
import {Game1} from "@/game/games/game1/Game1";

export class Sasuke extends GameObject {
    haveVine: Boolean = true;

    constructor(zoneId: number, locationId: number) {
        super('story1.sasuke.name', 3, zoneId, locationId);
        this.icon = 'game1/npc/sasuke.jpg';
    }

    actions(): ActionInterfaceType[] {
        const actions: ActionInterfaceType[] = [];
        const currHero = Game.game.currentHero();

        if (currHero) {
            if (Game.game.haveHeroEnemiesInLocation(currHero.id)) {
                return actions;
            }

            if (Kitsune.checkKitsuneHuman(currHero) && this.mauriVine()) {
                actions.push({
                    name: 'give_wine',
                    action: () => this.takeVine(),
                });
            } else {
                actions.push({
                    name: 'attract_attention',
                    action: () => this.fight(),
                });
            }
        }

        return actions;
    }

    mauriVine() {
        const currHero = Game.game.currentHero();
        if (currHero && Kitsune.checkKitsuneHuman(currHero)) {
            return currHero.items.find(it => it instanceof WonderfulWine);
        }
        return undefined;
    }

    takeVine() {
        Game.game.heroAction(() => {
            const game1 = Game.game as Game1;
            if (game1.locationToilet) {
                game1.addMessage(vue.$t('sasuke_vine'));
                new SasukeNpc(game1.zoneIdCastle, game1.locationToilet.id);
                game1.locationToilet.setOpen(true);
                game1?.heroMauri?.removeItemByClass(WonderfulWine);
                this.remove();
            }
        });
    }

    fight() {
        Game.game.heroAction(() => {
            Game.game.addMessage(vue.$t('sasuke_fight'));
            for (var i = 0; i < 3; i++) {
                Game.game.addEnemyPreparationForBattle(new Guard(this.zoneId, this.locationId));
            }
            Game.game.addEnemyPreparationForBattle(new SasukeNpc(this.zoneId, this.locationId));
            this.remove();
        });
    }
}