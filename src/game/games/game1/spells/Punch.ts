import {vue} from "@/main";
import {spellActiveInfo} from "@/helpers/game";
import {SpellActive} from "@/game/actives/SpellActive";
import {Game} from "@/game/Game";
import {Sasuke} from "@/game/games/game1/npc/Sasuke";
import {ConditionVictory} from "@/game/games/game1/constants";

export class Punch extends SpellActive {
    constructor(ownerId: number) {
        super('punch.name', ownerId, 3);
    }

    getDescription() {
        return spellActiveInfo(vue.$t('punch.name'), vue.$t('punch.description'), this.reload)
    }

    action(targetId: number) {
        super.action(targetId);
        Game.game.attack(targetId, 1);
        Game.game.stun(targetId, 2);

        const sasuke = Game.game.getGameObjectById(targetId);
        if (sasuke instanceof Sasuke) {
            Game.game.statusGameConditionDone(ConditionVictory.SasukePunch);
        }
    }
}