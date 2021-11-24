<template>
  <div class="paginated">
    <ul v-bind="$attrs">
      <li v-for="(item, i) in paginated" :key="i">
        <slot :item="item" />
      </li>
    </ul>
    <ul class="pagination" :data-pages="pages">
      <li
        v-for="i in pages"
        :key="i"
        :class="{ active: i === currentPage }"
        @click="toPage(i)" />
    </ul>
  </div>
</template>

<script>
import { ref, computed } from 'vue';

export default {
  name: 'Paginated',
  inheritAttrs: false,
  props: {
    page: { type: Number, default: 1 },
    items: { type: Array, required: true },
    perPage: { type: Number, default: 3 },
  },
  emits: ['update:page'],
  setup(props, { emit }) {
    const currentPage = ref(props.page);
    const pages = computed(() => Math.ceil(props.items.length / props.perPage));
    const paginated = computed(() => {
      const first = (currentPage.value - 1) * props.perPage;
      return props.items.slice(first, first + props.perPage);
    });

    const toPage = page => {
      currentPage.value = page;
      emit('update:page', page);
    };

    return { paginated, pages, currentPage, toPage };
  },
};
</script>
