<script setup lang="ts">
import { onMounted, ref, reactive } from 'vue'
import { useRoute } from 'vue-router'
import { useToast } from '../composables/toast'
import { getMediaDetail } from '../services'
import { API_RESP_STATUS } from '../config/config'
import { Media } from '../types/Media'
const { toast } = useToast()
const route = useRoute()
const id = route.params.id as string
const mediaData = ref<Media | null>(null)

interface State {
  mediaDetail: Media | null
  isLoading: boolean
  error: Error | null
}

const state: State = reactive({
  mediaDetail: null,
  isLoading: true,
  error: null,
})

const fetch = async (id: number) => {
  state.isLoading = true
  await getMediaDetail(id).then((response) => {
    if (response.status === API_RESP_STATUS.SUCCESS) {
      state.isLoading = false
      state.mediaDetail = response.data.Media
      console.log(state.mediaDetail)
      toast(
        'Anime Media "' +
          response.data.Media.title.english +
          '" Detail loaded successfully',
      )
    } else {
      toast('Anime Media Detail loading Failed')
    }
  })
}

onMounted(async () => {
  await fetch(+id)
})
</script>

<template>
  <div class="flex flex-col mt-10 text-left max-w-4xl justify-center items-center">
    <button
      type="button"
      class="flex w-[200px] text-left items-center justify-center px-5 py-2 text-sm text-gray-700 transition-colors duration-200 bg-white border rounded-lg gap-x-2 hover:bg-gray-100"
      v-on:click="$router.back()"
    >
      <svg
        class="w-5 h-5 rtl:rotate-180"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"
        />
      </svg>
      <span>Go back</span>
    </button>

    <div v-if="state.isLoading == true" class="text-gray-600 text-xl">
      Loading Media ...
    </div>
    <div v-else class="flex flex-col w-[500px] justify-center items-center">
      <div class="font-semibold text-gray-600 m-2 text-3xl">
        {{ state.mediaDetail.title.english }}
      </div>
      <div>
        <img :src="state.mediaDetail.bannerImage" class="max-w-lg w-full" />
      </div>
      <div class="mt-5 justify-start w-full">
        <h3 class="text-xl font-semibold">Details</h3>
        <p class="text-gray-600 mt-2">
          <span class="font-semibold">Title(English):</span>
          {{ state.mediaDetail.title.english }}
        </p>
        <p class="text-gray-600 mt-2">
          <span class="font-semibold">Title(Native):</span>
          {{ state.mediaDetail.title.native }}
        </p>
        <p class="text-gray-600 mt-2">
          <span class="font-semibold">Type:</span>
          {{ state.mediaDetail.type }}
        </p>
        <p class="text-gray-600 mt-2">
          <span class="font-semibold">Chapters:</span>
          {{ state.mediaDetail.chapters }}
        </p>
        <p class="text-gray-600 mt-2">
          <span class="font-semibold">Volumes:</span>
          {{ state.mediaDetail.volumes }}
        </p>
        <p class="text-gray-600 mt-2">
          <span class="font-semibold">Popularity:</span>
          {{ state.mediaDetail.popularity }}
        </p>
        <p class="text-gray-600 mt-2">
          <span class="font-semibold">Favourites:</span>
          {{ state.mediaDetail.favourites }}
        </p>
      </div>
    </div>
  </div>
</template>