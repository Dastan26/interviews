import './assets/main.css'
import 'primevue/resources/themes/saga-blue/theme.css'
import 'primeicons/primeicons.css'
import 'primeflex/primeflex.css'
import { initializeApp } from 'firebase/app'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import PrimeVue from 'primevue/config'
import Menubar from 'primevue/menubar'
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import Toast from 'primevue/toast'
import ToastService from 'primevue/toastservice'
import ProgressSpinner from 'primevue/progressspinner'
import Card from 'primevue/card'

import App from './App.vue'
import router from './router'

const firebaseConfig = {
  apiKey: 'AIzaSyAV7tx86ISGQia_uYe1AHvBXKYmSTE_yUo',
  authDomain: 'interviewanalitics.firebaseapp.com',
  projectId: 'interviewanalitics',
  storageBucket: 'interviewanalitics.appspot.com',
  messagingSenderId: '855866059848',
  appId: '1:855866059848:web:6997268a6402bd96657c7d'
}

initializeApp(firebaseConfig)
const app = createApp(App)

app.use(ToastService)
app.use(createPinia())
app.use(router)
app.use(PrimeVue)
app.component('app-menubar', Menubar)
app.component('app-button', Button)
app.component('app-input-text', InputText)
app.component('app-toast', Toast)
app.component('app-progress', ProgressSpinner)
app.component('app-card', Card)

app.mount('#app')
