<template>
  <section id="living-lab" class="section light">
    <div class="container columns columns--3 shifted" style="--shift:100px">
      <div class="column box">
        <figure class="cover">
          <img :src="images.thumbnail.path">
          <figcaption v-if="images.thumbnail.caption">{{ images.thumbnail.caption }}</figcaption>
        </figure>
      </div>
      <div class="column box">
        <i18n-t tag="div" keypath="livinglab.open_innovation" class="slogan">
          <template #em><em>{{ t('livinglab.open_innovation_em') }}</em></template>
        </i18n-t>
      </div>
      <div class="column box secondary">
        <h4>{{ t('livinglab.join') }}</h4>
        <p><a :href="join.url" class="button">{{ t('livinglab.join_now') }}</a></p>
      </div>
    </div>
    <div class="container">
      <div class="columns columns--2 spaced">
        <div class="column">
          <i18n-t tag="h2" keypath="livinglab.title">
            <template #strong><strong>{{ t('livinglab.title_em') }}</strong></template>
          </i18n-t>
          <p>{{ t('livinglab.involve') }}</p>
          <p>{{ t('livinglab.value') }}</p>
        </div>
        <div class="column">
          <figure class="cover">
            <img :src="images.side.path">
            <figcaption v-if="images.side.caption">{{ images.side.caption }}</figcaption>
          </figure>
        </div>
      </div>
      <hr class="spacer">
      <div class="columns columns--4">
        <article v-for="benefit in benefits" :key="benefit" class="column">
          <h3 class="lined">{{ t(`livinglab.benefits.${benefit}.title`) }}</h3>
          <p>{{ t(`livinglab.benefits.${benefit}.description`) }}</p>
        </article>
      </div>
    </div>
  </section>
</template>

<script>
import { useI18n } from 'vue-i18n';
import { livinglab } from '/@/config.yaml';

export default {
  name: 'LivingLab',
  setup() {
    const { t } = useI18n();
    return { t, ...livinglab };
  },
};
</script>