<template>
  <section id="landing" class="primary">
    <img :src="cover" class="cover" draggable="false">
    <navigation />
    <div class="hero">
      <i18n-t tag="h1" keypath="tagline">
        <template #strong><strong>{{ t('tagline_em') }}</strong></template>
      </i18n-t>
      <p>
        <a href="#living-lab" class="button secondary">{{ t('button.learn_more') }}</a>
        <a :href="`mailto:${contact.email}`" class="button ghost">{{ t('button.contact_us') }}</a>
      </p>
    </div>
  </section>
</template>

<script>
import { useI18n } from 'vue-i18n';
import Navigation from './Navigation.vue';
import { contact, landing } from '/@/config.yaml';

export default {
  name: 'Landing',
  components: { Navigation },
  setup() {
    const { t } = useI18n();
    return { t, ...landing, contact };
  },
};
</script>

<style lang="scss" scoped>
#landing {
  height: 85vh;
  position: relative;
  display: flex;
  flex-direction: column;

  .cover {
    left: calc(50% - 11rem);
    width: calc(50% + 11rem);
    // Fade
    mask-image: linear-gradient(to right, transparent 0%, black 25%) !important;

    // Monotone
    mix-blend-mode: screen;
    filter: grayscale(50%) contrast(150%) brightness(0.5);
  }

  .hero {
    padding-bottom: 100px;

    h1 { max-width: 34rem; }
  }
}
</style>
