<template>
  <modal class="modal-game-object-info" title="" :visible="gameObject" :close="close">
    <template v-if="gameObject">
      <block-with-title :title="$t(gameObject.name)">
        <div class="description text">{{ gameObject.description }}</div>
      </block-with-title>

      <template v-if="gameObject.isCharacter">
        <block-with-title v-if="gameObject.characteristics.length > 0" :title="$t('characteristics')">
          <div :class="characteristicsClasses(c)" v-for="(c, i) in gameObject.characteristics"
               :key="'characteristics'+i">
            {{ $t(c.name) + ' ' + c.value }}
          </div>
        </block-with-title>

        <block-with-title v-if="gameObject.abilities.length > 0" :title="$t('abilities')">
          <div class="align_left color_white" v-for="(a,i) in gameObject.abilities" :key="'abilities'+i">
            {{ a.getDescription() }}
          </div>
        </block-with-title>

        <block-with-title v-if="gameObject.items.length > 0" :title="$t('items')">
          <div class="align_left color_white" v-for="(i, ind) in gameObject.items" :key="'items'+ind">
            {{ i.getDescription() }}
          </div>
        </block-with-title>

        <block-with-title v-if="gameObject.effects.length > 0" :title="$t('effects')">
          <div :class="effectClasses(e)" v-for="(e, i) in gameObject.effects" :key="'effects'+i">
            {{ e.getDescription() }}
          </div>
        </block-with-title>
      </template>
    </template>
  </modal>
</template>

<script>
import BlockWithTitle from "@/components/game/BlockWithTitle";
import {GameWatcher} from "@/mixins/GameWatcher";
import Modal from "@/components/game/modals/Modal";

export default {
  name: 'GameObjectInfo',
  components: {
    BlockWithTitle,
    Modal,
  },
  mixins: [GameWatcher],
  data() {
    return {
      gameObject: null,
    }
  },
  methods: {
    characteristicsClasses(obj) {
      return {
        [obj.status]: true,
      }
    },
    effectClasses(obj) {
      return {
        'align_left': true,
        [obj.type]: true,
      }
    },
    updateData() {
      this.gameObject = this.game.modalGameObjectInfo;
    },
    close() {
      this.game.modalGameObjectInfo = null;
    },
  },
}
</script>

<style lang="scss" scoped>
.modal-game-object-info {
  z-index: 101;

  .description {
    text-align: left;
  }
}
</style>