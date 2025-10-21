<template>
  <button 
    class="toggle-button border" 
    :class="{ active: modelValue, inactive: !modelValue }"
    @click="toggle"
    >  
  </button>
</template>

<script>
export default {
  name: 'ToggleButton',
  props: {
    modelValue: {
      type: Boolean,
      default: false
    }
  },
  emits: ['update:modelValue'],
  methods: {
    toggle() {
      this.$emit('update:modelValue', !this.modelValue);
    }
  }
};
</script>

<style scoped>
.toggle-button {
  height: 1.5rem;  
  width: 3rem;
  cursor: pointer;
  margin: 0;
  padding: 0;
  transition: all 0.1s ease;
}

.toggle-button:hover {
  opacity: 0.9;
}

.toggle-button:active {
  transform: scale(0.5);
}

.toggle-button.active {
  background-color: var(--color-green);
}
.toggle-button.inactive {
  background-color: var(--color-red);
}
</style>