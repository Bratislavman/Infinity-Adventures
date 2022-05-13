import {Activ} from "@/game/actives/Activ";
import {Game} from "@/game/Game";

//обычное расходный предмет (может быть иб есконечым
// TO DO надо переименовать в эквипмент актив
export class Equipment extends Activ {
    quantity: number; //-1 не кончается

    constructor(name: string, ownerId: number, quantity: number = 1, numberTargets: number = 1) {
        super(name, ownerId, numberTargets);
        this.quantity = quantity;
    }

    actionInterfacePostEffects() {
        super.actionInterfacePostEffects(false);
    }

    action(targetId: number) {
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