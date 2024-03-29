<template>
  <div v-if="game" class="game">
    <div class="main">
      <div class="interface">
        <div class="heroes">
          <template v-for="hero in heroes">
            <hero v-if="hero.hp > 0" :key="hero.id" :hero="hero" :currentHero="currentHero"/>
          </template>
        </div>
        <div class="main-btns">
          <div @click="endTurn" class="main-btn end-turn-btn" :title="$t('end_turn')">
            <img class="icon" src="@/assets/images/end_turn.jpg"/>
          </div>
          <div @click="openMenu" class="main-btn faq modal" :title="$t('faq')">
            <img class="icon" src="@/assets/images/faq.jpg"/>
          </div>
        </div>
      </div>
      <div class="zone">
        <my-scroll ref="vs" :ops="locationScrollerOps">
          <div class="locations">
            <div class="location-row" v-for="(locationRow, i) in locations" :key="'location-row'+i">
              <location
                  v-for="location in locationRow"
                  :location="location"
                  :key="'location'+location.id"
              />
            </div>
          </div>
        </my-scroll>
      </div>
    </div>

    <event-log/>

    <action-list/>
    <game-object-info/>
    <info/>
    <modal-menu/>
    <missions/>
    <location-game-objects/>
    <select-targets/>
    <end-game/>
  </div>
</template>

<script>
import Location from "@/components/game/Location";
import EventLog from "@/components/game/EventLog";
import Hero from "@/components/game/Hero";
import ActionList from "@/components/game/modals/ActionList";
import GameObjectInfo from "@/components/game/modals/GameObjectInfo";
import LocationGameObjects from "@/components/game/modals/LocationGameObjects";
import SelectTargets from "@/components/game/modals/SelectTargets";
import Info from "@/components/game/modals/Info";
import ModalMenu from "@/components/game/modals/Menu";
import Missions from "@/components/game/modals/Missions";
import EndGame from "@/components/game/modals/EndGame";
import {GameWatcher} from "@/mixins/GameWatcher";

export default {
  name: 'Game',
  components: {
    Location,
    EventLog,
    Hero,
    ActionList,
    GameObjectInfo,
    LocationGameObjects,
    SelectTargets,
    Info,
    ModalMenu,
    Missions,
    EndGame,
  },
  mixins: [GameWatcher],
  data() {
    return {
      locations: [],
      heroes: [],
      currentHero: null,
      moveIcon: '',
      locationScrollerOps: {
        vuescroll: {
          mode: 'native'
        }
      }
    }
  },
  methods: {
    openMenu() {
      this.game.modalMenu = true;
    },
    scrollIntoView() {
      this.$nextTick(() => {
        if (this.game.centeringOnHero) {
          this.$refs["vs"].scrollIntoView("#location" + this.currentHero.locationId, 0);
          this.game.centeringOnHero = false;
        }
      });
    },
    updateData() {
      this.currentHero = this.game.currentHero();

      if (this.currentHero) {
        this.locations = this.game.currentZoneLocations();
        this.heroes = this.game.getHeroes();
        this.scrollIntoView();
      }
    },
    endTurn() {
      this.game.endHeroTurn();
    },

  },
}
</script>

<style lang="scss">
.game {
  width: 1200px;
  height: 100%;
  margin: 0 auto;
  border: 1px solid black;
  box-sizing: border-box;
  border-radius: 10px;
  padding: 0.5%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background: $grey2;
}

.locations {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.location-row {
  display: flex;
}

.zone {
  margin-top: 80px;
  position: relative;
  z-index: 1;
  height: calc(100% - 80px);
  width: 100%;

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
}

.main-btns {
  display: flex;
}

.main-btn {
  margin-bottom: 5px;
  margin-right: 5px;
  padding-top: 5px;
  position: relative;
  z-index: 2;

  &:last-child {

  }
}

.interface {
  position: absolute;
  width: 100%;

  top: 0px;
  left: 0px;
  display: flex;
  align-items: start;
  justify-content: space-between;
}

.heroes {
  display: flex;
  padding: 5px;
}

.icon {
  width: 50px;
  height: 50px;
  cursor: pointer;
  border-radius: 5px;
  border: 1px solid $grey;
  box-sizing: border-box;
}

.main {
  height: calc(100% - 35%);
  border: 1px solid black;
  box-sizing: border-box;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: start;
  position: relative;
}
</style>