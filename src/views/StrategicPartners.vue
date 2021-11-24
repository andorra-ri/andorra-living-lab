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
import { ref, onMounted } from 'vue';
import { getPartners } from '/@/services/api.service';

export default {
  name: 'StrategicPartners',
  setup() {
    const partners = ref([]);

    onMounted(async () => {
      partners.value = await getPartners();
    });

    return { partners };
  },
};
</script>
