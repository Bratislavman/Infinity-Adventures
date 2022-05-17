import {Activ} from "@/game/actives/Activ";
import {SpellPassive} from "@/game/actives/SpellPassive";
import {LocaleMessages} from "vue-i18n";
import {EquipmentShell} from "@/game/actives/EquipmentShell";
import {Equipment} from "@/game/actives/Equipment";
import {EquipmentShooting} from "@/game/actives/EquipmentShooting";
import {EquipmentQuest} from "@/game/actives/EquipmentQuest";

export interface StatusGameCondition {
    name: string,
    status: StatusGameConditionStatus,
}
export enum StatusGameConditionStatus {
    Normal = 'Normal',
    Success = 'Success',
}

export interface ActionInterfaceType {
    name: string,
    action: Function, //само действие
    chance?: number,
    reload?: number,
    disabled?: boolean,
    morphCanOff?: boolean,
    shellCounter?: number,
    activ?: Activ,
}

//для действия, у которого точно должна быть конкретная цель-объект
export interface ActionInterfaceTypeWithActiv extends ActionInterfaceType {
    targetId: number;
}

export type EquipmentType = Equipment | EquipmentShell | EquipmentShooting | EquipmentQuest;
export type EquipmentActivType = Equipment | EquipmentShooting;

export type TranslateType = {
    name: string,
    options?: Object,
};

export type TranslateOrNullType = TranslateType | null;

export type TextType = LocaleMessages | string;

export type ActionWithChanceForHeroType = { name: string, chance: number, action: Function };
export type ActionWithChanceType = Function | ActionWithChanceForHeroType | null;

export type FunctionOrNullType = Function | null;

export type CharacteristicType = {
    name: string,
    value: number | string,
    status: CharacteristicStatusType,
};

export type ModalInfoTextType = {
    title: string,
    text: string,
};
export type ModalInfoType = {
    title?: string,
    texts: ModalInfoTextType[],
};

export type CharacteristicModificatorType = {
    value: number,
    haveModification: boolean,
};

export enum CharacteristicStatusType {
    Normal = 'characteristic_normal',
    Better = 'characteristic_better',
    Worse = 'characteristic_worse',
    LikeBefore = 'characteristic_like-before',
}

export enum SpellPassiveType {
    Buff = 'effect_buff',
    Debuff = 'effect_debuff',
    Mixed = 'effect_mixed',
}

export enum CharacterBehaviorTypes {
    Obj = 'obj', //объект для взаимодействия
    Combat = 'combat',
    Hero = 'hero',
}

export type SpellOrItemType = Activ | SpellPassive | EquipmentShell | EquipmentQuest;

export const HP = "hp";
export const HP_MAX = "hpMax";
export const MOVE_POINTS = "movePoints";
export const MOVE_POINTS_MAX = "movePointsMax";
export const ACTIONS_POINTS = "actionsPoints";
export const ACTIONS_POINTS_MAX = "actionsPointsMax";