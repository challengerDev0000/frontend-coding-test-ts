<script setup lang="ts">
import { onMounted, ref, watch, inject, reactive } from 'vue'
import { useToast } from '../composables/toast'
import { API_RESP_STATUS } from '../config/config'
import { getMediaPageData } from '../services/index'
import { Media } from '../types/Media'
import Pagination from '../components/common/Pagination.vue'

interface State {
  mediaList: Media[]
  totalCnt: number
  isLoading: boolean
  error: Error | null
}

const state: State = reactive({
  mediaList: [],
  totalCnt: 0,
  isLoading: true,
  error: null,
})

const { toast } = useToast()
const currentPage = ref<number>(1)
const perPage = ref<number>(10)

onMounted(async () => {
  state.isLoading = true
  await getMediaPageData(currentPage.value, perPage.value).then((response) => {
    if (response.status === API_RESP_STATUS.SUCCESS) {
      toast('Anime Media List loaded successfully')
      state.mediaList = response.data.Page.media
      state.totalCnt = response.data.Page.pageInfo.total
      state.isLoading = false
    } else {
      toast('Anime List loading Failed')
      state.mediaList = []
    }
  })
})

watch([currentPage, perPage], async () => {
  state.isLoading = true
  await getMediaPageData(currentPage.value, perPage.value).then((response) => {
    if (response.status === API_RESP_STATUS.SUCCESS) {
      toast('Anime Media List fetched successfully')
      state.mediaList = response.data.Page.media
      state.isLoading = false
    } else {
      toast('Anime List fetched Failed')
      state.mediaList = []
    }
  })
})
</script>

<template>
  <div class="flex flex-col mt-10">
    <div class="font-semibold text-gray-600 m-2 text-3xl">Anime Media List</div>

    <div v-if="state.isLoading == true" class="text-gray-600 text-xl">
      Loading Media ...
    </div>
    <div v-else class="flex flex-col">
      <div class="flex my-4 justify-start">
        There are totally {{ state.totalCnt }} anime medias
      </div>
      <Pagination
        :currentPage="currentPage"
        :perPage="perPage"
        :totalCnt="state.totalCnt"
        @update:currentPage="currentPage = $event"
      />
      <div class="flex flex-col border divide-y rounded mt-4 w-[600px] mx-auto">
        <div v-for="media in state.mediaList" :key="media.id">
          <router-link
            :to="'/animeDetail/' + media.id"
            class="flex items-center justify-start p-2 gap-3"
          >
            <img :src="media.coverImage.medium" class="w-10 h-10" />
            {{ media.title.native }}
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>