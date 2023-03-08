<script lang="ts" setup>
import { computed, onMounted, ref, onBeforeUnmount } from 'vue'
import SvgIcon from '@/components/SvgIcon.vue'
import useFetchSuggestions from './useFetchSuggestions'
import { throttle } from 'lodash-es'
import useSearch from './useSearch'

const { fetchData, suggestions } = useFetchSuggestions()
const { searchInBing } = useSearch()

const throttleFetchData = throttle(fetchData, 100)

const inputValue = ref('')

const inputActived = ref(false)
const suggestionVisible = computed(() => inputActived.value && inputValue.value.length > 0)

function handleFocus() {
  inputActived.value = true
}

function handleInput(event: Event) {
  throttleFetchData(inputValue.value)
}

const searchBoxRef = ref()

function handleDocumentClick(e: MouseEvent) {
  const target = e.target as HTMLElement
  if (!searchBoxRef.value!.contains(target)) {
    // click outside
    inputActived.value = false
  }
}

function handleSearch() {
  searchInBing(inputValue.value)
  inputActived.value = false
}

onMounted(() => {
  window.addEventListener('click', handleDocumentClick)
})
onBeforeUnmount(() => {
  window.removeEventListener('click', handleDocumentClick)
})
</script>

<template>
  <div ref="searchBoxRef" class="search-box">
    <div
      class="input-container flex h-11 py-1.25 px-4 bg-white"
      :class="{ 'input-container--active': inputActived, 'input-container--bottom-even': suggestionVisible }"
    >
      <div class="pr-3 flex items-center flex-shrink-0">
        <SvgIcon name="bing" size="20px" />
      </div>
      <input
        v-model="inputValue"
        class="grow-1 outline-none"
        type="text"
        placeholder="请输入…"
        maxlength="256"
        autocomplete="off"
        autofocus
        title="搜索"
        @focus="handleFocus"
        @input="handleInput"
        @keyup.enter="handleSearch"
      />
      <div class="pl-3.5 flex items-center flex-shrink-0 cursor-pointer" @click="handleSearch">
        <SvgIcon name="search" size="20px" />
      </div>
    </div>
    <!-- suggestion -->
    <div v-show="suggestionVisible">
      <ul class="pt-1 pb-6 rounded-bl-6 rounded-br-6 bg-white shadow-lg">
        <li
          v-for="(item, index) in suggestions"
          :key="index"
          class="cursor-pointer hover:bg-gray-100"
          @click="handleSearch"
        >
          <div class="mx-4 flex items-center">
            <div class="mr-3 flex-shrink-0">
              <SvgIcon :name="item.type === 'history' ? 'clock' : 'search'" size="20px" />
            </div>
            <div class="py-1.5 grow-1">{{ item.value }}</div>
            <div v-show="item.type === 'history'" class="ml-3.5 flex-shrink-0" title="删除">
              <SvgIcon name="delete" size="20px" />
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<style lang="scss" scoped>
$shadow-lg: 0 10px 8px rgba(0, 0, 0, 0.04), 0 4px 3px rgba(0, 0, 0, 0.1);
.input-container {
  border-radius: 24px;

  &:hover {
    box-shadow: $shadow-lg;
  }
}

.input-container--bottom-even {
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
}
.input-container--active {
  box-shadow: $shadow-lg;
}
</style>
