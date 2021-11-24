<template>
  <nav>
    <div class="container">
      <img :src="`images/logo_white_${currentLocale}.png`" class="logo">
      <ul class="main-nav">
        <li v-for="(anchor, name) in navigation" :key="name">
          <a :href="`#${anchor}`">{{ t(`navigation.${name}`) }}</a>
        </li>
      </ul>
      <ul class="locales-nav">
        <li v-for="locale in locales" :key="locale">
          <a
            href="#"
            :class="{ active: locale === currentLocale }"
            @click.prevent="currentLocale = locale">
            {{ locale }}
          </a>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
import { useI18n } from 'vue-i18n';
import { locales, navigation } from '/@/config.yaml';

export default {
  name: 'Navigation',
  setup() {
    const { t, locale: currentLocale } = useI18n();
    return { t, navigation, locales, currentLocale };
  },
};
</script>
