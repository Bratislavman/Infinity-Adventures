import {SpellActive} from "@/game/actives/SpellActive";
import {Game} from "@/game/Game";
import {spellActiveInfo} from "@/helpers/game";
import {vue} from "@/main";
import {Luck} from "@/game/games/game1/spells/Luck";

export class CraneStroke extends SpellActive {
    constructor(ownerId: number) {
        super('crane_stroke.name', ownerId, 2, 3);
    }

    getDescription() {
        return spellActiveInfo(vue.$t('crane_stroke.name'), vue.$t('crane_stroke.description'), this.reload)
    }

    action(targetId: number) {
        super.action(targetId);
        let dmg = 2;
        if (Game.game.chanceCheck(30)) {
            dmg = 3;
            Luck.luckAttack();
        }
        Game.game.attack(targetId, dmg);
    }
}