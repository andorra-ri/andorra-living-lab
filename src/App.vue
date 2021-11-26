<template>
  <navigation />
  <router-view />
  <page-footer />
</template>

<script>
import Navigation from '/@/views/Navigation.vue';
import PageFooter from '/@/views/PageFooter.vue';

export default {
  name: 'App',
  components: { Navigation, PageFooter },
};
</script>
