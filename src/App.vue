<template>
  <navigation />
  <router-view />
  <page-footer />
</template>

<script>
import { onBeforeMount } from 'vue';
import { useChallengesStore } from '/@/stores/challengesStore';
import { usePartnersStore } from '/@/stores/partnersStore';
import { useTestimonialsStore } from '/@/stores/testimonialsStore'
import { useProjectsStore } from '/@/stores/projectsStore'
import Navigation from '/@/views/Navigation.vue';
import PageFooter from '/@/views/PageFooter.vue';

export default {
  name: 'App',
  components: { Navigation, PageFooter },
  setup() {
    const challengeStore = useChallengesStore();
    const partnersStore = usePartnersStore();
    const testimonialsStore = useTestimonialsStore();
    const projectsStore = useProjectsStore();

    onBeforeMount(async () => {
      Promise.all([
        challengeStore.getAllChallenges(),
        partnersStore.getAllPartners(),
        testimonialsStore.getAllTestimonials(),
        projectsStore.getAllProjects()
      ])
    });
  }
};
</script>
