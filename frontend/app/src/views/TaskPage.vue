<template>
    <div class="content">
        <h3 class="title">タスク一覧 | TS TODO APP</h3>
        <div class="task_list">
            <template v-for="task in tasks" :key="task">
                <TaskItem :task="task" />
            </template>
        </div>
        <div class="task_add_form">
            <v-text-field
                class="input-task_add"
                label="タスク名を入力">
                <v-btn class="button-task_submit" type="submit" variant="flat" color="primary" justify="right">送信</v-btn>
            </v-text-field>
        </div>
    </div>
</template>
<script lang="ts">
import { defineComponent, onBeforeMount, Ref, ref } from 'vue'
import AxiosUtil from '../utils/AxiosUtil'
import {Task} from 'custom-types';
import TaskItem from '../components/TaskItem.vue';

export default defineComponent({
    components: {
        TaskItem
    },
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
<style lang="scss" scoped>

.content {
    margin: 20px;
    padding: 20px 40px;
}

.task_list {
    margin: 12px 5px;
}

.input-task_add {
    width: 80%;
    margin: auto;
}

.button-task_submit {
    position: absolute;
    right: 8px;
    top: 10px;
    float: right;
}


</style>