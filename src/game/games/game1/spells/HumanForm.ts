import {SpellPassive} from "@/game/actives/SpellPassive";
import {SpellPassiveType} from "@/constants/constants";
import {vue} from "@/main";
import {spellPassiveInfo} from "@/helpers/game";

export class HumanForm extends SpellPassive {
    constructor(ownerId: number) {
        super('human_morph.name', ownerId, SpellPassiveType.Mixed);
    }

    init() {
        this.movePointsMax = -1;
    }

    getDescription() {
        return spellPassiveInfo(vue.$t('human_morph.name'), vue.$t('human_morph.description'))
    }
}