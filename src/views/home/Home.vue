<template>
  <div class="home">
    <landing />
    <living-lab />
    <strategic-sectors />
    <challenges />
    <case-studies />
    <testimonials />
  </div>
</template>

<script>
import Landing from './Landing.vue';
import LivingLab from './LivingLab.vue';
import StrategicSectors from './StrategicSectors.vue';
import Challenges from './Challenges.vue';
import CaseStudies from './CaseStudies.vue';
import Testimonials from './Testimonials.vue';

export default {
  name: 'Home',
  components: {
    Landing,
    LivingLab,
    StrategicSectors,
    Challenges,
    CaseStudies,
    Testimonials,
  },
};
</script>
