<template>
  <Dialog 
    modal 
    v-model:visible="isOpenModals" 
    :header="props.title"  
    :style="{ width: '30rem' }"
    @update:visible="onVisibilityChange"
  >
    <slot />
  </Dialog>
</template>


<script setup>
  const props = defineProps({
    title: String,
  })

  import { computed } from 'vue'
  import { useModalStore }  from '../stores/modalsStore' 
  import Dialog from 'primevue/dialog'

  const modal = useModalStore()
  const isOpenModals = computed(() => modal.isOpen(props.title))
  

  function onVisibilityChange() {
    modal.close(props.title)
  }
</script>
