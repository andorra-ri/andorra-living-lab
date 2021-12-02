<template>
  <section id="landing" class="primary">
    <img :src="cover" class="cover" draggable="false">
    <div class="hero">
      <em>Andorra Living Lab</em>
      <i18n-t tag="h1" keypath="tagline">
        <template #strong><strong>{{ t('tagline_em') }}</strong></template>
      </i18n-t>
    </div>
  </section>
</template>

<script>
import { useI18n } from 'vue-i18n';
import { contact, landing } from '/@/config.yaml';

export default {
  name: 'Landing',
  setup() {
    const { t } = useI18n();
    return { t, ...landing, contact };
  },
};
</script>

<style lang="scss" scoped>
#landing {
  height: 90vh;
  padding: 4rem 0;
  box-sizing: border-box;
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
    h1 { max-width: 47rem; }

    em {
      text-transform: uppercase;
      font-family: var(--header-font);
      margin: 0 1.5rem;
      letter-spacing: 0.5em;
      font-weight: bold;
    }
  }
}
</style>
