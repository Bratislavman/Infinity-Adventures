<template>
  <div class="start-game">
    <h1>{{ $t('start_game.title') }}</h1>
    <story-slider/>
  </div>
</template>

<script>
import StorySlider from "@/components/start-game/StorySlider";

export default {
  name: 'StartGame',
  components: {
    StorySlider,
  },
}
</script>