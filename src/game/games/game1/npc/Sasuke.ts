import {vue} from "@/main";
import {Enemy} from "@/game/game-object/Enemy";

export class Sasuke extends Enemy {
    constructor(zoneId: number, locationId: number) {
        super('story1.sasuke.name', 5, zoneId, locationId);
        this.icon = 'game1/npc/sasuke.jpg';
    }

    getDescription() {
        return vue.$t('story1.sasuke.description');
    }
}