import {Character} from "@/game/game-object/Character";
import {Attack} from "@/game/games/game1/spells/Attack";
import {CraneStroke} from "@/game/games/game1/spells/CraneStroke";
import {Luck} from "@/game/games/game1/spells/Luck";
import {vue} from "@/main";
import {Gun} from "@/game/games/game1/items/Gun";
import {Punch} from "@/game/games/game1/spells/Punch";
import {Game} from "@/game/Game";

export class Warrior extends Character {
    constructor(zoneId: number, locationId: number) {
        super('story1.warrior.name', 5, zoneId, locationId);
        this.icon = 'game1/heroes/warrior.jpg';
        this.activeSpells = [new Attack(this.id), new CraneStroke(this.id), new Punch(this.id)];
        this.passiveSpells = [new Luck(this.id)];
        this.items = [new Gun(this.id)];
    }

    getDescription() {
        return vue.$t('story1.warrior.description');
    }

    static luckDate() {
        Game.game.addMessage(vue.$t('date_luck'));
    }
}