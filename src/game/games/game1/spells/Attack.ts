import {SpellActive} from "@/game/actives/SpellActive";
import {Game} from "@/game/Game";
import {vue} from "@/main";
import {spellActiveInfo} from "@/helpers/game";
import {Luck} from "@/game/games/game1/spells/Luck";

export class Attack extends SpellActive {
    constructor(ownerId: number) {
        super('attack.name', ownerId, 1);
    }

    getDescription() {
        return spellActiveInfo(vue.$t('attack.name'), vue.$t('attack.description'), this.reload)
    }

    action(targetId: number) {
        super.action(targetId);
        let dmg = 1;
        if (Game.game.chanceCheck(30)) {
            dmg = 2;
            Luck.luckAttack();
        }
        Game.game.attack(targetId, dmg);
    }
}