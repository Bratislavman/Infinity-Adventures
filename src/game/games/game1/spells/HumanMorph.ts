import {vue} from "@/main";
import {spellPassiveInfo} from "@/helpers/game";
import {SpellActiveMorphSelf} from "@/game/actives/SpellActiveMorphSelf";
import {HumanForm} from "@/game/games/game1/spells/HumanForm";
import {ActionInterfaceType} from "@/constants/constants";

export class HumanMorph extends SpellActiveMorphSelf {
    constructor(ownerId: number) {
        super('human_morph.name', ownerId, 'game1/heroes/kitsune-man.jpg');
        this.effectsClasses = [HumanForm];
    }

    initForAction(action: ActionInterfaceType) {
        super.initForAction(action);
        //если не заблочено, то будет заблочено ток если рядом враги и маюри лиса(нельзя морфанутся при врагах)
        if (!action.disabled && !this.on) {
            action.disabled = this.haveNearEnemiesAndCannotUseSpell();
        }
    }

    actionInterfacePostEffects() {
        super.actionInterfacePostEffects(false);
    }

    getDescription() {
        return spellPassiveInfo(vue.$t('human_morph.name'), vue.$t('human_morph.description'))
    }
}