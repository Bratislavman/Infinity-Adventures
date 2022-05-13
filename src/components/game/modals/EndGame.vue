<template>
  <modal class="modal-end-game" :visible="visible">
    <template v-if="visible">
      <div class="modal-end-game__text title">
        {{ $t(modalEndGame.textKey) }}
      </div>
      <div class="btns-container_center offset-top-1">
        <button class="btn offset-right-1" @click="restart">{{ $t('restart') }}</button>
        <button class="btn" @click="changeLevel">{{ $t('change_game') }}</button>
      </div>
    </template>
  </modal>
</template>

<script>
import Modal from "@/components/game/modals/Modal";
import {GameWatcher} from "@/mixins/GameWatcher";
import {MUTATION_GAME_EXIT, MUTATION_GAME_RESTART} from "@/store/game";

export default {
  name: 'ModalEndGame',
  components: {
    Modal
  },
  mixins: [GameWatcher],
  data() {
    return {
      modalEndGame: null,
    }
  },
  computed: {
    visible() {
      return this.modalEndGame;
    },
  },
  methods: {
    updateData() {
      this.modalEndGame = this.game.modalEndGame;
    },
    changeLevel() {
      this.$store.commit(MUTATION_GAME_EXIT);
    },
    restart() {
      this.$store.commit(MUTATION_GAME_RESTART);
    },
  },
}
</script>

<style lang="scss" scoped>
.modal-end-game {
  z-index: 510;
}
</style>