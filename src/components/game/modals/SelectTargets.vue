<template>
  <modal class="modal-select-targets" :title="modalTitle" :visible="visible" :close="close">
    <template v-if="visible">
      <div class="btns-container">
        <button v-for="obj in modalSelectTargets.objs" :class="objClasses(obj)" @click="select(obj)">{{ name(obj) }}</button>
      </div>
      <button class="apply btn btn_big" :disabled="!canApply" @click="apply">{{ $t('apply') }}</button>
    </template>
  </modal>
</template>

<script>
import Modal from "@/components/game/modals/Modal";
import {GET_GAME} from "@/store/game.js";
import {GameObject} from "@/mixins/GameObject";

export default {
  name: 'ModalSelectTargets',
  components: {
    Modal
  },
  mixins: [GameObject],
  data() {
    return {
      modalSelectTargets: null,
      targetsIdsSelected: [],
    }
  },
  created() {
    this.updateData();
  },
  computed: {
    game() {
      return this.$store.getters[GET_GAME];
    },
    visible() {
      return this.modalSelectTargets;
    },
    canApply() {
      return this.visible && this.targetsIdsSelected.length > 0;
    },
    modalTitle() {
      if (this.visible) {
        return this.$t('select_targets_count', {
          current: this.targetsIdsSelected.length,
          need: this.modalSelectTargets.numberTargetsNeeded
        });
      }
      return '';
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
    getIndexSelectedObj(id) {
      return this.targetsIdsSelected.indexOf(id);
    },
    select(obj) {
      const index = this.getIndexSelectedObj(obj.id);
      if (index === -1) {
        if (this.modalSelectTargets.numberTargetsNeeded !== this.targetsIdsSelected.length) {
          this.targetsIdsSelected.push(obj.id);
        }
      } else {
        this.targetsIdsSelected.splice(index, 1);
      }
    },
    objClasses(obj) {
      return {
        btn: true,
        btn_selected: this.getIndexSelectedObj(obj.id) !== -1,
      }
    },
    updateData() {
      this.modalSelectTargets = this.game.modalSelectTargets;
      if (!this.modalSelectTargets) {
        this.targetsIdsSelected = [];
      }
    },
    apply() {
      if (this.targetsIdsSelected.length > 0 && this.canApply) {
        this.targetsIdsSelected.forEach(id => this.modalSelectTargets.action(id));
        this.modalSelectTargets.actionPostEffects();
        this.close();
      }
    },
    close() {
      this.game.modalSelectTargets = null;
    },
  },
}
</script>

<style lang="scss" scoped>
.modal-select-targets {
  z-index: 503;
}
.apply {
  margin-top: 20px;
}
</style>