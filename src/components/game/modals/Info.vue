<template>
  <modal v-if="modalInfo" class="modal-info" :title="modalInfo.title" :visible="visible" :close="close">
    <block-with-title v-for="obj in modalInfo.texts" :key="obj.title" :title="$t(obj.title)">
      <div class="text">{{ $t(obj.text) }}</div>
    </block-with-title>
  </modal>
</template>

<script>
//модалка для блока/блоков текста с заголовками(или без)
import Modal from "@/components/game/modals/Modal";
import {GameWatcher} from "@/mixins/GameWatcher";
import BlockWithTitle from "@/components/game/BlockWithTitle";

export default {
  name: 'modalInfo',
  components: {
    Modal,
    BlockWithTitle
  },
  mixins: [GameWatcher],
  data() {
    return {
      modalInfo: null,
    }
  },
  computed: {
    visible() {
      return this.modalInfo;
    },
  },
  methods: {
    updateData() {
      this.modalInfo = this.game.modalInfo;
    },
    close() {
      this.game.modalInfo = null;
    },
  },
}
</script>

<style lang="scss" scoped>
.modal-info {
  z-index: 505;
}
</style>