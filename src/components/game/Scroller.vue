<template>
  <my-scroll :ops="ops">
    <slot/>
  </my-scroll>
</template>

<script>
export default {
  name: 'Scroller',
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
}
</script>