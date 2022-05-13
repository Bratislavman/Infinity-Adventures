<template>
  <modal class="modal-faq" :title="'Faq'" :visible="visible" :close="close">
    <block-with-title v-for="obj in texts" :key="obj.title" :title="$t(obj.title)">
      <div class="text">{{ $t(obj.text) }}</div>
    </block-with-title>
  </modal>
</template>

<script>
import Modal from "@/components/game/modals/Modal";
import {GameWatcher} from "@/mixins/GameWatcher";
import BlockWithTitle from "@/components/game/BlockWithTitle";

export default {
  name: 'ModalFaq',
  components: {
    Modal,
    BlockWithTitle
  },
  mixins: [GameWatcher],
  data() {
    return {
      modalFaq: false,
      texts: [
        {title: 'help.punct1.title', text: 'help.punct1.text'},
        {title: 'help.punct2.title', text: 'help.punct2.text'},
        {title: 'help.punct3.title', text: 'help.punct3.text'},
        {title: 'help.punct4.title', text: 'help.punct4.text'},
        {title: 'help.punct5.title', text: 'help.punct5.text'},
        {title: 'help.punct6.title', text: 'help.punct6.text'},
        {title: 'help.punct7.title', text: 'help.punct7.text'},
        {title: 'help.punct8.title', text: 'help.punct8.text'},
        {title: 'help.punct9.title', text: 'help.punct9.text'},
      ]
    }
  },
  computed: {
    visible() {
      return this.modalFaq;
    },
  },
  methods: {
    updateData() {
      this.modalFaq = this.game.modalFaq;
    },
    close() {
      this.game.modalFaq = false;
    },
  },
}
</script>

<style lang="scss" scoped>
.modal-faq {
  z-index: 505;
}
</style>