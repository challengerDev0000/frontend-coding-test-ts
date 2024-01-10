import { createApp, ref } from 'vue'
import './styles/main.css'
import App from './App.vue'
import initializeRouter from './router'
import type { Notification } from './types/exercise'

const app = createApp(App)
const toasts = ref<Array<Notification>>([])
app.provide('toasts', toasts)
initializeRouter(app)

app.mount('#app')
