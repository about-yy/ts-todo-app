<template>
    <div class="content">
        <h3 class="title">タスク一覧 | TS TODO APP</h3>
        <div class="task_list">
            <template v-for="task in tasks" :key="task">
                <TaskItem @onComplete="()=>taskComplete(task)" @onScheduled="()=>taskSchedule(task)" :task="task" />
            </template>
        </div>
        <div class="task_add_form">
            <v-text-field
                class="input-task_add"
                :class="{'focus': taskCreateInputState.focused}"
                label="タスク名を入力"
                @update:focused="onCreateInputFocus"
                @blur="onCreateInputBlur"
                v-model="taskTitle" >
                <div class="right-content">
                    <Popper>
                        <div class="calendar-container">
                            <v-icon class="icon task_period mdi mdi-calendar"></v-icon>
                        </div>
                        <template #content>
                            <DatePicker v-model="date" ></DatePicker>
                        </template>
                    </Popper>
                    <v-btn class="button-task_submit" type="submit" @click="taskCreate" variant="flat" color="primary" justify="right">送信</v-btn>
                </div>
            </v-text-field>
        </div>
    </div>
</template>
<script lang="ts">
import { defineComponent, reactive, Ref, ref } from 'vue'
import AxiosUtil from '../utils/AxiosUtil'
import {Task} from 'custom-types';
import TaskItem from '../components/TaskItem.vue';
import Popper from 'vue3-popper';
import { DatePicker } from 'v-calendar';

export default defineComponent({
    components: {
        TaskItem,
        Popper,
        DatePicker
    },
    setup() {
        const taskTitle = ref("");
        const tasks: Ref<Task[]> = ref([]);
        const getTasks = async ()=>{
            const result = await AxiosUtil.get('/task/list')
            tasks.value = result.data.tasks;
        }
        const date = ref(new Date());
        getTasks();
        const taskCreateInputState = reactive({
            focused: false
        });
        const onCreateInputFocus = () => {
            console.log("on create input focus")
            taskCreateInputState.focused = true
        }
        const onCreateInputBlur = () => {
            console.log("on create input blur")
            taskCreateInputState.focused = false
        }
        const taskCreate = async ()=>{
            const result = await AxiosUtil.post("/task/create", {
                title: taskTitle.value,
                period: new Date().toISOString()
            }); 
        } 

        const taskComplete = async (task: Task)=>{
            const result = await AxiosUtil.post("/task/complete", {
                taskId: task.task_id 
            });
        }

        const taskSchedule = async (task: Task) => {
            const result = await AxiosUtil.post("/task/edit",{
                taskId: task.task_id,
                title: task.title,
                period: task.period.toISOString()
            });
        }

        return {
            tasks,
            date,
            taskTitle,
            taskCreate,
            onCreateInputFocus,
            onCreateInputBlur,
            taskComplete,
            taskSchedule,
            taskCreateInputState
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

.task_add_form .right-content {
    position: absolute;
    right: 8px;
    top: 10px;
    float: right;
}


.task_add_form .calendar-container {
    width: 2em;
    height: 2em;
    justify-content: center;
    align-content: center;
    line-height: 1em;
    visibility: hidden;
}
.input-task_add.focus .calendar-container {
    visibility: visible;
}

.task_add_form .calendar-container:hover {
    cursor: pointer;
}


</style>