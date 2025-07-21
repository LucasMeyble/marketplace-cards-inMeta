import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import pinia from './store'
import './style.css'
import Toast, { POSITION } from "vue-toastification";
import type { PluginOptions } from 'vue-toastification'
import "vue-toastification/dist/index.css";


const app = createApp(App)
app.use(pinia)
app.use(router)
app.mount('#app')

const options: PluginOptions = {
  position: POSITION.TOP_CENTER,
  timeout: 5000,
  closeOnClick: true,
  pauseOnFocusLoss: true,
  pauseOnHover: true,
  draggable: true,
  draggablePercent: 0.6,
  showCloseButtonOnHover: false,
  hideProgressBar: true,
  closeButton: "button",
  icon: true,
  rtl: false
};

app.use(Toast, options);

