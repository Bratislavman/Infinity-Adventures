<template>
  <div class="block">
    <div class="title">{{ title }}</div>
    <slot/>
  </div>
</template>

<script>
export default {
  name: 'BlockWithTitle',
  props: ['title'],
}
</script>