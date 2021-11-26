<template>
  <div class="home">
    <landing />
    <living-lab />
    <strategic-sectors />
    <case-studies />
    <testimonials />
  </div>
</template>

<script>
import Landing from './Landing.vue';
import LivingLab from './LivingLab.vue';
import StrategicSectors from './StrategicSectors.vue';
import CaseStudies from './CaseStudies.vue';
import Testimonials from './Testimonials.vue';

export default {
  name: 'Home',
  components: {
    Landing,
    LivingLab,
    StrategicSectors,
    CaseStudies,
    Testimonials,
  },
};
</script>
