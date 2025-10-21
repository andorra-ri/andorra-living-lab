<template>
    <div class="divided"> 
        <p class="no-margin">{{ label }}</p>
        <textarea
            v-model="name_ca" 
            class="height border no-resize" 
            :placeholder=placeholder />
    </div>
</template> 

<script>
export default {    
    name: 'TextArea',
    props: {
        placeholder: {
            type: String,
            default: ''
        },
        label: {
            type: String,
            default: ''
        }

    },

    data() {
        return {
            name_ca: '',
        }
    },
}
</script>