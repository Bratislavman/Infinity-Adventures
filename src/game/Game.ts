import {Zone} from "@/game/Zone";
import {GameObject} from "@/game/game-object/GameObject";
import {Character} from "@/game/game-object/Character";
import {LocationParent} from "@/game/location/LocationParent";
import {Location} from "@/game/location/Location";
import {LocationEmpty} from "@/game/location/LocationEmpty";
import {LocaleMessages} from "vue-i18n";
import {vue} from "@/main";
import {
    ActionInterfaceType,
    ACTIONS_POINTS_MAX,
    ActionWithChanceType,
    CharacterBehaviorTypes,
    EquipmentActivType,
    FunctionOrNullType,
    HP_MAX, ModalInfoType,
    MOVE_POINTS_MAX,
    SpellOrItemType, StatusGameCondition, StatusGameConditionStatus,
} from "@/constants/constants";
import {Stun} from "@/game/games/game1/spells/Stun";
// @ts-ignore
import {MUTATION_GAME_EXIT} from "@/store/game";
import {PreparationForBattle} from "@/game/games/game1/spells/PreparationForBattle";
import {Equipment} from "@/game/actives/Equipment";
import {EquipmentShooting} from "@/game/actives/EquipmentShooting";

export class Game {
    static game: Game;

    gameVictoryText: string = '';
    statusGameConditionVictory: StatusGameCondition[] = [];
    statusGameConditionDefeat: StatusGameCondition[] = [];
    gameTimerId: number = 0;

    name: string;
    description: string;
    gameObjects: GameObject[] = [];
    itemsAndSpells: SpellOrItemType[] = [];
    zones: Zone[] = [];
    heroes: Character[] = [];
    messages: string[] = [];
    currentHeroId: number = 0;
    locationsIdsForMoveHero: number[] = [];
    //каунтер для айдишек всех создаваемых cущностей игры
    idsCounter: number = 0;
    background: string = '';

    modalGameObjectInfo: any = null;
    modalActionsList: any = [];
    modalLocationGameObjects: any = [];
    modalSelectTargets: any = null;
    modalInfo: any = null;
    modalMenu: boolean = false;
    modalMissions: boolean = false;
    modalEndGame: any = null;

    constructor(name: string, description: string, background: string) {
        Game.game = this;
        this.name = name;
        this.description = description;
        this.background = background;
        this.gameTimerId = setInterval(() => this.watcherGameStatus(), 200);
    }

    getMissions(): StatusGameCondition[] {
        return this.statusGameConditionVictory.concat(this.statusGameConditionDefeat);
    }

    createStatusGameCondition(name: string): StatusGameCondition {
        return {
            name,
            status: StatusGameConditionStatus.Normal,
        }
    }

    createStatusGameConditions(names: string[]): StatusGameCondition[] {
        return names.map(name => this.createStatusGameCondition(name));
    }

    statusGameConditionIsDone(name: string, arrayVictoryOrDefeat: boolean = true): boolean {
        const arr = arrayVictoryOrDefeat ? this.statusGameConditionVictory : this.statusGameConditionDefeat;
        return !!arr.find(obj => obj.name === name && obj.status === StatusGameConditionStatus.Success);
    }

    statusGameConditionNotDone(name: string, arrayVictoryOrDefeat: boolean = true): boolean {
        return !this.statusGameConditionIsDone(name, arrayVictoryOrDefeat);
    }

    statusGameConditionDone(name: string, arrayVictoryOrDefeat: boolean = true) {
        const arr = arrayVictoryOrDefeat ? this.statusGameConditionVictory : this.statusGameConditionDefeat;
        const obj = arr.find(obj => obj.name === name);
        if (obj) {
            obj.status = StatusGameConditionStatus.Success;
        }
    }

    watcherGameStatusAddQuestions() {

    }

    watcherGameStatus() {
        try {
            if (this.statusGameConditionVictory.length > 0 && this.statusGameConditionDefeat.length > 0) {
                this.statusGameConditionDefeat.find(obj => {
                    if (obj.status === StatusGameConditionStatus.Success) {
                        throw false;
                    }
                })

                const successQuestsCount = this.statusGameConditionVictory.reduce((prev, obj): number => {
                    return obj.status === StatusGameConditionStatus.Success ? prev + 1 : prev;
                }, 0);
                if (successQuestsCount === this.statusGameConditionVictory.length) {
                    throw true;
                } else {
                    this.watcherGameStatusAddQuestions();
                }

                this.collectHeroNearestLocationsIds();
            }
        } catch (gameOverOrVictory) {
            this.gameEnd(gameOverOrVictory);
        }
    }

    gameEnd(isVictory: boolean = false) {
        clearTimeout(this.gameTimerId);
        this.modalEndGame = {
            textKey: isVictory ? this.gameVictoryText : 'game_over_text',
        };
    }

    gameClear() {
        //TO DO сделай полную очистку ссылок во всех сущностях!
        vue.$store.commit(MUTATION_GAME_EXIT);
        this.closeAllModals();
        this.gameObjects = [];
        this.itemsAndSpells = [];
        this.zones = [];
        this.heroes = [];
        this.statusGameConditionVictory = [];
        this.statusGameConditionDefeat = [];
        this.modalEndGame = null;
    }

    closeAllModals() {
        this.modalGameObjectInfo = null;
        this.modalActionsList = [];
        this.modalLocationGameObjects = [];
        this.modalSelectTargets = null;
        this.modalInfo = null;
        this.modalMissions = false;
        this.modalMenu = false;
        this.modalEndGame = null;
    }

    newId() {
        Game.game.idsCounter++;
        return Game.game.idsCounter;
    }

    addGameObject(obj: GameObject) {
        obj.id = this.newId();
        Game.game.gameObjects.push(obj);
    }

    removeGameObject(obj: GameObject) {
        Game.game.gameObjects = Game.game.gameObjects.filter(obj2 => obj2.id !== obj.id);
    }

    removeItemsAndSpells(objId: number) {
        Game.game.itemsAndSpells = Game.game.itemsAndSpells.filter(obj => obj.id !== objId);
    }

    addSpellOrItemObject(obj: SpellOrItemType) {
        obj.id = this.newId();
        Game.game.itemsAndSpells.push(obj);
    }

    addHeroes(heroes: Character[]): void {
        this.heroes = heroes;
        this.heroes.forEach(obj => obj.behaviorType = CharacterBehaviorTypes.Hero);
        this.currentHeroId = heroes[0].id;
    }

    addGameObjects(gameObjects: GameObject[]): void {
        this.gameObjects = gameObjects;
    }

    //создание пустой локации
    crEL(): LocationEmpty {
        return new LocationEmpty();
    }

    padTo2Digits(num: number): string {
        return num.toString().padStart(2, '0');
    }

    addMessage(text: string | LocaleMessages): void {
        const date = new Date();
        const dateMessage = (
            [
                date.getFullYear(),
                this.padTo2Digits(date.getMonth() + 1),
                this.padTo2Digits(date.getDate()),
            ].join('-') +
            ' ' +
            [
                this.padTo2Digits(date.getHours()),
                this.padTo2Digits(date.getMinutes()),
                this.padTo2Digits(date.getSeconds()),
            ].join(':')
        );
        // @ts-ignore
        this.messages.push({text, date: dateMessage});
    }

    currentHero(): Character | undefined {
        return this.heroes.find(hero => hero.id === Game.game.currentHeroId) as Character;
    }

    getGameObjectById(id: number): GameObject | undefined {
        return this.gameObjects.find(obj => id === obj.id);
    }

    getHeroes(): Character[] {
        return this.heroes;
    }

    currentZone(): Zone {
        const hero = this.currentHero();
        const zone = this.zones.find(obj => hero && obj.id === hero.zoneId);
        return zone as Zone;
    }

    getLocation(locationId: number): Location | null {
        try {
            this.zones.forEach(zone => {
                zone.locations.forEach(row => {
                    row.forEach(loc => {
                        if (loc.id === locationId) {
                            throw loc;
                        }
                    });
                });
            });
        } catch (loc) {
            return loc;
        }
        return null;
    }

    currentZoneLocations(): LocationParent[][] {
        const zone = this.currentZone();
        return zone.locations;
    }

    heroAction(action: Function): void {
        const currHero = Game.game.currentHero();
        if (currHero) {
            action();
            currHero.actionsPoints--;
            Game.game.closeAllModals();
            this.endHeroTurnWithCheckEndPoints();
        }
    }

    eventsCharacterMoveBefore(obj: GameObject) {

    }

    eventsCharacterMoveAfter(obj: GameObject) {

    }

    escapeHeroCheck(obj: GameObject): boolean {
        return true;
    }

    characterMove(targetId: number, locationId: number, spendingPoints: boolean = false) {
        const obj = this.gameObjects.find(obj => obj.id === targetId && obj instanceof Character);

        if (obj) {
            if (spendingPoints) {
                obj.movePoints--;
            }

            const objIsHero = this.checkObjHero(obj);

            const location = this.getLocation(locationId);

            if (location) {
                let move = true;

                //если герой при врагах, то проверяем, сможет ли он сбежать
                if (this.haveHeroEnemiesInLocation(obj.id)) {
                    move = this.escapeHeroCheck(obj);
                    if (move) {
                        this.addMessage(vue.$t('escape_success', {hero: vue.$t(obj.name)}))
                    } else {
                        this.addMessage(vue.$t('escape_fail', {hero: vue.$t(obj.name)}))
                    }
                }

                if (move) {
                    obj.locationId = locationId;
                    obj.zoneId = location.zoneId;
                    this.eventsCharacterMoveAfter(obj);
                    if (objIsHero) {
                        location.isOpen = true;
                        Game.game.closeAllModals();
                    }
                }
            }
        }
    }

    checkObjHero(obj: GameObject) {
        return obj instanceof Character && obj.behaviorType === CharacterBehaviorTypes.Hero;
    }

    moveCurrentHero(locationId: number, spendingPoints: boolean = false): void {
        const hero = this.currentHero();
        if (hero) {
            this.characterMove(hero.id, locationId, spendingPoints);
        }
    }

    endHeroTurnWithCheckEndPoints(): void {
        const currHero = this.currentHero();
        if (currHero && currHero.movePoints === 0 && currHero.actionsPoints === 0) {
            this.endHeroTurn();
        }
    }

    npcTurns() {
        //враги ходят
        this.gameObjects.forEach(obj => {
            if (obj instanceof Character && obj.behaviorType !== CharacterBehaviorTypes.Hero) {
                obj.startTurn();
            }
        });
        //даём героям возможнось ходить, выбираем первого из них и начинаем его ход
        if (this.heroes.length > 0) {
            this.heroes.forEach(obj => obj.heroTurnEnd = false);
            this.currentHeroId = this.heroes[0].id;
            const currHeroNew = this.currentHero();
            if (currHeroNew) {
                currHeroNew.startTurn();
            }
        }
    }

    startHeroTurn() {
        const currHero = this.currentHero();

        if (currHero) {
            const heroIndex = this.heroes.findIndex((h) => h.id === currHero.id);
            this.currentHeroId = this.heroes[heroIndex + 1].id;
            const currHeroNew = this.currentHero();
            if (currHeroNew) {
                currHeroNew.startTurn();
            }
        }
    }

    endHeroTurn() {
        this.clearMoveHeroMode();

        const currHero = this.currentHero();

        if (currHero) {
            currHero.heroTurnEnd = true;

            const turnHeroesCount = this.heroes.reduce((prev, obj): number => {
                if (obj.heroTurnEnd) {
                    return prev + 1;
                }
                return prev;
            }, 0);

            //когда герои отходили, ход врагов и переход к первому игроку, иначе к следующему
            if (turnHeroesCount === this.heroes.length) {
                this.npcTurns();
            } else {
                this.startHeroTurn();
            }
        }
    }

    addNearestLocation(x: number, y: number, xShift = 0, yShift = 0): number {
        const locations: LocationParent[][] = this.currentZoneLocations();
        let location: LocationParent | null = null;
        if (locations[y + yShift] && locations[x + xShift]) {
            location = locations[y + yShift][x + xShift];
            if (location && !(location instanceof LocationEmpty)) {
                this.locationsIdsForMoveHero.push(location.id);
                return location.id;
            }
        }
        return -1;
    }

    getNewHeroNearestLocationsIds(): number[] {
        return this.locationsIdsForMoveHero;
    }

    collectHeroNearestLocationsIds() {
        this.locationsIdsForMoveHero = [];
        const currHero = this.currentHero();
        if (currHero && currHero.movePoints > 0) {
            let x = -1;
            let y = -1;
            let lX = -1;
            const locations = this.currentZoneLocations();
            locations.forEach((lRow, lY) => {
                lX = lRow.findIndex(l => l.id === currHero.locationId);
                if (lX > -1) {
                    x = lX;
                    y = lY;
                }
            })
            if (x > -1 && y > -1 && locations[y] && locations[y][x]) {
                //locationLeft
                const leftId = this.addNearestLocation(x, y, -1);
                //locationUp
                const upId = this.addNearestLocation(x, y, 0, -1);
                //locationDown
                const downId = this.addNearestLocation(x, y, 0, 1);
                //locationRight
                const rightId = this.addNearestLocation(x, y, 1);

                if (leftId > -1 && upId > -1) {
                    //locationLeftUp
                    this.addNearestLocation(x, y, -1, -1);
                }
                if (leftId > -1 && downId > -1) {
                    //locationLeftDown
                    this.addNearestLocation(x, y, -1, 1);
                }
                if (rightId > -1 && upId > -1) {
                    //locationRightUp
                    this.addNearestLocation(x, y, 1, -1);
                }
                if (rightId > -1 && downId > -1) {
                    //locationRightDown
                    this.addNearestLocation(x, y, 1, 1);
                }
            }

        }
    }

    clearMoveHeroMode(): void {
        this.locationsIdsForMoveHero = [];
    }

    isNearestLocation(locationId: number) {
        const isNearestLocation = this.getNewHeroNearestLocationsIds().find((id) => locationId === id);
        return Boolean(isNearestLocation);
    }

    handlerLocation(locationId: number) {
        const location = this.getLocation(locationId);
        if (location) {
            if (location.isOpen) {
                this.modalLocationGameObjects = {location, objs: this.getLocationGameObjects(location)};
            } else {
                let title = 'location.not_open.far.title';
                let text = 'location.not_open.far.text';
                if (this.isNearestLocation(locationId)) {
                    title = 'location.not_open.nearest.title';
                    text = 'location.not_open.nearest.text';
                }
                this.modalInfo = {
                    texts: [
                        {title, text}
                    ]
                };
            }
        }
    }

    moveHeroToLocation(locationId: number) {
        const location = this.getLocation(locationId);
        if (location) {
            const nearestLocationId: number | undefined = this.locationsIdsForMoveHero.find((id) => location.id === id);
            if (nearestLocationId) {
                const currHero = this.currentHero();
                if (currHero) {
                    this.characterMove(currHero.id, location.id, true);
                    this.clearMoveHeroMode();
                    this.endHeroTurnWithCheckEndPoints();
                }
            }
        }
    }

    //список действий тек героя с текущим объектом
    getHeroActionsForObject(obj: GameObject): ActionInterfaceType[] {
        const currentHero = Game.game.currentHero();
        if (currentHero && currentHero.locationId === obj.locationId) {
            if (currentHero.actionsPoints === 0) {
                return [];
            }

            let actions = obj.actions();

            if (obj instanceof Character) {
                const spellsHeroActions = currentHero.activeSpells.map(spell => {
                    return spell.actionForInterface(obj.id);
                });

                const itemsHeroActive = currentHero.items.filter(item => {
                    return item instanceof Equipment || item instanceof EquipmentShooting;
                });
                const itemsHeroActions = itemsHeroActive.map(item => {
                    return (item as EquipmentActivType).actionForInterface(obj.id);
                });

                actions = actions.concat(spellsHeroActions).concat(itemsHeroActions);
            }

            return actions;
        }

        return [];
    }

    getLocationGameObjects(location: Location): GameObject[] {
        const objs: GameObject[] = [];
        if (location.isOpen) this.gameObjects.forEach((obj) => {
            if (obj.locationId === location.id) {
                objs.push(obj);
            }
        })
        return objs;
    }

    getLocationCharacters(location: Location, typeBehavior: CharacterBehaviorTypes | null = null): Character[] {
        const objs = this.getLocationGameObjects(location);
        return objs.filter(obj => {
            return obj instanceof Character && obj.hp > 0 && (typeBehavior === null || obj.behaviorType === typeBehavior);
        }) as Character[];
    }

    haveHeroEnemiesInLocation(heroId: number, withoutStunned: boolean = true): boolean {
        const hero = this.getGameObjectById(heroId);
        if (hero && this.checkObjHero(hero)) {
            const location = this.getLocation(hero.locationId);
            if (location) {
                const objs = this.getLocationCharacters(location, CharacterBehaviorTypes.Combat);
                if (withoutStunned) {
                    const objsNotStun = objs.filter(obj => obj.checkNotStun());
                    return objsNotStun.length > 0;
                } else {
                    return objs.length > 0;
                }
            }
        }
        return false;
    }

    withoutHeroEnemiesInLocation(heroId: number, withoutStunned: boolean = true): boolean {
        return !this.haveHeroEnemiesInLocation(heroId, withoutStunned);
    }

    addEnemyPreparationForBattle(enemy: Character) {
        new PreparationForBattle(enemy.id);
    }

    enemiesForAttackNPC(enemies: Character[]): Character[] {
        return [];
    }

    unitDied(unit: Character) {

    }

    attack(targetId: number, dmg: number) {
        const target = this.gameObjects.find(g => g.id === targetId) as Character;
        if (target) {
            const unit = vue.$t(target.name);

            // const invulnerability = target.passiveSpells.find(f => f instanceof Invulnerability);
            // if (invulnerability) {
            //     this.addMessage(vue.$t('invulnerability_damage', {unit, dmg}));
            //     return;
            // }

            this.addMessage(vue.$t('damage', {unit, dmg}));
            dmg = dmg > target.hp ? target.hp : dmg;
            target.hp -= dmg;
            if (target.hp === 0) {
                if (target.behaviorType === CharacterBehaviorTypes.Hero) {
                    this.heroes = this.heroes.filter(obj => obj.id !== targetId);
                }
                this.gameObjects = this.gameObjects.filter(obj => obj.id !== targetId);
                this.addMessage(vue.$t('death', {unit}));
                this.unitDied(target);
            }
        }
    }

    health(targetId: number, healed: number) {
        const target = this.gameObjects.find(g => g.id === targetId);
        if (target) {
            const unit = vue.$t(target.name);
            this.addMessage(vue.$t('healed', {unit, healed}));
            const newHp = target.hp + healed;
            const hpMax = target.getCharacteristic(HP_MAX);
            target.hp = newHp > hpMax ? hpMax : newHp;
        }
    }

    stun(targetId: number, stun: number) {
        new Stun(targetId, stun);
    }

    randomRange(min: number, max: number) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    chanceCheck(chance: number) {
        return this.randomRange(1, 100) <= chance;
    }

    handlerChance(chance: number): number {
        return chance > 100 ? 100 : chance;
    }

    actionWithChance(objId: number, name: string, chance: number, actionSuccess: Function, actionFail: FunctionOrNullType = null): ActionWithChanceType {
        const obj = this.gameObjects.find(obj => objId === obj.id);

        if (obj) {
            const action = () => {
                if (this.chanceCheck(chance)) {
                    actionSuccess();
                } else {
                    if (actionFail) {
                        actionFail();
                    }
                }
            }

            if (obj instanceof Character) {
                //для героя возвращаем экшен для пункта интерфейса, для нпс просто сам экшен
                if (obj.behaviorType === CharacterBehaviorTypes.Hero) {
                    return {
                        name,
                        chance,
                        action
                    }
                } else {
                    return action;
                }
            }
        }

        return null;
    }

    showBio(objId: number) {
        const obj = this.getGameObjectById(objId);
        if (obj) {
            const description = obj.getDescription();
            if (description) {
                this.modalInfo = {
                    texts: [
                        {title: obj.name, text: description}
                    ]
                };
            }
        }
    }

    showGameObjectInfo(obj: GameObject): any {
        if (obj instanceof Character) {
            let modalGameObjectInfo: any = {
                name: obj.name,
                description: obj.getDescription(),
                isCharacter: false,
                id: obj.id,
            };

            modalGameObjectInfo.characteristics = [
                obj.getCharacteristicForInterface(HP_MAX),
                obj.getCharacteristicForInterface(MOVE_POINTS_MAX),
                obj.getCharacteristicForInterface(ACTIONS_POINTS_MAX),
            ];
            modalGameObjectInfo.abilities = obj.activeSpells;
            modalGameObjectInfo.effects = obj.passiveSpells;
            modalGameObjectInfo.items = obj.items;

            modalGameObjectInfo.isCharacter = true;

            this.modalGameObjectInfo = modalGameObjectInfo;
        } else {
            const description = obj.getDescription();
            if (description) {
                this.modalInfo = {
                    texts: [
                        {title: obj.name, text: description}
                    ]
                };
            } else {
                this.modalInfo = null;
            }
        }
    }

    getModalInfo(): ModalInfoType {
        return {
            title: 'Faq',
            texts: [
                {title: 'help.punct1.title', text: 'help.punct1.text'},
                {title: 'help.punct2.title', text: 'help.punct2.text'},
                {title: 'help.punct3.title', text: 'help.punct3.text'},
                {title: 'help.punct4.title', text: 'help.punct4.text'},
                {title: 'help.punct5.title', text: 'help.punct5.text'},
                {title: 'help.punct6.title', text: 'help.punct6.text'},
                {title: 'help.punct7.title', text: 'help.punct7.text'},
                {title: 'help.punct8.title', text: 'help.punct8.text'},
                {title: 'help.punct9.title', text: 'help.punct9.text'},
            ]
        }
    }
}