<template>
  <div :id="'location'+location.id" :class="classes">
    <my-scroll ref="vs" :ops="ops">
      <span v-for="obj in objectLocations" :key="obj.id + obj.icon" @click="handlerGameObject(obj)">
        <game-img :class="classesObject(obj)"
                  :obj="obj"

        />
      </span>
    </my-scroll>
    <button class="location__btn btn" :disabled="!location.btnText" @click="handlerLocation">
      <template v-if="location.btnText">
        {{ location.btnText }}
      </template>
    </button>
  </div>
</template>

<script>
import GameImg from "@/components/game/GameImg";
import Scroller from "@/components/game/Scroller";
import {LocationEmpty} from "@/game/location/LocationEmpty";
import {CharacterBehaviorTypes} from "@/constants/constants";
import {GameWatcher} from "@/mixins/GameWatcher";

export default {
  name: 'Location',
  props: ['location'],
  mixins: [GameWatcher],
  components: {
    GameImg,
    Scroller,
  },
  data() {
    return {
      nearestLocationsIds: [],
      objectLocations: [],
      ops: {
        scrollPanel: {
          scrollingX: false,
        },
        vuescroll: {
          mode: 'native'
        }
      },
    }
  },
  computed: {
    classes() {
      const isNearestLocation = this.nearestLocationsIds.find((id) => this.location.id === id);
      const currentHero = this.game.currentHero();
      if (currentHero) {
        return {
          'location': true,
          'location_empty': this.location instanceof LocationEmpty,
          'location_explored': this.location.isOpen,
          'location_unexplored': !this.location.isOpen,
          'location_can-go': Boolean(isNearestLocation),
          'location_current-hero': currentHero.locationId === this.location.id,
        }
      }
      return {'location_loss': true, 'location': true};
    },
  },
  methods: {
    updateData() {
      this.nearestLocationsIds = this.game.getNearestLocationsIds();
      this.objectLocations = this.game.getLocationGameObjects(this.location);
    },
    classesObject(obj) {
      const currentHero = this.game.currentHero();
      if (currentHero) {
        return {
          'location__object': true,
          'location__object_current-hero': currentHero.id === obj.id,
          'location__object_hero': obj.behaviorType === CharacterBehaviorTypes.Hero,
          'location__object_enemy': obj.behaviorType === CharacterBehaviorTypes.Combat,
        }
      }
      return {'location__object': true};
    },
    handlerLocation() {
      this.game.handlerLocation(this.location.id);
    },
    handlerGameObject(gameObj) {
      console.log(345345);
      this.game.handlerGameObject(gameObj.id);
    },
  }
}
</script>

<style lang="scss">
.location {
  width: 150px;
  height: calc(150px - 1px);
  background: $grey3;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-content: center;
  margin: 1px;
  padding: 2px;
  padding-bottom: 25px;
  border-radius: 5px;
  cursor: pointer;
  position: relative;

  &__btn {
    background: $black0;
    color: $white;
    height: 25px;
    font-size: 12px;
    position: absolute;
    bottom: 0px;
  }

  &::-webkit-scrollbar {
    width: 10px;
  }

  &::-webkit-scrollbar-track {
    box-shadow: inset 0 0 5px grey;
    background: $black1;
    border-radius: 10px;
  }

  &::-webkit-scrollbar-thumb {
    background: $white;
    border-radius: 10px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: $white;
  }

  &__object {
    width: 40px;
    height: 40px;
    border-radius: 5px;
    border: 2px solid black;
    box-sizing: border-box;
    margin: 2px;

    &_hero {
      border-color: $green2;
    }

    &_enemy {
      border-color: $red2;
    }

    &_current-hero {
      border-color: $yellow;
    }
  }

  &_current-hero {
    background: $yellow2;
  }

  &_loss {
    background: $whiteX;
  }

  &_unexplored {
    background: $black2;
  }

  &_can-go {
    background: $green;
  }

  &_empty {
    background: transparent;
  }
}
</style>