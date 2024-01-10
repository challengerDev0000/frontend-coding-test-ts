import { describe, it, expect, vi, beforeEach } from 'vitest'
import { ref } from 'vue'
import { useToast, addToast, removeToast } from '../../composables/toast'

vi.useFakeTimers()

describe('useToast', () => {
  let toasts: ReturnType<typeof ref>

  beforeEach(() => {
    toasts = ref([])
  })

  it('initializes with no toasts', () => {
    expect(toasts.value).toHaveLength(0)
  })

  it('adds a new toast', () => {
    addToast('Test message', toasts)
    expect(toasts.value).toHaveLength(1)
    expect(toasts.value[0].message).toBe('Test message')
  })

  it('removes a toast by ID', () => {
    addToast('Test message', toasts)
    const id = toasts.value[0].id
    removeToast(id, toasts)
    expect(toasts.value).toHaveLength(0)
  })

  it('automatically removes a toast after TIMEOUT', () => {
    addToast('Test message', toasts)
    expect(toasts.value).toHaveLength(1)
    vi.runAllTimers()
    expect(toasts.value).toHaveLength(0)
  })
})
