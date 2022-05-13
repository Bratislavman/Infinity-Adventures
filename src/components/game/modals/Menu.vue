<template>
  <modal class="modal-menu" :title="$t('menu')" :visible="visible" :close="close">
    <div class="modal-menu__option" v-for="({title, click}, i) in options" :key="title + i" @click="click">
      {{ $t(title) }}
    </div>
  </modal>
</template>

<script>
import Modal from "@/components/game/modals/Modal";
import {GameWatcher} from "@/mixins/GameWatcher";
import {MUTATION_GAME_EXIT, MUTATION_GAME_RESTART} from "@/store/game";

export default {
  name: 'ModalMenu',
  components: {
    Modal
  },
  mixins: [GameWatcher],
  data() {
    return {
      modalMenu: false,
      options: [
        this.createOption('faq', this.showFaq),
        this.createOption('missions', this.showMissions),
        this.createOption('restart', this.restart),
        this.createOption('change_game', this.changeLevel),
      ],
    }
  },
  computed: {
    visible() {
      return this.modalMenu;
    },
  },
  methods: {
    changeLevel() {
      this.$store.commit(MUTATION_GAME_EXIT);
    },
    restart() {
      this.$store.commit(MUTATION_GAME_RESTART);
    },
    showFaq() {
      this.game.modalFaq = true;
    },
    showMissions() {
      this.game.modalMissions = true;
    },
    createOption(title, click) {
      return {title, click};
    },
    updateData() {
      this.modalMenu = this.game.modalMenu;
    },
    close() {
      this.game.modalMenu = null;
    },
  },
}
</script>

<style lang="scss" scoped>
.modal-menu {
  z-index: 504;

  &__option {
    color: $white0;
    cursor: pointer;
    margin-bottom: 10px;
  }
}
</style>