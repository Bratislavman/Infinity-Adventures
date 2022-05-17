import {Game} from "@/game/Game";
import {Character} from "@/game/game-object/Character";
import {
    ActionInterfaceTypeWithActiv,
    CharacterBehaviorTypes,
    TextType
} from "@/constants/constants";
import {vue} from "@/main";

//родитель для предметов и активных способностей
export class Activ {
    id: number = 0;
    name: string;
    ownerId: number;

    numberTargets: number;

    constructor(name: string, ownerId: number, numberTargets: number = 1) {
        this.name = name;
        this.ownerId = ownerId;
        this.numberTargets = numberTargets;
        Game.game.addSpellOrItemObject(this);
    }

    getDescription(): TextType {
        return '';
    }

    getOwner() {
        return Game.game.getGameObjectById(this.ownerId);
    }

    //определение доп опций для действия в интерфейсе
    initForAction(action: any) {
        action.activ = this;
    }

    //для игрока в интерфейсе действий
    actionForInterface(targetId: number): ActionInterfaceTypeWithActiv {
        const actionForInterface: ActionInterfaceTypeWithActiv = {
            name: this.name, targetId, action: () => {
            }
        };
        this.initForAction(actionForInterface);
        actionForInterface.action = () => {
            if (!actionForInterface.disabled) {
                if (this.numberTargets > 1) {
                    const target = Game.game.getGameObjectById(actionForInterface.targetId);
                    if (target?.locationId) {
                        const location = Game.game.getLocation(target.locationId);
                        if (location) {
                            const objs = Game.game.getLocationCharacters(location);
                            if (objs) {
                                Game.game.modalSelectTargets = {
                                    action: (targetId2: number) => this.action(targetId2),
                                    actionPostEffects: () => this.actionInterfacePostEffects(),
                                    objs,
                                    location,
                                    numberTargetsNeeded: this.numberTargets,
                                };
                            }
                        }
                    }
                } else {
                    this.action(actionForInterface.targetId);
                    this.actionInterfacePostEffects();
                }
            }
        };
        return actionForInterface;
    }

    //постэффект после применения спела(в том числе по неск целям) в интерфейсе
    //(уменьшаем очки дейсвтям героя игрока, но обычно предметы не уменьшают экшен поинсты
    // закрываем модалки
    //!! предметы не расходуют очки действий!
    actionInterfacePostEffects(decreaseActionPoints: boolean = true) {
        const owner = this.getOwner();
        if (owner) {
            if (decreaseActionPoints) {
                owner.actionsPoints--;
            }
            Game.game.closeAllModals();
            Game.game.endHeroTurnWithCheckEndPoints();
        }
    }

    action(targetId: number) {
        const owner = this.getOwner() as Character;
        //если враг, то уменьшаем кол-во его действий тут
        if (owner.behaviorType === CharacterBehaviorTypes.Combat) {
            owner.actionsPoints--;
        }
        const target = Game.game.getGameObjectById(targetId);
        if (target) {
            Game.game.addMessage(vue.$t('character_use_activ', {
                activ: vue.$t(this.name),
                owner: vue.$t(owner.name),
                target: vue.$t(target.name)
            }));
        }
    }
}