<template>
  <div class="wrapper">
    <landing />
    <living-lab />
    <strategic-sectors />
    <case-studies />
  </div>
</template>

<script>
import Landing from '/@/views/Landing.vue';
import LivingLab from '/@/views/LivingLab.vue';
import StrategicSectors from '/@/views/StrategicSectors.vue';
import CaseStudies from '/@/views/CaseStudies.vue';

export default {
  name: 'App',
  components: {
    Landing,
    LivingLab,
    StrategicSectors,
    CaseStudies,
  },
};
</script>
