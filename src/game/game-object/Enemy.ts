import {Character} from "@/game/game-object/Character";
import {CharacterBehaviorTypes} from "@/constants/constants";

export class Enemy extends Character {
    constructor(name: string, hp: number, zoneId: number, locationId: number) {
        super(name, hp, zoneId, locationId);
        this.behaviorType = CharacterBehaviorTypes.Combat;
    }
}