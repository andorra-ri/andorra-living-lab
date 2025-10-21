<template>
  <div class="height-divided">
    <p class="no-margin">{{ label }}</p>
    <input
      v-model="name_ca"
      class="long-width border input-height"
      :placeholder="placeholder">
  </div>
</template>

<script>
export default {
  name: 'Input',
  props: {
    placeholder: {
      type: String,
      default: '',
    },
    label: {
      type: String,
      default: '',
    },

  },

  data() {
    return { name_ca: '' };
  },
};
</script>
