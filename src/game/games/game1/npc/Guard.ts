import {Character} from "@/game/game-object/Character";
import {vue} from "@/main";

export class Guard extends Character {
    constructor(zoneId: number, locationId: number) {
        super('story1.guard.name', 3, zoneId, locationId);
        this.icon = 'game1/npc/guard.jpg';
    }

    getDescription() {
        return vue.$t('story1.guard.description');
    }
}