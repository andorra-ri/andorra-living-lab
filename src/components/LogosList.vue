<template>
  <ul class="logos">
    <li v-for="logo in logos" :key="logo.name">
      <a :href="logo.url" target="blank">
        <img
          :src="logo.image"
          :alt="logo.name"
          :title="logo.name"
          :class="`logo logo--${size}`">
      </a>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'LogosList',
  props: {
    logos: { type: Array, required: true },
    size: { type: String, default: 'medium' },
  },
};
</script>
