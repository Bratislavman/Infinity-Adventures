import {Character} from "@/game/game-object/Character";

export const GameObject = {
    methods: {
        name(obj) {
            if (obj instanceof Character) {
                return this.$t('gameObjectLife', {
                    name: this.$t(obj.name),
                    hp: obj.hp,
                    hpMax: obj.hpMax,
                });
            }
            return this.$t(obj.name);
        },
    },
}
