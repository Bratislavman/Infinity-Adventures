import {vue} from "@/main";
import {itemInfo} from "@/helpers/game";
import {EquipmentShell} from "@/game/actives/EquipmentShell";

export class GunShell extends EquipmentShell {
    constructor(ownerId: number, quantity: number) {
        super('gun_shell.name', ownerId, quantity);
    }

    getDescription() {
        return itemInfo(vue.$t('gun_shell.name'), vue.$t('gun_shell.description'), this.quantity)
    }
}