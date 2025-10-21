<template>
  <div class="image-list">
    <div v-if="images.length === 0" class="empty-state">
      No hi ha imatges
    </div>

    <div v-else class="image-grid ">
      <div 
        v-for="(image, index) in images" 
        :key="index"
        class="image-item border"
      >
        <img :src="image.url || image" :alt="image.name" />
        
        <div class="image-actions">
          <Button 
            @click="$emit('edit', image, index)" 
            icon="pi pi-pencil"
            class="btn-list  border"
          />
          
          <Button 
            @click="$emit('delete', image, index)" 
            class="btn-list border"
            icon="pi pi-trash"
          />
        </div>
      </div>
      <div class="image-item">
          <Button
            class="btn-list border"
            icon="pi pi-plus"
          />
      </div>
    </div>
  </div>
</template>

<script>
import { Button } from 'primevue';

export default {
    name: 'ImageList',
    components: {
        Button
    },
    props: {
        images: {
            type: Array,
            default: () => []
        }
    },
    emits: ['edit', 'delete']

};
</script>

