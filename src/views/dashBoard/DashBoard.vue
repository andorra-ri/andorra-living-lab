<template>
  <section class="dash-body">
    <div class="container dash-container split-layout">
      <DataTable
        v-if="challenges.length"
        :value="challenges"
        class="p-datatable-sm">
        <Column field="name" class="md" header="Challenge">
          <template #body="slotProps">
            {{ slotProps.data[`name_${locale}`] }}
          </template>
        </Column>

        <Column field="active" header="Actiu">
          <template #body="slotProps">
            <div class="square-container">
              <div
                class="square-btn"
                :class="slotProps.data.active ? 'status-active' : 'status-inactive'" />
            </div>
          </template>
        </Column>

        <Column field="area" header="Area">
          <template #body="slotProps">
            {{ cleanArea(slotProps.data.area) }}
          </template>
        </Column>

        <Column header="Editar">
          <template #body="slotProps">
            <div class="square-container">
              <router-link
                class="square-btn"
                :to="`/dashboard/challengeEdit/${slotProps.data.slug}`">
                <Button
                  icon="pi pi-pencil"
                  class="square-btn" />
              </router-link>
            </div>
          </template>
        </Column>
      </DataTable>
    </div>
  </section>
</template>

<script>
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { useChallengesStore } from '/@/stores/challengesStore';
import { firebaseTimestampToDate } from '/@/helpers';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import { Button } from 'primevue';
import ChallengeEdit from './ChallengeEdit.vue';

const format = {
  year: 'numeric',
  month: 'numeric',
  day: 'numeric',
};

export default {
  name: 'DashBoard',

  components: {
    DataTable,
    Column,
    Button,
    // ChallengeEdit,
  },

  setup() {
    const { t, locale } = useI18n();
    const challengesStore = useChallengesStore();
    const formatDate = date => new Intl.DateTimeFormat('ca', format).format(new Date(date));

    const challenges = computed(() => challengesStore.challenges.map(challenge => {
      const dateStart = firebaseTimestampToDate(challenge.date_start);
      const dateEnd = firebaseTimestampToDate(challenge.date_end) || null;
      const passed = dateStart.getTime() < Date.now();
      const dateString = passed
        ? t('challenges.finished')
        : Number.isNaN(dateEnd?.getTime())
          ? formatDate(dateStart)
          : `${formatDate(dateStart)} - ${formatDate(dateEnd)}`;
      return { ...challenge, dateString, passed };
    }));

    const cleanArea = area => {
      if (!area) return '';
      return String(area)
        .replace(/[[\]"]/g, '');
    };

    return { t, locale, challenges, cleanArea, ChallengeEdit };
  },
};
</script>

<style lang="scss" scoped>

.square-container {
    display: flex;
    align-items: center;
    min-height: 40px;
    padding-right: 5px;
}

.square-btn {
  width: 80%;
  height: 25px;
  border-radius: 4px;
}

.status-active {
  background-color: #22c55e;
}

.status-inactive {
  background-color: #ef4444;
}

.left-side {
    width: 70%;
}

.right-side {
    width: 30%;
}

::v-deep(.p-datatable .p-datatable-tbody > tr > td) {
    vertical-align: middle;
    padding-top: 0rem;
    padding-bottom: 0rem;
    min-width: 80px
}
</style>
