<template>
  <div class="wrapper">
    <landing />
    <living-lab />
  </div>
</template>

<script>
import Landing from '/@/views/Landing.vue';
import LivingLab from '/@/views/LivingLab.vue';

export default {
  name: 'App',
  components: {
    Landing,
    LivingLab,
  },
};
</script>
