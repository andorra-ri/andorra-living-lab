import { createApp } from 'vue';
import { createPinia } from 'pinia';
import InlineSvg from 'vue-svg-inline-plugin';
import router from './router';
import i18n from './i18n';
import App from './App.vue';

import 'reset-css';
import './styles/main.scss';
import 'primeicons/primeicons.css';

import PrimeVue from 'primevue/config'
import Aura from '@primevue/themes/aura'


const pinia = createPinia()
const app = createApp(App);

app.use(pinia)
app.use(InlineSvg);
app.use(router);
app.use(i18n);
app.use(PrimeVue, { theme: { preset: Aura }, ripple: true })



app.use(PrimeVue, {
  theme: { preset: Aura },
  ripple: true, 
})

app.mount('#app');