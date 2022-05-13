import {SpellPassive} from "@/game/actives/SpellPassive";
import {SpellPassiveType} from "@/constants/constants";
import {vue} from "@/main";
import {spellPassiveInfo} from "@/helpers/game";
import {Game} from "@/game/Game";

//TO DO удача чисто для датэ  надо переделать
export class Luck extends SpellPassive {
    constructor(ownerId: number) {
        super('favorite_of_fortune.name', ownerId, SpellPassiveType.Buff);
    }

    getDescription() {
        return spellPassiveInfo(vue.$t('favorite_of_fortune.name'), vue.$t('favorite_of_fortune.description'));
    }

    static luck() {
        Game.game.addMessage(vue.$t('story1.warrior.date_luck'));
    }

    static luckAttack() {
        Game.game.addMessage(vue.$t('story1.warrior.date_luck_attack'));
    }
}