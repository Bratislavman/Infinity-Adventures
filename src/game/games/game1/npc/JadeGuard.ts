import {vue} from "@/main";
import {Enemy} from "@/game/game-object/Enemy";
import {GameObject} from "@/game/game-object/GameObject";
import {Game} from "@/game/Game";

export class JadeGuard extends Enemy {
    constructor(zoneId: number, locationId: number) {
        super('story1.jade_guard.name', 9, zoneId, locationId);
        this.icon = 'game1/npc/mega-guard.jpg';
    }

    getDescription() {
        return vue.$t('story1.jade_guard.description');
    }

    static jadeGuardShieldCheck(obj: GameObject, action: Function) {
        if (obj instanceof JadeGuard) {
            Game.game.addMessage(vue.$t('story1.jade_guard.shield'));
        } else {
            action();
        }
    }
}