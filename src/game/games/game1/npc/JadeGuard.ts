import {vue} from "@/main";
import {Enemy} from "@/game/game-object/Enemy";

export class JadeGuard extends Enemy {
    constructor(zoneId: number, locationId: number) {
        super('story1.jade_guard.name', 9, zoneId, locationId);
        this.icon = 'game1/npc/mega-guard.jpg';
    }

    getDescription() {
        return vue.$t('story1.jade_guard.description');
    }
}