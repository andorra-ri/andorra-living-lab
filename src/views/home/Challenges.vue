<template>
  <section id="challenges" class="section light">
    <div class="container center">
      <i18n-t tag="h2" keypath="challenges.title">
        <template #strong><strong>{{ t('challenges.title_em') }}</strong></template>
      </i18n-t>
      <p>{{ t('challenges.description') }}</p>
      <paginated
        v-if="challenges.length"
        v-slot="{ item: challenge }"
        :items="challenges"
        :per-page="4"
        class="grid">
        <img :src="challenge.cover[0]" :class="{ passed: challenge.passed }">
        <div class="grid-content">
          <!-- <em class="date">{{ challenge.dateString }}</em> -->
          <h4>{{ challenge[`name_${locale}`] }}</h4>
          <p>
            <router-link :to="`/challenge/${challenge.slug}`">
              {{ t('challenges.more') }} &rarr;
            </router-link>
          </p>
        </div>
      </paginated>
      <p v-else class="empty">{{ t('challenges.empty') }}</p>
    </div>
  </section>
</template>

<script>
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import Paginated from '/@/components/Paginated.vue';
import { useChallengesStore } from '/@/stores/challengesStore';
import { firebaseTimestampToDate } from '/@/helpers';

const format = {
  year: 'numeric',
  month: 'numeric',
  day: 'numeric',
};

export default {
  name: 'Challenges',
  components: { Paginated },
  setup() {
    const { t, locale } = useI18n();

    const challengesStore = useChallengesStore();

    const formatDate = date => new Intl.DateTimeFormat('ca', format).format(new Date(date));

    const challenges = computed(() => challengesStore.challenges
      .filter(challenge => challenge.active === true)
      .map(challenge => {
        const dateStart = firebaseTimestampToDate(challenge.date_start);
        const dateEnd = firebaseTimestampToDate(challenge.date_end) || null;
        const passed = dateStart.getTime() < Date.now();
        const dateString = passed
          ? t('challenges.finished')
          : Number.isNaN(dateEnd.getTime())
            ? formatDate(dateStart)
            : `${formatDate(dateStart)} - ${formatDate(dateEnd)}`;
        return { ...challenge, dateString, passed };
      }));

    return { t, locale, challenges };
  },
};
</script>
