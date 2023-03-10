<script setup lang="ts">
import { Header } from './components/header'
import { SearchBox } from './components/search-box'
</script>

<template>
  <div class="bg-gray-200 h-screen min-h-120">
    <div class="container mx-a h-full px-8">
      <Header />
      <h1 class="text-center text-4xl mb-5">🛫</h1>
      <SearchBox class="mx-a w-auto max-w-xl" />
    </div>
  </div>
</template>

<style scoped></style>
