<template>
  <modal class="modal-location-objs" :title="$t('environment')" :visible="visible" :close="close">
    <template v-if="visible">
      <div v-for="obj in objs" :class="classesObject(obj)">
        <game-img :obj="obj"/>
        <div class="name">{{ name(obj) }}</div>
        <div class="actions">
          <img v-if="haveGameObjectActions(obj)" class="action" src="@/assets/images/action.jpg"
               @click="showGameObjectActions(obj)" :title="$t('actions')"/>
          <img v-if="checkCharacter(obj)" class="action info" src="@/assets/images/faq.jpg"
               @click="showGameObjectInfo(obj)" :title="$t('info')"/>
        </div>
      </div>
    </template>
  </modal>
</template>

<script>
import Modal from "@/components/game/modals/Modal";
import {GET_GAME} from "@/store/game.js";
import {Character} from "@/game/game-object/Character";
import {CharacterBehaviorTypes, HP_MAX} from "@/constants/constants";
import GameImg from "@/components/game/GameImg";

export default {
  name: 'ModalLocationGameObjects',
  components: {
    Modal,
    GameImg
  },
  data() {
    return {
      objs: [],
      location: null,
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
      return this.objs && this.objs.length > 0;
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
    classesObject(obj) {
      return {
        'modal-location-obj': true,
        'modal-location-obj_hero': obj.behaviorType === CharacterBehaviorTypes.Hero,
        'modal-location-obj_enemy': obj.behaviorType === CharacterBehaviorTypes.Combat,
      }
    },
    updateData() {
      const obj = this.game.modalLocationGameObjects;
      if (obj) {
        const {objs, location} = obj;
        this.objs = objs;
        this.location = location;
      }
    },
    name(obj) {
      if (this.checkCharacter(obj)) {
        return this.$t('gameObjectLife', {
          name: this.$t(obj.name),
          hp: obj.hp,
          hpMax: obj.getCharacteristic(HP_MAX),
        });
      }
      return this.$t(obj.name);
    },
    checkCharacter(obj) {
      return obj instanceof Character;
    },
    showGameObjectActions(obj) {
      this.game.modalActionsList = this.game.getHeroActionsForObject(obj);
    },
    haveGameObjectActions(obj) {
      return this.game.getHeroActionsForObject(obj).length > 0;
    },
    showGameObjectInfo(obj) {
      this.game.showGameObjectInfo(obj);
    },
    close() {
      this.game.modalLocationGameObjects = [];
    },
  },
}
</script>

<style lang="scss" scoped>
.modal-location-objs {

}

.modal-location-obj {
  border: 1px solid $white0;
  color: $white0;
  box-sizing: border-box;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  margin-bottom: 10px;
  height: 48px;

  &:last-child {
    margin-bottom: 0px;
  }

  .name {

  }

  .actions {
    height: 100%;
  }

  .action {
    width: auto;
    height: 100%;
    border-radius: 5px;
    cursor: pointer;
    margin-right: 10px;

    &:last-child {
      margin-right: 0px;
    }
  }

  &_hero {
    border: 1px solid $green2;
    color: $green2;
  }

  &_enemy {
    border: 1px solid $red2;
    color: $red2;
  }
}

</style>