import {SpellActive} from "@/game/actives/SpellActive";
import {Game} from "@/game/Game";
import {vue} from "@/main";
import {spellActiveInfo} from "@/helpers/game";
import {ActionInterfaceType} from "@/constants/constants";
import {HumanForm} from "@/game/games/game1/spells/HumanForm";
import {Kitsune} from "@/game/games/game1/heroes/Kitsune";

export class Illusion extends SpellActive {
    constructor(ownerId: number) {
        super('illusion.name', ownerId);
    }

    getDescription() {
        return spellActiveInfo(vue.$t('illusion.name'), vue.$t('illusion.description'), this.reload)
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
        Game.game.stun(targetId, 1);
    }
}