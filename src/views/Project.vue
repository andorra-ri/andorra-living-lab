<template>
  <div v-if="project">
    <header class="section primary">
    </header>
    <section class="section">
    </section>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoute } from 'vue-router';

export default {
  name: 'Project',
  setup() {
    const { t, locale } = useI18n();
    const { params } = useRoute();
    const project = ref(undefined);

    return { t, locale, project };
  },
};
</script>

<style lang="scss" scoped>
header.section { height: 10rem; }
</style>
