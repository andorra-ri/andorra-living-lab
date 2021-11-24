<template>
  <div class="wrapper">
    <landing />
    <living-lab />
    <strategic-sectors />
    <case-studies />
    <testimonials />
    <page-footer />
  </div>
</template>

<script>
import Landing from '/@/views/Landing.vue';
import LivingLab from '/@/views/LivingLab.vue';
import StrategicSectors from '/@/views/StrategicSectors.vue';
import CaseStudies from '/@/views/CaseStudies.vue';
import Testimonials from '/@/views/Testimonials.vue';
import PageFooter from '/@/views/PageFooter.vue';

export default {
  name: 'App',
  components: {
    Landing,
    LivingLab,
    StrategicSectors,
    CaseStudies,
    Testimonials,
    PageFooter,
  },
};
</script>
