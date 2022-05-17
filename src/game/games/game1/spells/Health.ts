import {vue} from "@/main";
import {spellActiveInfo} from "@/helpers/game";
import {SpellActive} from "@/game/actives/SpellActive";
import {Game} from "@/game/Game";
import {ActionInterfaceType, ActivTargetType} from "@/constants/constants";
import {Kitsune} from "@/game/games/game1/heroes/Kitsune";

export class Health extends SpellActive {
    constructor(ownerId: number) {
        super('health.name', ownerId, 3);
    }

    init() {
        this.targetType = ActivTargetType.Hero;
    }

    getDescription() {
        return spellActiveInfo(vue.$t('health.name'), vue.$t('health.description'), this.reload);
    }

    initForAction(action: ActionInterfaceType) {
        super.initForAction(action);
        const owner = this.getOwner();
        if (owner) {
            (owner as Kitsune).disabledActionForHuman(action)
        }
    }

    action(targetId: number) {
        super.action(targetId);
        Game.game.health(targetId, 3);
    }
}