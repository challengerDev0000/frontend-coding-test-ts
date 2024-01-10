<template>
  <div class="pagination flex items-center justify-center mt-4 space-x-2">
    <button
      :disabled="currentPage === 1"
      @click="goToFirstPage"
      class="pagination-button"
    >
      &#60;&#60;
    </button>
    <button
      :disabled="currentPage === 1"
      @click="decrementPage"
      class="pagination-button"
    >
      &#60;
    </button>
    <button
      v-if="visiblePages[0] !== 1"
      @click="goToPage(1)"
      :class="{ 'font-bold': currentPage === 1 }"
      class="pagination-button"
    >
      1
    </button>
    <span v-if="visiblePages[0] !== 1">...</span>
    <button
      v-for="pageNumber in visiblePages"
      :key="pageNumber"
      @click="goToPage(pageNumber)"
      :class="{ 'font-bold': currentPage === pageNumber }"
      class="pagination-button"
    >
      {{ pageNumber }}
    </button>
    <span v-if="visiblePages[visiblePages.length - 1] !== lastPage">...</span>
    <button
      v-if="visiblePages[visiblePages.length - 1] !== lastPage"
      @click="goToPage(lastPage)"
      :class="{ 'font-bold': currentPage === lastPage }"
      class="pagination-button"
    >
      {{ lastPage }}
    </button>
    <button
      :disabled="currentPage === lastPage"
      @click="incrementPage"
      class="pagination-button"
    >
      &#62;
    </button>
    <button
      :disabled="currentPage === lastPage"
      @click="goToLastPage"
      class="pagination-button"
    >
      &#62;&#62;
    </button>
  </div>
</template>

<script setup lang='ts'>
import { ref, onMounted, watch, defineProps, defineEmits } from 'vue'
import { PAGINATION_VISIBLE_COUNT } from '../../config/config'

const props = defineProps({
  currentPage: Number,
  perPage: Number,
  totalCnt: Number,
})

const emit = defineEmits(['update:currentPage'])
const visiblePages = ref<number[]>([])
const lastPage = ref<number>(0)

function generateVisiblePageNumbers() {
  lastPage.value = Math.ceil((props.totalCnt ?? 0) / (props.perPage ?? 10))

  let startPage = Math.max(
    1,
    (props.currentPage ?? 1) - Math.floor(PAGINATION_VISIBLE_COUNT / 2),
  )
  const endPage = Math.min(
    lastPage.value,
    startPage + PAGINATION_VISIBLE_COUNT - 1,
  )

  const pages = []
  if (lastPage.value > PAGINATION_VISIBLE_COUNT) {
    const maxStartPage = lastPage.value - PAGINATION_VISIBLE_COUNT + 1
    if (startPage > maxStartPage) {
      startPage = maxStartPage
    }
  }

  for (let i = startPage; i <= endPage; i++) {
    pages.push(i)
  }
  return pages
}

onMounted(() => {
  visiblePages.value = generateVisiblePageNumbers()
})

watch(
  [() => props.currentPage, () => props.perPage, () => props.totalCnt],
  () => {
    visiblePages.value = generateVisiblePageNumbers()
  },
)

function goToPage(pageNumber: number) {
  emit('update:currentPage', pageNumber)
}

function goToFirstPage() {
  emit('update:currentPage', 1)
}

function goToLastPage() {
  emit('update:currentPage', lastPage.value)
}

function incrementPage() {
  if ((props.currentPage ?? 1) < lastPage.value) {
    emit('update:currentPage', (props.currentPage ?? 1) + 1)
  }
}

function decrementPage() {
  if ((props.currentPage ?? 1) > 1) {
    emit('update:currentPage', (props.currentPage ?? 1) - 1)
  }
}
</script>

<style>
.pagination-button {
  padding: 0.5rem 1rem;
  border: 1px solid #ddd;
  background-color: #fff;
  color: #333;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s;
  text-decoration: none;
}
.pagination-button:hover {
  background-color: #f0f0f0;
  color: #555;
}

.pagination-button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
</style>
