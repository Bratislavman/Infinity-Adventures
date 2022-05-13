<template>
  <modal class="modal-missions" :title="$t('missions')" :visible="visible" :close="close">
    <div class="btns-container_left" v-for="(m,i) in missions" :key ="'mission'+i">
      <div class="text offset-right-1">{{ statusMission(m) }}</div>
      <div class="text">{{ $t(m.name) }}</div>
    </div>
  </modal>
</template>

<script>
import Modal from "@/components/game/modals/Modal";
import {GameWatcher} from "@/mixins/GameWatcher";
import {StatusGameConditionStatus} from "@/constants/constants";

export default {
  name: 'ModalMissions',
  components: {
    Modal
  },
  mixins: [GameWatcher],
  data() {
    return {
      modalMissions: null,
      missions: [],
    }
  },
  computed: {
    visible() {
      return this.modalMissions;
    },
  },
  methods: {
    updateData() {
      this.modalMissions = this.game.modalMissions;
      this.missions =  this.game.getMissions();
    },
    statusMission(obj) {
      return obj.status === StatusGameConditionStatus.Success ? '+' : '□';
    },
    close() {
      this.game.modalMissions = null;
    },
  },
}
</script>

<style lang="scss" scoped>
.modal-missions {
  z-index: 504;
}
</style>