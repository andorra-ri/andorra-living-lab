<template>
    <div class="pdf-preview" :class="{ 'has-pdf': currentPdf }">
        <div v-if="!currentPdf" class="empty-preview">
            <p>No s'ha seleccionat cap Preview</p>
        </div>
        <div v-if="currentPdf" class="pdf-container">
            <iframe 
                v-if="currentPdf"
                :src="currentPdf" 
                class="pdf-iframe"
                frameborder="0"
            ></iframe>
        </div>
    </div>
</template>

<script>
export default {
    name: 'PdfPreview',
    props: {
        currentPdf: {
            type: String,
            default: null
        }
    }
}
</script>

