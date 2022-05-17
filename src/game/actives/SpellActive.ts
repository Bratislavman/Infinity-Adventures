import {Activ} from "@/game/actives/Activ";
import {ActionInterfaceType, TextType} from "@/constants/constants";
import {Game} from "@/game/Game";

export class SpellActive extends Activ {
    reload: number = 0;
    reloadCounter: number;

    constructor(name: string, ownerId: number, reloadCounter: number = 1, numberTargets: number = 1) {
        super(name, ownerId, numberTargets);
        this.reloadCounter = reloadCounter;
    }

    getDescription(): TextType {
        return '';
    }

    haveNearEnemiesAndCannotUseSpell(): boolean {
        const owner = this.getOwner();
        return !!owner && Game.game.haveHeroEnemiesInLocation(owner.id);
    }

    initForAction(action: ActionInterfaceType) {
        super.initForAction(action);
        action.reload = this.reload;
        action.disabled = this.reload > 0;
    }

    action(targetId: number) {
        super.action(targetId);
        this.reload = this.reloadCounter;
    }
}