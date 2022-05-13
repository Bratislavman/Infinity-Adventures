import {Game} from "@/game/Game";
import {itemInfo} from "@/helpers/game";
import {vue} from "@/main";
import {TextType} from "@/constants/constants";

//патроны
//TODO надо сделать чтоб они сумировались в инвентаре
export class EquipmentShell {
    id: number = 0;
    name: string;
    ownerId: number;
    quantity: number; //-1 бесконечно

    constructor(name: string, ownerId: number, quantity: number = 1) {
        this.name = name;
        this.ownerId = ownerId;
        this.quantity = quantity;
        Game.game.addSpellOrItemObject(this);
    }

    getDescription(): TextType {
        return '';
    }

    getOwner() {
        return Game.game.getGameObjectById(this.ownerId);
    }

    toSpend() {
        if (this.quantity !== -1) {
            this.quantity--;
            if (this.quantity === 0) {
                Game.game.removeItemsAndSpells(this.id);
                const owner = this.getOwner();
                if (owner) {
                    owner.removeItem(this.id);
                }
            }
        }
    }
}