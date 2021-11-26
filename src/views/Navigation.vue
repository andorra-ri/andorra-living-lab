<template>
  <nav :data-scroll="scroll.y">
    <div class="container">
      <img v-svg-inline :src="`images/logo_${currentLocale}.svg`" class="logo">
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
  <button v-if="scroll.y" class="scroller" @click="scrollTo(0)">&uarr;</button>
</template>

<script>
import { useI18n } from 'vue-i18n';
import useScroll from '/@/utils/scroll';
import { locales, navigation } from '/@/config.yaml';

export default {
  name: 'Navigation',
  setup() {
    const { t, locale: currentLocale } = useI18n();
    return { t, navigation, locales, currentLocale, ...useScroll() };
  },
};
</script>
