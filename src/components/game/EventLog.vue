<template>
  <div class="event-log">
    <my-scroll :ops="ops" ref="vs">
      <div class="event-log__message" v-for="(message, i) in gameMessages" :key="'message' + i">
        <div class="event-log__date">[{{ message.date }}]</div>
        <div class="event-log__text">{{ message.text }}</div>
      </div>
    </my-scroll>
  </div>
</template>

<script>
import {GET_GAME, INIT_GAME} from "@/store/game";

export default {
  name: 'EventLog',
  data() {
    return {
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
  mounted() {
    this.scrollDown();
  },
  methods: {
    scrollDown() {
      setTimeout(() => {
        if (this.$refs["vs"]) {
          this.$refs["vs"].scrollTo(
              {
                y: "100%"
              },
              1
          );
        }
      });
    },
  },
  computed: {
    gameMessages() {
      this.scrollDown();
      return this.$store.getters[GET_GAME].messages;
    },
  },
}
</script>
<style lang="scss">
.event-log {
  height: 35%;
  border: 1px solid black;
  border-radius: 10px;
  text-align: left;
  padding: 10px;
  margin-top: 0.5%;
  background: $black1;

  &__message {
    margin-bottom: 7px;
    overflow-wrap: break-word;
  }

  &__date {
    font-size: 8px;
    color: $white;
  }

  &__text {
    color: $white;
    font-size: 14px;
  }

}
</style>