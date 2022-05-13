import {Game} from "@/game/Game";
import {vue} from "@/main";
import {itemInfo} from "@/helpers/game";
import {EquipmentShooting} from "@/game/actives/EquipmentShooting";
import {GunShell} from "@/game/games/game1/items/GunShell";
import {EquipmentType} from "@/constants/constants";

export class Gun extends EquipmentShooting {
    constructor(ownerId: number) {
        super('gun.name', ownerId);
    }

    getCheckTypeShell(obj: EquipmentType): boolean {
        return obj instanceof GunShell;
    }

    getDescription() {
        return itemInfo(vue.$t('gun.name'), vue.$t('gun.description'), this.getShellCount())
    }

    action(targetId: number) {
        super.action(targetId);
        Game.game.attack(targetId, 3);
    }
}