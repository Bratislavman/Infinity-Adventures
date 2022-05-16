import {vue} from "@/main";
import {Enemy} from "@/game/game-object/Enemy";

export class Guard extends Enemy {
    constructor(zoneId: number, locationId: number) {
        super('story1.guard.name', 3, zoneId, locationId);
        this.icon = 'game1/npc/guard.jpg';
    }

    getDescription() {
        return vue.$t('story1.guard.description');
    }
}