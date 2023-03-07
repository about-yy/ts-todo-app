<template>
    <button class="button-circle active" @click="onClick">
        <v-icon v-if="state.done" size="26px" class="mdi-check">mdi-check</v-icon>
    </button>
</template>
<script lang="ts">
import { defineComponent, reactive } from 'vue'

export default defineComponent({
    props: {
        size: String
    },
    setup(_props) {
        const state = reactive({
            done: false
        });
        const onClick = ()=>{
            state.done = !state.done;
        }
        return {
            state,
            onClick
        }
    },
})
</script>
<style scoped>
.button-circle {
    display: inline-block;
    width: 26px;
    height: 26px;
    border: solid 1px;
    border-radius: 50%;
}

.button-circle:hover {
    cursor:pointer;
    opacity: 0.5;
}

.mdi-check {
    margin: -13px -10px -10px -10px;
}
</style>
