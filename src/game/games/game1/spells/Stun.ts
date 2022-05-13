import {vue} from "@/main";
import {spellPassiveInfo} from "@/helpers/game";
import {SpellPassive} from "@/game/actives/SpellPassive";
import {CharacterBehaviorTypes, SpellPassiveType} from "@/constants/constants";
import {Game} from "@/game/Game";
import {Character} from "@/game/game-object/Character";

export class Stun extends SpellPassive {
    constructor(ownerId: number, stun: number = 1) {
        super('stun.name', ownerId, SpellPassiveType.Debuff, stun);
    }

    getDescription() {
        return spellPassiveInfo(vue.$t('stun.name'), vue.$t('stun.description'), this.timeAction)
    }

    init() {
        //если вдруг герой решил ошлушить себя
        const owner = this.getOwner();
        if (owner instanceof Character && owner.behaviorType === CharacterBehaviorTypes.Hero && Game.game.currentHeroId === owner.id) {
            Game.game.endHeroTurn();
        }
    }

    effectName() {
        return 'stun.effect';
    }

    effect() {
        const owner = this.getOwner();
        if (owner) {
            Game.game.addMessage(vue.$t(this.effectName(), {
                count: this.timeAction, unit: vue.$t(owner.name)
            }));
        }
    }
}