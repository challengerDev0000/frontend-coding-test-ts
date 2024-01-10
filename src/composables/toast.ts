import { ref, Ref, inject } from 'vue'
import { Notification } from '../types/exercise'
import { TIMEOUT } from '../config/config'

type Toasts = Ref<Notification[]>

export function useToast() {
  const toasts: Toasts = inject('toasts', ref([])) as Toasts

  function toast(message: string) {
    addToast(message, toasts)
  }

  return { toasts, toast }
}

export function addToast(message: string, toasts: Toasts) {
  const id = Date.now()
  toasts.value.push({ id, message })

  setTimeout(() => {
    removeToast(id, toasts)
  }, TIMEOUT)
}

export function removeToast(id: number, toasts: Toasts) {
  toasts.value = toasts.value.filter((toast) => toast.id !== id)
}
