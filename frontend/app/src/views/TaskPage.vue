<template>
    <template v-for="task in tasks" :key="task">
        <div>
            {{ task }}
        </div>
    </template>
</template>
<script lang="ts">
import { computed, defineComponent, onBeforeMount, reactive, ref } from 'vue'
import { useStore } from '../store'
import AxiosUtil from '../utils/AxiosUtil'

export default defineComponent({
    setup() {
        const tasks = ref([]);
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
.taskItem:hover {
    background-color: aliceblue;
}
</style>