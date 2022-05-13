import {Game} from "@/game/Game";
import {TextType} from "@/constants/constants";

export class EquipmentQuest {
    id: number = 0;
    name: string;
    ownerId: number;

    constructor(name: string, ownerId: number) {
        this.name = name;
        this.ownerId = ownerId;
        Game.game.addSpellOrItemObject(this);
    }

    getDescription(): TextType {
        return '';
    }

    getOwner() {
        return Game.game.getGameObjectById(this.ownerId);
    }

    remove() {
        Game.game.removeItemsAndSpells(this.id);
        const owner = this.getOwner();
        if (owner) {
            owner.removeItem(this.id);
        }
    }
}