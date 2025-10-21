<template>
    <div class="modal-overlay">
        <component :is="component" v-if="component" />
        <button @click="$emit('close')">
            Close
        </button>
    </div>
</template> 

 <script>

    export default {
        name: 'Modal',
        emits: ['close'],
        props: {
        component: {
            type: Object,
            default: null
        }
    }
   }
</script>