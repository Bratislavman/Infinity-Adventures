<template>
  <modal class="modal-actions" :title="$t('actions')" :visible="visible" :close="close">
    <template v-if="visible">
      <div v-for="obj in actions" :class="classes(obj)" @click="click(obj)" :title="getDescription(obj)">
        {{ name(obj) }}
      </div>
    </template>
  </modal>
</template>

<script>
import Modal from "@/components/game/modals/Modal";
import {GET_GAME} from "@/store/game.js";
import {Activ} from "@/game/actives/Activ";

export default {
  name: 'ModalActionsList',
  components: {
    Modal
  },
  data() {
    return {
      actions: [],
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
      return this.actions.length > 0;
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
      this.actions = this.game.modalActionsList;
    },
    getDescription(obj) {
      if (obj.activ instanceof Activ) {
        const descr = obj.activ.getDescription();
        if (descr) {
          return descr;
        }
      }
      return '';
    },
    name(obj) {
      const name = this.$t(obj.name);
      if ('reload' in obj && obj.reload > 0) {
        return this.$t('reload_action', {action: name, reload: obj.reload});
      } else if ('chance' in obj) {
        return this.$t('chance_action', {action: name, chance: obj.chance});
      } else if ('morphCanOff' in obj && obj.morphCanOff) {
        return this.$t('spell_cancel', {spell: name});
      }
      return name;
    },
    classes(obj) {
      return {
        'action btn': true,
        'btn_disabled': obj.disabled ?? false,
      };
    },
    click(obj) {
      if (!(obj?.disabled || (obj?.reload > 0))) {
        obj.action();
      }
    },
    close() {
      this.game.modalActionsList = [];
    },
  },
}
</script>

<style lang="scss">
.modal-actions {
  z-index: 501 !important;

  .content {
    display: flex;
    flex-wrap: wrap;
  }

  .action {
    margin-bottom: 10px;
  }
}
</style>