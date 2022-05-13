import {Game} from "@/game/Game";
import {SpellActive} from "@/game/actives/SpellActive";
import {SpellPassive} from "@/game/actives/SpellPassive";
import {scaleValue, valueNotLesOne} from "@/helpers/game";
import {
    ACTIONS_POINTS,
    ACTIONS_POINTS_MAX,
    ActionInterfaceType,
    CharacteristicModificatorType,
    CharacteristicStatusType,
    CharacteristicType, HP, HP_MAX, MOVE_POINTS, MOVE_POINTS_MAX, TextType, EquipmentType
} from "@/constants/constants";
import {EntityWithCharacteristic} from "@/game/EntityWithCharacteristic";

//TO DO надо всё-таки разделить объекты для взаимодействия и просто нпс!!!
export class GameObject extends EntityWithCharacteristic {
    id: number = 0;

    name: string;
    description: string = '';

    hp: number = 1;
    movePoints: number = 1;
    actionsPoints: number = 1;

    zoneId: number;
    locationId: number;

    activeSpells: SpellActive[] = [];

    passiveSpells: SpellPassive[] = [];
    items: EquipmentType[]  = [];

    icon: string = '';

    constructor(name: string, hp: number, zoneId: number, locationId: number) {
        super();
        this.name = name;
        this.hp = hp;
        this.hpMax = hp;
        this.zoneId = zoneId;
        this.locationId = locationId;
        Game.game.addGameObject(this);
    }

    getDescription(): TextType {
        return '';
    }

    actions(): ActionInterfaceType[] {
        return [];
    }

    removeItem(itemId: number) {
        if (this.items.length > 0) {
            this.items = this.items.filter(obj => obj.id !== itemId);
        }
    };

    removeItemByClass(ObjClass: any) {
        if (this.items.length > 0) {
            this.items = this.items.filter(obj => !(obj instanceof ObjClass));
        }
    };

    haveItemByClass(ObjClass: any) {
        if (this.items.length > 0) {
            return !!this.items.find(obj => obj instanceof ObjClass);
        }
        return false;
    };

    notItemByClass(ObjClass: any) {
        return !this.haveItemByClass(ObjClass);
    };

    remove() {
        Game.game.removeGameObject(this);
    };

    initMoveAndActionPoints(moveP: number = 1, actionP: number = 1): void {
        this.movePoints = moveP;
        this.actionsPoints = actionP;
        this.movePointsMax = moveP;
        this.actionsPointsMax = actionP;
    }

    getCharacteristicModificator(characteristic: string): CharacteristicModificatorType {
        let valueFinal = 0;
        let value = 0;
        let haveModification = false;
        this.passiveSpells.forEach(eff => {
            // @ts-ignore
            value = eff[characteristic];
            if (!haveModification && value != 0) {
                haveModification = true;
            }
            // @ts-ignore
            valueFinal += value;
        });

        return { value: valueFinal,  haveModification } ;
    }
    getCharacteristic(characteristic: string): number {
        // @ts-ignore
        const valueBase = this[characteristic];
        // @ts-ignore
        const value = valueBase + this.getCharacteristicModificator(characteristic).value;
        return valueNotLesOne(value);
    }
    getCharacteristicForInterface(characteristic: string): CharacteristicType {
        const { value: valueModificator, haveModification } = this.getCharacteristicModificator(characteristic);
        // @ts-ignore
        const valueBase = this[characteristic];
        // @ts-ignore
        let value = valueBase + valueModificator;
        let status = CharacteristicStatusType.Normal;
        if (haveModification) {
            if (value > valueBase) {
                status = CharacteristicStatusType.Better;
            } else if (value < valueBase) {
                status = CharacteristicStatusType.Worse;
            } else if (value === valueBase) {
                status = CharacteristicStatusType.LikeBefore;
            }
        }
        value = valueNotLesOne(value);
        if (characteristic === HP_MAX) {
            characteristic = HP;
            value = `${this.hp}/${value}`;
        } else if (characteristic === ACTIONS_POINTS_MAX) {
            characteristic = ACTIONS_POINTS;
            value = `${this.actionsPoints}/${value}`;
        } else if (characteristic === MOVE_POINTS_MAX) {
            characteristic = MOVE_POINTS;
            value = `${this.movePoints}/${value}`;
        }
        return { name: characteristic, value, status };
    }

    addOrRemovePassiveSpell(spell: SpellPassive, remove: boolean = false) {
        const hpMaxOld = this.getCharacteristic(HP_MAX);
        const movePointsMaxOld = this.getCharacteristic(MOVE_POINTS_MAX);
        const actionsPointsMaxOld = this.getCharacteristic(ACTIONS_POINTS_MAX);

        if (remove) {
            Game.game.itemsAndSpells = Game.game.itemsAndSpells.filter(obj => obj.id !== spell.id);
            this.passiveSpells = this.passiveSpells.filter(obj => obj.id !== spell.id);
        } else {
            Game.game.addSpellOrItemObject(spell);
            this.passiveSpells.push(spell);
        }

        const hpMax = this.getCharacteristic(HP_MAX);
        const movePointsMax = this.getCharacteristic(MOVE_POINTS_MAX);
        const actionsPointsMax = this.getCharacteristic(ACTIONS_POINTS_MAX);

        this.hp = scaleValue(this.hp, 0,  hpMaxOld, 0,  hpMax);
        this.movePoints = scaleValue(this.movePoints, 0,  movePointsMaxOld, 0, movePointsMax);
        this.actionsPoints = scaleValue(this.actionsPoints, 0, actionsPointsMaxOld, 0, actionsPointsMax);
    }
}
