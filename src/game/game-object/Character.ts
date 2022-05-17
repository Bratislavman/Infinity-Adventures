import {GameObject} from "@/game/game-object/GameObject";
import {Game} from "@/game/Game";
import {ACTIONS_POINTS_MAX, CharacterBehaviorTypes, MOVE_POINTS_MAX} from "@/constants/constants";
import {Stun} from "@/game/games/game1/spells/Stun";
import {randomArrayElement} from "@/helpers/game";
import {vue} from "@/main";

export class Character extends GameObject {
    //фиксация того, что персонаж уже использовал все действия и перевидежния
    heroTurnEnd: boolean = false;

    behaviorType: CharacterBehaviorTypes = CharacterBehaviorTypes.Obj;

    constructor(name: string, hp: number, zoneId: number, locationId: number) {
        super(name, hp, zoneId, locationId);
    }

    npcTurn() {
        if (this.behaviorType === CharacterBehaviorTypes.Combat) {
            const location = Game.game.getLocation(this.locationId);
            if (location) {
                const characters = Game.game.getLocationCharacters(location) as Character[];
                const enemies = characters.filter(obj => obj.behaviorType === CharacterBehaviorTypes.Hero);
                if (enemies.length > 0) {
                    this.npcAttackEnemies(enemies);
                }
            }
        }
    }
    npcAttackEnemies(enemies: Character[]) {
        for (let i = 0; i < this.actionsPoints; i++) {
            const enemiesForAttack = Game.game.enemiesForAttackNPC(enemies);
            if (enemiesForAttack.length > 0) {
                const enemy = randomArrayElement(enemiesForAttack);
                Game.game.addMessage(vue.$t('npc_attack', {target: vue.$t(enemy.name), npc: vue.$t(this.name)}));
                Game.game.attack(enemy.id, this.dmg);
                this.actionsPoints--;
            }
        }
    }

    startTurn() {
        this.movePoints = this.getCharacteristic(MOVE_POINTS_MAX);

        this.actionsPoints = this.getCharacteristic(ACTIONS_POINTS_MAX);

        this.activeSpells.forEach(s => {
            if (s.reload > 0) {
                s.reload--;
            }
        });

        const stun = this.passiveSpells.find(s => s instanceof Stun);
        const haveStun = stun instanceof Stun;

        this.passiveSpells.forEach(s => s.applicationAndCompletion());

        if (this.behaviorType === CharacterBehaviorTypes.Hero) {
            if (haveStun) {
                Game.game.endHeroTurn();
            } else {
                Game.game.centeringOnHero = true;
            }
        } else {
            if (!haveStun) {
                this.npcTurn();
            }
        }
    }

    checkNotStun(): boolean {
        return !this.passiveSpells.find(ef => ef instanceof Stun);
    }

    //TO DO по-иее для небоевых нпс которые будут бежать
    panic(): void {

    }
}