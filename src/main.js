import { createApp } from 'vue'
import VueFullscreen from 'vue-fullscreen'
import '@fortawesome/fontawesome-free/css/all.css'
import '@fortawesome/fontawesome-free/js/all.js'
import axios from 'axios'
import VueAxios from 'vue-axios'
import App from './App.vue'
import router from './router'
import store from './store'

const app = createApp(App)
app.use(VueFullscreen)
app.use(VueAxios, axios)
app.use(store)
app.use(router)
app.mount('#app')
