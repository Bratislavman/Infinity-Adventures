import {SpellActive} from "@/game/actives/SpellActive";
import {ActionInterfaceType} from "@/constants/constants";

export class SpellActiveMorphSelf extends SpellActive {
    characterIconNew: string = '';
    characterIconOld: string = '';
    on: boolean = false;
    effectsClasses: any[] = [];
    effects: any[] = [];

    constructor(name: string, ownerId: number, characterIconNew: string, reloadCounter= -1) {
        super(name, ownerId, reloadCounter);
        this.characterIconNew = characterIconNew;
    }

    initForAction(action: ActionInterfaceType) {
        super.initForAction(action);
        action.morphCanOff = this.on;
    }

    action(targetId: number) {
        super.action(targetId);
        this.on = !this.on;
        const owner = this.getOwner();
        if (owner) {
            if (this.on) {
                this.characterIconOld = owner.icon;
                owner.icon = this.characterIconNew;
                this.effectsClasses.forEach(effClass => {
                    this.effects.push(new effClass(owner.id));
                });
            } else {
                owner.icon = this.characterIconOld;
                this.effects.forEach(eff => owner.addOrRemovePassiveSpell(eff,true));
                this.effects = [];
            }
        }
    }
}