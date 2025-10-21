<template>
  <div ref="dropdownRef" class="dropdown">
    <div class="dropdown-header border" @click="toggleDropdown">
      <span class="label">{{ label }}</span>
      <span class="arrow" :class="{ open: isOpen }">▼</span>
    </div>

    <div v-if="isOpen" class="dropdown-options">
      <div
        v-for="option in options"
        :key="option.value"
        class="option"
        :class="{ selected: isSelected(option.value) }"
        @click="toggleOption(option.value)">
        <input
          type="checkbox"
          :checked="isSelected(option.value)"
          @click.stop>
        <span>{{ option.label }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DropDown',
  props: {
    label: {
      type: String,
      required: true,
    },
    options: {
      type: Array,
      required: true,
      validator: opts => opts.every(opt => opt.label && opt.value !== undefined),
    },
    modelValue: {
      type: Array,
      default: () => [],
    },
  },
  emits: ['update:modelValue'],
  data() {
    return { isOpen: false };
  },
  mounted() {
    document.addEventListener('click', this.handleClickOutside);
  },
  beforeUnmount() {
    document.removeEventListener('click', this.handleClickOutside);
  },
  methods: {
    toggleDropdown() {
      this.isOpen = !this.isOpen;
    },
    toggleOption(value) {
      const selected = [...this.modelValue];
      const idx = selected.indexOf(value);

      if (idx > -1) {
        selected.splice(idx, 1);
      } else {
        selected.push(value);
      }

      this.$emit('update:modelValue', selected);
    },
    isSelected(value) {
      return this.modelValue.includes(value);
    },
    handleClickOutside(e) {
      if (this.$refs.dropdownRef && !this.$refs.dropdownRef.contains(e.target)) {
        this.isOpen = false;
      }
    },
  },
};
</script>
