<template>
  <ul class="logos">
    <li v-for="partner in partners" :key="partner.name">
      <a :href="partner.web" target="blank">
        <img
          :src="partner.logo[0].url"
          :alt="partner.name"
          :title="partner.name"
          class="logo">
      </a>
    </li>
  </ul>
</template>

<script>
import { mapState } from 'pinia';
import { usePartnersStore } from '/@/stores/partnersStore';

export default {
  name: 'StrategicPartners',
  
  setup() {
    const partnersStore = usePartnersStore();

    const partners = computed(() => partnersStore.partners);

    return { partners };
  }
};
</script>
