<script lang="ts" setup>
import SvgIcon from '@/components/SvgIcon.vue'
</script>

<template>
  <div class="header py-4 flex justify-end">
    <button class="menu-item rounded-sm" type="button" title="设置">
      <SvgIcon name="menu" size="24px" />
    </button>
  </div>
</template>

<style lang="scss" scoped>
.menu-item {
  height: 32px;
  width: 32px; 
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    background-color: rgb(209, 213, 219);
  }
}
</style>
