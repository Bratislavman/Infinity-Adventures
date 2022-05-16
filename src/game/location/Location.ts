import {LocationParent} from "@/game/location/LocationParent";

export class Location extends LocationParent {
    isOpen: boolean = false
    btnText: string = 'tcvv';

    constructor(isOpen: boolean = false) {
        super();
        this.isOpen = isOpen;
    }

    setOpen(isOpen: boolean) {
        this.isOpen = isOpen;
    }
}