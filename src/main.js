import { createApp } from 'vue';
import InlineSvg from 'vue-svg-inline-plugin';
import { createPinia } from 'pinia';
import router from './router';
import i18n from './i18n';
import App from './App.vue';

import 'reset-css';
import './styles/main.scss';

const pinia = createPinia()
const app = createApp(App);

app.use(pinia)
app.use(InlineSvg);
app.use(router);
app.use(i18n);
app.mount('#app');
