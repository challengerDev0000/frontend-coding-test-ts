import { API_RESP_STATUS } from '../config/config'
import { mediaDetail_payload, mediaList_payload } from '../graphQL/AnimeMedia'

export const getMediaPageData = async (
  currentPage: number,
  perPage: number,
) => {
  try {
    const response = await fetch('https://graphql.anilist.co', {
      method: 'POST',
      body: JSON.stringify(mediaList_payload(currentPage, perPage)),
      mode: 'cors',
      headers: {
        Accept: '*/*',
        'Content-Type': 'application/json',
      },
    })
    if (response.ok) {
      const { data } = await response.json()
      return {
        status: API_RESP_STATUS.SUCCESS,
        data: data,
      }
    } else {
      throw 'Error fetching Anime Media List'
    }
  } catch (error) {
    return {
      status: API_RESP_STATUS.FAIL,
      data: 'Error fetching data',
    }
  }
}

export const getMediaDetail = async (id: number) => {
  try {
    const response = await fetch('https://graphql.anilist.co', {
      method: 'POST',
      body: JSON.stringify(mediaDetail_payload(id)),
      mode: 'cors',
      headers: {
        Accept: '*/*',
        'Content-Type': 'application/json',
      },
    })
    if (response.ok) {
      const { data } = await response.json()
      return {
        status: API_RESP_STATUS.SUCCESS,
        data: data,
      }
    } else {
      throw 'Error fetching Anime Media Detail'
    }
  } catch (error) {
    return {
      status: API_RESP_STATUS.FAIL,
      data: 'Error fetching data',
    }
  }
}
