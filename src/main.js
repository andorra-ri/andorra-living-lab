import { createApp } from 'vue';
import InlineSvg from 'vue-svg-inline-plugin';
import { createPinia } from 'pinia';
import router from './router';
import i18n from './i18n';
import App from './App.vue';

import 'reset-css';
import './styles/main.scss';
import 'primeicons/primeicons.css';

/* A REVISAR -> Prime vue crea un porblema a l'hora de veure el header de Challenges
amb ::before :: after, el header és més petit*/
import { PrimeVue } from '@primevue/core';
const pinia = createPinia()
const app = createApp(App);

app.use(pinia)
app.use(InlineSvg);
app.use(router);
app.use(i18n);
// Aquesta línia igual
app.use(PrimeVue);
app.mount('#app');
