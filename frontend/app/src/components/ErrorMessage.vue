<template>
    <p class="error-message">{{ message }}</p>
</template>
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    props: {
        message: String
    },
    setup() {
        
    },
})
</script>
<style scoped>
.error-message {
    background-color: pink;
    margin: 12px 0px;
    padding: 14px;
    border-radius: 3px;
}
</style>