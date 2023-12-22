<script setup>
defineProps({
  direction: {
    validator(v) {
      return ['up', 'down', 'left', 'right'].includes(v)
    }
  }
})
</script>
<template>
  <svg focusable="false" :class="direction" viewBox="0 0 24 24">
    <path d="M7 14l5-5 5 5H7z"></path>
  </svg>
</template>
<style lang="scss" scoped>
svg {
  display: block;
  &.up {
    transform: rotate(0deg);
  }
  &.down {
    transform: rotate(180deg);
  }
  &.left {
    transform: rotate(90deg);
  }

  &.right {
    transform: rotate(240deg);
  }
}
</style>
