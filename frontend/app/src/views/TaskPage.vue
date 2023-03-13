<template>
  <div class="content">
    <h3 class="title">
      タスク一覧 | TS TODO APP
    </h3>
    <div class="task_list">
      <template
        v-for="task in tasks"
        :key="task"
      >
        <TaskItem
          :task="task"
          @on-complete="()=>taskComplete(task)"
          @on-scheduled="()=>taskSchedule(task)"
        />
      </template>
    </div>
    
    <form class="task_add_form">
      <v-text-field
        v-model="taskTitle"
        class="input-task_add"
        :class="{'focus': (taskTitle.trim()!=='')}"
        label="タスク名を入力"
      >
        <div class="right-content">
          <Popper>
            <div class="calendar-container">
              <v-icon class="icon task_period mdi mdi-calendar" />
            </div>
            <template #content>
              <DatePicker v-model="date" />
            </template>
          </Popper>
          <v-btn
            class="button-task_submit"
            type="submit"
            variant="flat"
            color="primary"
            justify="right"
            @click="taskCreate"
          >
            送信
          </v-btn>
        </div>
      </v-text-field>
    </form>
  </div>
</template>
<script lang="ts">
import { defineComponent, Ref, ref } from 'vue'
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


        const taskCreate = async ()=>{
          const _result = await AxiosUtil.post("/task/create", {
                title: taskTitle.value,
                period: new Date().toISOString()
            }); 
            await getTasks();
            taskTitle.value = "";
        } 

        const taskComplete = async (task: Task)=>{
          const _result = await AxiosUtil.post("/task/complete", {
                taskId: task.task_id 
            });
            await getTasks();
        }

        const taskSchedule = async (task: Task) => {
            const _result = await AxiosUtil.post("/task/edit",{
                taskId: task.task_id,
                title: task.title,
                period: new Date(task.period).toISOString()
            });
            await getTasks();
        }

        return {
            tasks,
            date,
            taskTitle,
            taskCreate,
            taskComplete,
            taskSchedule,
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