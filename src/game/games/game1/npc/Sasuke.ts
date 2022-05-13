import {Character} from "@/game/game-object/Character";
import {vue} from "@/main";

export class Sasuke extends Character {
    constructor(zoneId: number, locationId: number) {
        super('story1.sasuke.name', 5, zoneId, locationId);
        this.icon = 'game1/npc/sasuke.jpg';
    }

    getDescription() {
        return vue.$t('story1.sasuke.description');
    }
}