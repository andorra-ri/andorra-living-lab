
<template>
  <Modal title="confirmChanges">
    <div v-if="metadata"> 
      <h3> Confirmació de canvis</h3>
      <p> Nom del Repte: {{ metadata.values.challengeName }}</p>
      <p> Data del Repte: {{new Intl.DateTimeFormat('es-ES').format(metadata.values.challengeDate)  }}</p>
      <Button label="Submit" @click="modals.closeAll()"/>
    </div>
  </Modal>
</template>
  
<script setup>
  import Modal from '../../components/Modal.vue';
  import { computed } from 'vue'
  import { useModalStore } from '../../stores/modalsStore';

  const modals = useModalStore()
  const metadata = computed(() => modals.getPayload('confirmChanges'))
</script>