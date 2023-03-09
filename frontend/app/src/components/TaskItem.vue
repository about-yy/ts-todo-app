<template>
    <div class="task_item" @mouseover="onMouseOver" @mouseleave="onMouseLeave"> 
        <CircleButton/>
        <label class="task_item-text" :for="`task_${task.task_id}`"> {{ task.title }}</label>
        <div class="task_item-nav">
            <Popper>
                <v-icon v-if="hovered" class="icon task_period mdi mdi-calendar"></v-icon>
                <template #content>
                    <VCalendar class="calendar-container"></VCalendar>
                </template>
            </Popper>
            <v-icon v-if="hovered" class="icon task_delete mdi mdi-close"></v-icon>
        </div>
    </div>
</template>
<script lang="ts">
import { defineComponent, PropType, ref } from 'vue'
import { Task } from 'custom-types';
import CircleButton from './CircleButton.vue';
import Popper from 'vue3-popper';
import {Calendar as VCalendar} from 'v-calendar';

export default defineComponent({
    components: {
        CircleButton,
        Popper,
        VCalendar
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

.task_item-nav {
    align-self: flex-end;
    margin-left: auto;
}

.task_item-nav .icon {
    opacity: 0.5;
}
.task_item-nav *:hover {
    cursor: pointer;
}

.task_item-nav *:active {
    opacity: 1.0;
}

</style>