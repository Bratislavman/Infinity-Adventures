import {Activ} from "@/game/actives/Activ";
import {EquipmentShell} from "@/game/actives/EquipmentShell";
import {ActionInterfaceType, EquipmentType} from "@/constants/constants";
import {Game} from "@/game/Game";

//оружие с боеприпасом (не тратят действие)
export class EquipmentShooting extends Activ {
    constructor(name: string, ownerId: number, numberTargets: number = 1) {
        super(name, ownerId, numberTargets);
    }

    getCheckTypeShell(obj: EquipmentType): boolean {
        return false;
    }

    actionInterfacePostEffects() {
        super.actionInterfacePostEffects(false);
    }

    getShell(): EquipmentShell | undefined {
        const owner = this.getOwner();
        if (owner) {
            const shell = owner.items.find(obj => this.getCheckTypeShell(obj));
            if (shell) {
                return shell as EquipmentShell;
            }
        }
        return undefined;

    }

    getShellCount(): number {
        const shell = this.getShell();
        if (shell) {
            return shell.quantity;
        }
        return 0;
    }

    initForAction(action: any) {
        action.disabled = this.getShellCount() <= 0;
    }

    action(targetId: number) {
        super.action(targetId);
        const shell = this.getShell();
        if (shell) {
            shell.toSpend();
        }
    }
}