<template>
  <div v-if="challenge">
    <header class="section primary">
      <img :src="challenge.cover[0].url" class="cover shaded" draggable="false">
    </header>
    <section class="section">
      <div class="container">
        <aside class="light">
          <div v-if="challenge.link">
            <a :href="challenge.link" class="button block">
              {{ t('challenges.apply') }}
            </a>
          </div>
          <div class="more">
            <h3>{{ t('challenges.know_more') }}</h3>
            <p>{{ t('challenges.contact') }}</p>
            <p><a href="#contact">{{ t('challenges.contact_us') }} &rarr;</a></p>
          </div>
        </aside>
        <div class="main">
          <h1>{{ challenge.name }}</h1>
          <!-- eslint-disable-next-line vue/no-v-html -->
          <div class="md" v-html="challenge.description" />
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { ref, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoute, useRouter } from 'vue-router';
import { Remarkable } from 'remarkable';
import { getChallenges } from '/@/services/api.service';

export default {
  name: 'Challenge',
  setup() {
    const { t, locale } = useI18n();
    const { params } = useRoute();
    const { push } = useRouter();
    const challenge = ref(undefined);

    const md = new Remarkable('full', {
      html: true,
      breaks: true,
      typographer: true,
    });

    watch(locale, async () => {
      try {
        const [{
          [`name_${locale.value}`]: name,
          [`description_${locale.value}`]: description,
          ...rest
        }] = await getChallenges(params.slug);
        challenge.value = { ...rest, name, description: md.render(description) };
      } catch (error) {
        push('/#challenges');
      }
    }, { immediate: true });

    return { t, locale, challenge };
  },
};
</script>

<style lang="scss" scoped>
header.section { height: 10rem; }

.container {
  display: flex;
  gap: 2rem;

  aside {
    flex: 0 0 18rem;
    padding: 1rem;
    box-sizing: border-box;
  }

  .more {
    background: #fff;
    padding: 0.75rem 1rem;
    margin: 2rem 0;
  }
}
</style>
