import {vue} from "@/main";
import {spellPassiveInfo} from "@/helpers/game";
import {Stun} from "@/game/games/game1/spells/Stun";

export class PreparationForBattle extends Stun {
    constructor(ownerId: number, stun: number = 1) {
        super(ownerId, stun);
    }

    getDescription() {
        return spellPassiveInfo(vue.$t('preparation_for_battle.name'), vue.$t('preparation_for_battle.description'), this.timeAction)
    }

    effectName() {
        return 'preparation_for_battle.effect';
    }
}