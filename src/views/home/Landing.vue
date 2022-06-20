<template>
  <section id="landing" class="primary">
    <figure class="cover duotone" :style="cover.style">
      <img :src="cover.url" draggable="false">
      <figcaption>{{ cover.caption }}</figcaption>
    </figure>
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
  height: min(80vh, 100vw);
  padding: 4rem 0;
  box-sizing: border-box;
  position: relative;
  display: flex;
  flex-direction: column;

  .cover {
    // Fade
    mask-image: linear-gradient(to right, transparent 0%, black 50%) !important;
  }

  .hero {
    h1 {
      max-width: 45rem;

      strong { display: block; }
    }

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
