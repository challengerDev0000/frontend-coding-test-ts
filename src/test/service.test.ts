import { describe, it, expect, vi } from 'vitest'
import { getMediaPageData, getMediaDetail } from '../services/index'

vi.useFakeTimers()

describe('API functions', () => {
  it('should fetch media page data successfully', async () => {
    const currentPage = 1
    const perPage = 10

    const result = await getMediaPageData(currentPage, perPage)

    expect(result.status).toBe('success')
    expect(result.data).toBeDefined()
    // Add further assertions based on your response structure
  })

  it('should fetch media detail successfully', async () => {
    const mediaId = 123 // Replace with an actual media ID

    const result = await getMediaDetail(mediaId)

    expect(result.status).toBe('success')
    expect(result.data).toBeDefined()
    // Add further assertions based on your response structure
  })
})
