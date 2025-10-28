<template>
    <div style="margin-top: 10rem;">
      <p v-if="modals.visible">El modal está abierto ✅</p>
      <Button
        @click="modals.open('editChallenge')" >Nou Challenge</Button>
    </div> 
    
    <DataTable :value="challenges" tableStyle="min-width: 50rem">
      <Column field="name" header="Nom"></Column>
      <Column field="active" header="Actiu"></Column>
      <Column field="area" header="Area"></Column>
      <Column>
        <template #body="slotProps">
          <Button icon="pi pi-pencil"
            @click="modals.open('editChallenge', slotProps.data)"
          />
        </template>
      </Column>
    </DataTable>
</template>


<script setup>  
  import { computed } from 'vue'
  import { useI18n } from 'vue-i18n';
  import { useModalStore } from '../../stores/modalsStore'
  // import { useModalStoreV2 } from '../../stores/modalsStoreV2';  
  import { useChallengesStore } from '/@/stores/challengesStore';
  import { firebaseTimestampToDate } from '/@/helpers';

  import DataTable from 'primevue/datatable';
  import Column from 'primevue/column';

      
  const { t, locale } = useI18n();
  const modals = useModalStore()
  const challengesStore = useChallengesStore()
  const formatDate = date => new Intl.DateTimeFormat('ca', format).format(new Date(date));  
  const challenges = computed(() =>
    challengesStore.challenges.map(challenge => {
      const dateStart = firebaseTimestampToDate(challenge.date_start)
      const dateEnd = firebaseTimestampToDate(challenge.date_end) || null
      const passed = dateStart.getTime() < Date.now()

      const dateString = passed
        ? t('challenges.finished')
        : Number.isNaN(dateEnd?.getTime())
          ? formatDate(dateStart)
          : `${formatDate(dateStart)} - ${formatDate(dateEnd)}`
      return { ...challenge, dateString, passed }
    })
  )

</script>
