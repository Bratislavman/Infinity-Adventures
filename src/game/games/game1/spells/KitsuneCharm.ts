import {SpellPassive} from "@/game/actives/SpellPassive";
import {SpellPassiveType} from "@/constants/constants";
import {vue} from "@/main";
import {spellPassiveInfo} from "@/helpers/game";

export class KitsuneCharm extends SpellPassive {
    constructor(ownerId: number) {
        super('kitsune_charm.name', ownerId, SpellPassiveType.Buff);
    }

    getDescription() {
        return spellPassiveInfo(vue.$t('kitsune_charm.name'), vue.$t('kitsune_charm.description'), this.timeAction)
    }
}