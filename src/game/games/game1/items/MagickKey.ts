import {vue} from "@/main";
import {itemInfo} from "@/helpers/game";
import {EquipmentQuest} from "@/game/actives/EquipmentQuest";

export class MagickKey extends EquipmentQuest  {
    constructor(ownerId: number) {
        super('magick_key.name', ownerId);
    }

    getDescription() {
        return itemInfo(vue.$t('magick_key.name'), vue.$t('magick_key.description'))
    }
}