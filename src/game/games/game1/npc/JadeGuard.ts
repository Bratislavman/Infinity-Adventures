import {Character} from "@/game/game-object/Character";
import {vue} from "@/main";

export class JadeGuard extends Character {
    constructor(zoneId: number, locationId: number) {
        super('story1.jade_guard.name', 9, zoneId, locationId);
        this.icon = 'game1/npc/mega-guard.jpg';
    }

    getDescription() {
        return vue.$t('story1.jade_guard.description');
    }
}