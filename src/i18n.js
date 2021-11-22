import { createI18n } from 'vue-i18n';
/* eslint-disable-next-line import/no-unresolved */
import messages from '@intlify/vite-plugin-vue-i18n/messages';

export default createI18n({
  locale: 'en',
  fallbackLocale: 'en',
  messages,
});
