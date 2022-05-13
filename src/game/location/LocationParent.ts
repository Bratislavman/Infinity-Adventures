import {Game} from "@/game/Game";

export class LocationParent {
    id: number;
    zoneId: number = -1;

    constructor() {
        Game.game.idsCounter++;
        this.id = Game.game.idsCounter;
    }

    setZone(zoneId: number) {
        this.zoneId = zoneId;
    }
}