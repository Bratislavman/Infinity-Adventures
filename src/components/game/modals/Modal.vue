<template>
  <div v-if="visible" class="modal">
    <div class="container">
      <scroller>
        <div v-if="title" class="title">
          {{ title }}
        </div>
        <div class="content">
          <slot/>
        </div>
      </scroller>
      <div v-if="close" class="close" @click="close">x</div>
    </div>
  </div>
</template>

<script>
import Scroller from "@/components/game/Scroller";

export default {
  name: 'Modal',
  props: {
    title: {
      type: String,
      default: '',
    },
    visible: {
      type: Boolean | Object,
      required: true,
    },
    close: {
      type: Function | null,
      default: () => {}
    }
  },
  components: {
    Scroller
  },
}
</script>

<style lang="scss" scoped>
.modal {
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0px;
  left: 0px;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;

  .container {
    width: 100%;
    max-width: 630px;
    height: 100%;
    max-height: 600px;
    border: 1px solid $white0;
    box-sizing: border-box;
    border-radius: 10px;
    position: relative;
    background: $grey;
    padding: 20px;
  }

  .title {
    color: $white0;
    margin-bottom: 30px;
    font-size: 18px;
  }

  .content {

  }

  .close {
    width: 25px;
    height: 25px;
    border-radius: 100px;
    border: 1px solid $white0;
    box-sizing: border-box;
    position: absolute;
    top: -7px;
    right: -8px;
    text-align: center;
    background: $grey;
    color: $white0;
    cursor: pointer;
  }
}
</style>