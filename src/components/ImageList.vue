<template>
  <div class="image-list">
    <div v-if="images.length === 0" class="empty-state">
      No hi ha imatges
    </div>

    <div v-else class="image-grid ">
      <div
        v-for="(image, index) in images"
        :key="index"
        class="image-item border">
        <img :src="image.url || image" :alt="image.name">

        <div class="image-actions">
          <Button
            icon="pi pi-pencil"
            class="btn-list  border"
            @click="$emit('edit', image, index)" />

          <Button
            class="btn-list border"
            icon="pi pi-trash"
            @click="$emit('delete', image, index)" />
        </div>
      </div>
      <div class="image-item">
        <Button
          class="btn-list border"
          icon="pi pi-plus" />
      </div>
    </div>
  </div>
</template>

<script>
import { Button } from 'primevue';

export default {
  name: 'ImageList',
  components: { Button },
  props: {
    images: {
      type: Array,
      default: () => [],
    },
  },
  emits: ['edit', 'delete'],

};
</script>
