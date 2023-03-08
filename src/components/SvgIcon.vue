<script lang="ts" setup>
import { computed } from 'vue'

const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    default: '#000',
  },
  size: {
    type: String,
    default: '1em',
  },
})

const symbolId = computed(() => `#icon-${props.name}`)
const style = computed(() => {
  return {
    height: props.size,
    width: props.size,
  }
})
</script>

<template>
  <svg class="svg-icon" aria-hidden="true" :style="style">
    <use :href="symbolId" :fill="color" />
  </svg>
</template>

<style scoped>
.svg-icon {
  vertical-align: -0.15em;
  overflow: hidden;
}
</style>
