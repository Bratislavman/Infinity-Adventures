<template>
  <div :id="'location'+location.id" :class="classes" @click="handlerLocation(location)">
    <game-img :class="classesObject(obj)" v-for="obj in objectLocations" :key="obj.constructor.name + obj.id + Math.random()"
              :obj="obj"/>
  </div>
</template>

<script>
import {LocationEmpty} from "@/game/location/LocationEmpty";
import {GET_GAME} from "@/store/game.js";
import GameImg from "@/components/game/GameImg";
import {CharacterBehaviorTypes} from "@/constants/constants";

export default {
  name: 'Location',
  props: ['location', 'handlerLocation'],
  components: {
    GameImg,
  },
  data() {
    return {
      nearestLocationsIds: [],
      objectLocations: [],
    }
  },
  watch: {
    game: {
      deep: true,
      handler() {
        this.updateData();
      }
    }
  },
  created() {
    this.updateData();
  },
  computed: {
    game() {
      return this.$store.getters[GET_GAME];
    },
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
      return { 'location_loss': true, 'location': true };
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
        }
      }
     return {'location__object': true };
    },
  }
}
</script>

<style lang="scss">
.location {
  width: 150px;
  height: 150px;
  background: $grey3;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-content: center;
  margin: 1px;
  border-radius: 5px;
  cursor: pointer;
  overflow: auto;

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