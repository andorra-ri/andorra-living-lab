<template>
    <section class="body">
        <div class="container split-layout">
            <div class="left-side">
                <DataTable 
                    v-if="challenges.length"
                    :value="challenges"
                    class="p-datatable-sm"
                >
                    <Column field="name" class="md" :header="t('Name')">
                    <template #body="slotProps">
                        {{ slotProps.data[`name_${locale}`] }}
                    </template>
                    </Column>

                    <Column field="active" :header="t('Active')">
                    <template #body="slotProps">
                        <div class="square-container">
                            <div 
                                class="square-btn"
                                :class="slotProps.data.active ? 'status-active' : 'status-inactive'">
                            </div>
                        </div>
                    </template>
                    </Column>

                    <Column field="area" :header="t('Area')">
                    <template #body="slotProps">
                        {{ cleanArea(slotProps.data.area) }}
                    </template>
                    </Column>

                    <Column header="PDF">
                        <template #body="slotProps">
                            <div v-if="slotProps.data.bases" class="square-container">
                                <Button 
                                    @click="showPdf (slotProps.data.bases)"
                                    icon="pi pi-eye"
                                    class="square-btn"
                                />
                            </div>
                        </template>
                    </Column>

                    <Column header="Edit">
                        <template #body="slotProps">
                            <div class="square-container">
                                <Button
                                    icon="pi pi-pencil"
                                    class="square-btn"
                                    @click="$router.push(`/dashboard/challengeEdit/${slotProps.data.slug}`)"
                                />
                            </div>
                        </template>
                    </Column>
                </DataTable>
            </div>
            <div class = "right-side">
                <div class="pdf-preview" :class="{ 'has-pdf': currentPdf }">
                    <div v-if="!currentPdf" class="empty-preview">
                        <p>No s'ha seleccionat cap Preview</p>
                    </div>
                    <div v-if="currentPdf" class="pdf-container">
                        <iframe 
                            v-if="currentPdf"
                            :src="currentPdf" 
                            class="pdf-iframe"
                            frameborder="0"
                        ></iframe>
                    </div>
                    
                </div>
            </div>        
        </div>
    </section>
</template>

<script>
import { computed, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useChallengesStore } from '/@/stores/challengesStore'
import { firebaseTimestampToDate } from '/@/helpers'
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import { Button } from 'primevue';


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
        Button
    },

  setup() {
    const { t, locale } = useI18n();
    const challengesStore = useChallengesStore();
    const currentPdf = ref(null);
    const formatDate = date => new Intl.DateTimeFormat('ca', format).format(new Date(date));

    const challenges = computed(() =>
      challengesStore.challenges.map(challenge => {
        const dateStart = firebaseTimestampToDate(challenge.date_start);
        const dateEnd = firebaseTimestampToDate(challenge.date_end) || null;
        const passed = dateStart.getTime() < Date.now();
        const dateString = passed
          ? t('challenges.finished')
          : Number.isNaN(dateEnd?.getTime())
            ? formatDate(dateStart)
            : `${formatDate(dateStart)} - ${formatDate(dateEnd)}`;
        return { ...challenge, dateString, passed };
      })
    );

    const cleanArea = (area) => {
        if (!area) return '';
        // Convierte array a string y remueve símbolos
        return String(area)
            .replace(/[\[\]"]/g, '')
    };

    const showPdf = (pdf_url) => {
        currentPdf.value = pdf_url;
    };

    return { t, locale, challenges, cleanArea, currentPdf, showPdf };
  },
};
</script>

<style lang="scss" scoped>
.body {
  padding: 3.5rem 0;
}

.container {
  position: relative;
  max-width: 1324px;
  margin: 0 auto;
  padding: 0 1rem;
  z-index: 1;
}

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

.split-layout {
    display: flex;
    gap: 3rem;
    align-items: flex-start;
}

.left-side {
    flex: 1;
}

.right-side {
    width: 300px;
}

.pdf-container {
    flex: 1;
    display: flex;
    flex-direction: column;
}

.pdf-iframe {
    width: 100%;
    height: 100%;
    min-height: 400px;
    border: none;
}

.empty-preview {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 400px;
    color: #666;
}

::v-deep(.p-datatable .p-datatable-tbody > tr > td) {
    vertical-align: middle;
    padding-top: 0rem;
    padding-bottom: 0rem;
    min-width: 80px
}
</style>
