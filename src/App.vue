<template>
  <div id="app" :style="bg">
    <div class="timer">
      {{ timeFormed }}
    </div>
    <main>
      <game v-if="game"/>
      <start-game v-else/>
    </main>
  </div>
</template>

<script>
import StartGame from "@/components/start-game/StartGame";
import Game from "@/components/game/Game";
import {GET_GAME} from "@/store/game";
import {timeInMinutes} from "@/helpers/game";

export default {
  name: 'App',
  components: {
    StartGame,
    Game,
  },
  data() {
    return {
      locations: [],
      heroes: [],
      currentHero: null,
      moveIcon: '',
      timeId: 0,
      time: 0,

      visibleFaq: false,
    }
  },
  mounted() {
    this.timeId = setInterval(() => this.timer(), 1000);
  },
  computed: {
    timeFormed() {
      return timeInMinutes(this.time);
    },
    game() {
      return this.$store.getters[GET_GAME];
    },
    bg() {
      if (this.game) {
        const bg = require(`@/assets/images/${this.game.background}`);
        return `background: no-repeat url("${bg}"; background-size: 100% 100%`;
      }
      return '';
    },
  },
  methods: {
    timer() {
      this.time += 1000;
    }
  }
}
</script>

<style lang="scss" scoped>
#app {
  position: relative;
}

.timer {
  position: absolute;
  z-index: 1000;
  background: $whiteX;
  color: $white0;
  border-radius: 10px;
  top: 0px;
  right: 10px;
  width: 100px;
  height: 20px;
  font-size: 12px;
}
</style>