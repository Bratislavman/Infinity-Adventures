<template>
  <div class="stories">
    <carousel class="story-slider" :perPage="1" @pageChange="pageChange">
      <slide v-for="(story, i) in stories" :key="story.title + i">
        <div class="slide">
          <div class="story-slider__title">
            {{ $t(story.title) }}
          </div>
          <div class="story-slider__description">
            {{ $t(story.description) }}
          </div>
        </div>
      </slide>
    </carousel>
    <button @click="start">{{ $t('start') }}</button>
  </div>
</template>

<script>
import {Carousel, Slide} from 'vue-carousel';
import {GET_STORIES, MUTATION_GAME_INIT} from "@/store/game";

export default {
  name: 'StorySlider',
  components: {
    Carousel,
    Slide,
  },
  data() {
    return {
      stories: [],
      index: 0,
    }
  },
  mounted() {
    this.stories = this.$store.getters[GET_STORIES];
  },
  methods: {
    start() {
      if (this.index === 0) {
        this.$store.commit(MUTATION_GAME_INIT, this.index);
      } else {
        alert(this.$t('missions_not'));
      }

    },
    pageChange(index) {
      this.index = index;
    },
  },
}
</script>
<style lang="scss">
.stories {

}
.story-slider {

  &__title {

  }
}
</style>