import {Game} from "@/game/Game";
import {SpellPassiveType, TextType} from "@/constants/constants";
import {EntityWithCharacteristic} from "@/game/EntityWithCharacteristic";
import {LocaleMessages} from "vue-i18n";
import {vue} from "@/main";

/*
TO DO надо будет все хар-ки сделать классами(теку значение хар-ки и её максимум(связь с хар-кой) и массив констант чтоб было удобнее)
 */
export class SpellPassive extends EntityWithCharacteristic {
    id: number = 0;
    name: string;
    ownerId: number;

    type: SpellPassiveType;
    //сколько ходов будет действовать. -1 это бесконечно
    timeAction: number;

    constructor(name: string, ownerId: number, type: SpellPassiveType, timeAction = -1) {
        super();
        this.name = name;
        this.ownerId = ownerId;
        this.type = type;
        this.timeAction = timeAction;
        this.init();
        const owner = this.getOwner();
        if (owner) {
            owner.addOrRemovePassiveSpell(this);
        }
    }

    getDescription(): TextType {
        return '';
    }
    getOwner() {
        return Game.game.getGameObjectById(this.ownerId);
    }

    //эффект пока пассивка на персонаже
    init() {

    }

    effect() {

    }

    //эффект вначале хода персонажа и уменьшение таймера пассивки
    applicationAndCompletion() {
        if (this.timeAction > 0) {
            this.effect();
            this.timeAction--;
        }
        if (this.timeAction === 0) {
            const owner = this.getOwner();
            if (owner) {
                owner.addOrRemovePassiveSpell(this, true);
            }
        }
    }
}