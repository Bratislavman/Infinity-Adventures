import {GET_GAME} from "@/store/game";

export const GameWatcher = {
    created() {
        this.updateData();
    },
    computed: {
        game() {
            return this.$store.getters[GET_GAME];
        },
    },
    watch: {
        game: {
            deep: true,
            handler() {
                this.updateData();
            }
        }
    },
    methods: {
        updateData() {

        },
    },
}