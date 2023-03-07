<template>
    <template v-for="task in tasks" :key="task">
        <div class="task_item">
            <span class="checkbox-circle"></span>
            <label class="task_item-text" :for="`task_${task.task_id}`"> {{ task.title }}</label>
        </div>
    </template>
</template>
<script lang="ts">
import { defineComponent, onBeforeMount, Ref, ref } from 'vue'
import AxiosUtil from '../utils/AxiosUtil'
import {Task} from 'custom-types';
export default defineComponent({
    setup() {
        const tasks: Ref<Task[]> = ref([]);
        const getTasks = async ()=>{
            const result = await AxiosUtil.get('/task/list')
            tasks.value = result.data.tasks;
        }
        onBeforeMount(getTasks);
        return {
            tasks
        }
    },
})
</script>
<style scoped>
.task_item {
    display: flex;
    align-items: center;
    justify-items: center;

}

.task_item .task_item-text{
    margin: 0.2em 0.4em;
    line-height: 100%;

}

.checkbox-circle {
    display: inline-block;
    width: 18px;
    height: 18px;
    border: solid 1px;
    border-radius: 50%;
}

</style>