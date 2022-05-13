import {LocationParent} from "@/game/location/LocationParent";
import {Game} from "@/game/Game";

export class Zone {
    id: number;
    locations: LocationParent[][] = [];

    constructor(locations: LocationParent[][] = []) {
        Game.game.idsCounter++;
        this.id = Game.game.idsCounter;
        this.locations = locations;
        this.locations.forEach(row => {
            row.forEach(loc => {
                loc.setZone(this.id);
            });
        });
        Game.game.zones.push(this);
    }
}