<template>
    <div class="content">
        <h3 class="title">タスク一覧 | TS TODO APP</h3>
        <div class="task_list">
            <template v-for="task in tasks" :key="task">
                <div class="task_item"> 
                    <CircleButton/>
                    <label class="task_item-text" :for="`task_${task.task_id}`"> {{ task.title }}</label>
                    <v-icon class="task_delete mdi mdi-close"></v-icon>
                </div>
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
import CircleButton from '../components/CircleButton.vue';

export default defineComponent({
    components: {
        CircleButton
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