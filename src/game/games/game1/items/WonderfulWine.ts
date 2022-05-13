import {vue} from "@/main";
import {itemInfo} from "@/helpers/game";
import {EquipmentQuest} from "@/game/actives/EquipmentQuest";

export class WonderfulWine extends EquipmentQuest {
    constructor(ownerId: number) {
        super('wonderful_wine.name', ownerId);
    }

    getDescription() {
        return itemInfo(vue.$t('wonderful_wine.name'), vue.$t('wonderful_wine.description'))
    }
}