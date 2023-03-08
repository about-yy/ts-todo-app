<template>
    <div class="task_item" @mouseover="onMouseOver" @mouseleave="onMouseLeave"> 
        <CircleButton/>
        <label class="task_item-text" :for="`task_${task.task_id}`"> {{ task.title }}</label>
        <v-icon v-if="hovered" class="task_delete mdi mdi-close"></v-icon>
    </div>
</template>
<script lang="ts">
import { defineComponent, PropType, ref } from 'vue'
import { Task } from 'custom-types';
import CircleButton from './CircleButton.vue';
export default defineComponent({
    components: {
        CircleButton
    },
    props: {
        task: {
            type: Object as PropType<Task>,
            required: true
        }
    },
    setup() {
        const hovered = ref(false);
        const onMouseOver = ()=>{
            hovered.value = true;
        }
        const onMouseLeave = ()=>{
            hovered.value = false;
        }
        return {
            hovered,
            onMouseOver,
            onMouseLeave
        }
    },
})
</script>
<style scoped>
.task_item {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-items: center;
    margin: 4.5px;
}

.task_item .task_item-text{
    margin: 0.2em 0.4em;
    line-height: 100%;

}

.task_delete {
    align-self: flex-end;
    margin-left: auto;
    opacity: 0.3;
}
.task_delete:hover {
    cursor: pointer;
    opacity: 0.3;
}

.task_delete:active {
    opacity: 1.0;
}

</style>