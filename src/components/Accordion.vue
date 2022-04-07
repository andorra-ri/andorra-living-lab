<template>
  <div class="accordion">
    <details
      v-for="(item, i) in items"
      :key="i"
      :open="open === i"
      @toggle="event => onToggled(i, event)">
      <summary>
        <slot name="title" :item="item">
          {{ item.title }}
        </slot>
      </summary>
      <slot :item="item" />
    </details>
  </div>
</template>

<script>
import { ref } from 'vue';

export default {
  name: 'Accordion',
  props: {
    items: { type: Array, required: true },
    preview: { type: Number, default: -1 },
  },
  setup(props) {
    const open = ref(props.preview);
    const onToggled = (i, { target }) => {
      if (target.open) open.value = i;
    };
    return { open, onToggled };
  },
};
</script>
