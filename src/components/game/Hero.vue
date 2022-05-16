<template>
  <div :class="classes">
    <img class="hero__icon" :src="img"/>
    <div class="hero-data">
      <div class="hero__name">{{ $t(hero.name) }}</div>
      <div class="hero__chars">
        <div v-for="(c, i) in chars" :key="i" :class="'hero-char ' + c.classes" :title="$t(c.text)">
          <img class="hero-char__icon" :src="c.icon"/>
          <div class="hero-char__values">
            <div class="hero-char__value">{{ c.value }} / {{ c.valueMax }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {HP_MAX, ACTIONS_POINTS_MAX, MOVE_POINTS_MAX} from "@/constants/constants";

export default {
  name: 'Hero',
  props: ['hero', 'currentHero'],
  computed: {
    chars() {
      return [
        {
          icon: require(`@/assets/images/hp.jpg`),
          value: this.hero.hp,
          valueMax: this.hero.getCharacteristic(HP_MAX),
          classes: 'hero-char-hp',
          text: 'hp'
        },
        {
          icon: require(`@/assets/images/action.jpg`),
          value: this.hero.actionsPoints,
          valueMax: this.hero.getCharacteristic(ACTIONS_POINTS_MAX),
          classes: 'hero-char-ap',
          text: 'actionsPoints'
        },
        {
          icon: require(`@/assets/images/hero_move.jpg`),
          value: this.hero.movePoints,
          valueMax: this.hero.getCharacteristic(MOVE_POINTS_MAX),
          classes: 'hero-char-mp',
          text: 'movePoints'
        },
      ]
    },
    img() {
      return require(`@/assets/images/${this.hero.icon}`);
    },
    classes() {
      return {
        'hero': true,
        'hero-current': this.hero.id === this.currentHero.id,
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.hero {
  opacity: 0.5;
  margin-bottom: 10px;
  display: flex;
  width: 307px;
  height: 50px;
  border: 1px solid $grey4;
  box-sizing: border-box;
  margin-right: 10px;
  background: $white;
  position: relative;
  z-index: 2;

  &:last-child {
    margin-bottom: 0px;
    margin-right: 0px;
  }

  &-data {

  }

  &__name {
    text-align: left;
    font-size: 13px;
    padding: 5px;
    padding-bottom: 0px;
    font-weight: bold;
  }

  &__chars {
    display: flex;
    padding: 5px;
  }

  &__icon {
    width: 50px;
  }

  &-char {
    display: flex;
    margin-right: 10px;

    &__icon {
      width: 18px;
      height: 18px;
    }

    &__values {

    }

    &__value {
      font-size: 10px;
      width: 46px;
      height: 18px;
      border: 1px solid $grey4;
      box-sizing: border-box;
      padding: 3px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: $white;
      border-top-right-radius: 10px;
      border-bottom-right-radius: 10px;

      &-max {
        border-top: none;
      }
    }
  }
}

.hero-current {
  opacity: 1;
  border: 1px solid $yellow;
}
</style>