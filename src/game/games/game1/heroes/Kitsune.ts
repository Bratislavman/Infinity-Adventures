import {Character} from "@/game/game-object/Character";
import {HumanMorph} from "@/game/games/game1/spells/HumanMorph";
import {KitsuneCharm} from "@/game/games/game1/spells/KitsuneCharm";
import {Illusion} from "@/game/games/game1/spells/Illusions";
import {Health} from "@/game/games/game1/spells/Health";
import {vue} from "@/main";
import {HumanForm} from "@/game/games/game1/spells/HumanForm";
import {ActionInterfaceType} from "@/constants/constants";
import {GameObject} from "@/game/game-object/GameObject";
import {Game1} from "@/game/games/game1/Game1";
import {Game} from "@/game/Game";

export class Kitsune extends Character {
    constructor(zoneId: number, locationId: number) {
        super('story1.kitsune.name', 3, zoneId, locationId);
        this.icon = 'game1/heroes/kitsune.jpg';
        this.activeSpells = [new HumanMorph(this.id), new Illusion(this.id), new Health(this.id)];
        this.passiveSpells = [new KitsuneCharm(this.id)];
        this.initMoveAndActionPoints(2);
    }

    getDescription() {
        return vue.$t('story1.kitsune.description');
    }

    disabledActionForHuman(action: ActionInterfaceType) {
        const eff = this.passiveSpells.find(eff => eff instanceof HumanForm);
        if (eff) {
            action.disabled = true;
        }
    }

    disabledActionForKitsune(action: ActionInterfaceType) {
        const eff = this.passiveSpells.find(eff => eff instanceof HumanForm);
        if (!eff) {
            action.disabled = true;
        }
    }

    static disabledActionForKitsuneGlobal(hero: Character, action: ActionInterfaceType) {
        if (hero instanceof Kitsune) {
            hero.disabledActionForKitsune(action);
        }
    }

    isHuman() {
        return !!this.passiveSpells.find(s => s instanceof HumanForm);
    }

    isKitsune() {
        return !this.isHuman();
    }

    static checkKitsuneHuman(obj: GameObject) {
        return obj instanceof Kitsune && obj.isHuman();
    }
}