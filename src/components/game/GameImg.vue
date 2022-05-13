<template>
    <img :src="img"/>
</template>

<script>

export default {
  name: 'LocationGameObject',
  props: ['obj'],
  data() {
    return {
      img: '',
    }
  },
  created() {
    this.img = require(`@/assets/images/${this.obj.icon}`);
  },
}
</script>