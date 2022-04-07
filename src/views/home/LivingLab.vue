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
          <accordion :items="keypoints" :preview="0">
            <template #title="{ item }">{{ t(`livinglab.keypoints.${item}.title`) }}</template>
            <template #default="{ item }">
              <p>{{ t(`livinglab.keypoints.${item}.description`) }}</p>
            </template>
          </accordion>
        </div>
      </div>
      <logos-list :logos="partners" />
    </div>
    <video-embed :url="video.source[locale]" :cover="video.cover" class="video" />
    <div class="ribbon right shifted" style="--shift:5rem">
      <div class="container columns columns--4">
        <article v-for="benefit in benefits" :key="benefit" class="column">
          <h3 class="lined">{{ t(`livinglab.benefits.${benefit}.title`) }}</h3>
          <p>{{ t(`livinglab.benefits.${benefit}.description`) }}</p>
        </article>
      </div>
    </div>
    <div class="container columns columns--2 spaced reversed">
      <div class="column">
        <i18n-t tag="h2" keypath="livinglab.methodology">
          <template #strong><strong>{{ t('livinglab.methodology_em') }}</strong></template>
        </i18n-t>
        <p>{{ t('livinglab.quad_helix') }}</p>
        <p>{{ t('livinglab.methodologies') }}</p>
      </div>
      <div class="column">
        <figure class="cover contain">
          <img :src="images.side.path">
          <figcaption v-if="images.side.caption">{{ images.side.caption }}</figcaption>
        </figure>
      </div>
    </div>
  </section>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';
import { getPartners } from '/@/services/api.service';
import Accordion from '/@/components/Accordion.vue';
import LogosList from '/@/components/LogosList.vue';
import VideoEmbed from '/@/components/VideoEmbed.vue';
import { livinglab } from '/@/config.yaml';

export default {
  name: 'LivingLab',
  components: { Accordion, LogosList, VideoEmbed },
  setup() {
    const { t, locale } = useI18n();
    const partners = ref([]);

    onMounted(async () => {
      const p = await getPartners();
      partners.value = p.map(partner => ({
        name: partner.name,
        url: partner.web,
        image: partner.logo[0].url,
      }));
    });

    return { t, locale, ...livinglab, partners };
  },
};
</script>
