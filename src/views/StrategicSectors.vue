<template>
  <section id="strategic-sectors" class="section">
    <div class="container center">
      <i18n-t tag="h2" keypath="sectors.title">
        <template #strong><strong>{{ t('sectors.title_em') }}</strong></template>
      </i18n-t>
      <p>{{ t('sectors.description') }}</p>
      <div class="cards">
        <article v-for="sector in sectors" :key="sector.title" class="card">
          <img :src="sector.cover" class="cover">
          <div class="card-content">
            <img v-svg-inline :src="`icons/${sector.title}.svg`" class="icon">
            <h4>{{ t(`sectors.${sector.title}`) }}</h4>
            <a href="#">{{ t('button.learn_more') }} &rarr;</a>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<script>
import { useI18n } from 'vue-i18n';
import { sectors } from '/@/config.yaml';

export default {
  name: 'StrategicSectors',
  setup() {
    const { t } = useI18n();
    return { t, sectors };
  },
};
</script>
