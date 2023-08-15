<template>
  <div class="header">
    <h3 class="title">タスク一覧 | TS TODO APP</h3>
    <button class="button_logout flat" type="submit">ログアウト</button>
  </div>
  <div class="content">
    <div class="task_list" role="task_list">
      <template v-if="tasks.length > 0">
        <TaskItem
          v-for="task in tasks"
          :key="task.task_id"
          :task="task"
          @on-complete="() => taskComplete(task)"
          @on-scheduled="() => taskSchedule(task)"
        />
      </template>
      <template v-else>
        <p>登録されているタスクはありません。</p>
      </template>
    </div>

    <form
      class="task_add_form"
      role="task_add_form"
      @submit.prevent="taskCreate"
    >
      <input
        id="input-task_title"
        v-model="taskTitle"
        class="input-task_title"
        type="text"
        name="input-task_title"
        placeholder="タスク名を入力"
      />
      <div class="right-content">
        <Popper>
          <div
            class="calendar-container"
            :class="{ focus: taskTitle.trim() !== '' }"
          >
            <svg
              class="icon task_period"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              data-testid="task_add_form-icon"
            >
              <title>calendar</title>
              <path
                d="M19,19H5V8H19M16,1V3H8V1H6V3H5C3.89,3 3,3.89 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5C21,3.89 20.1,3 19,3H18V1M17,12H12V17H17V12Z"
              />
            </svg>
          </div>
          <template #content>
            <DatePicker v-model="date" />
          </template>
        </Popper>
        <button class="button-task_submit flat" type="submit">送信</button>
      </div>
    </form>
  </div>
</template>
<script lang="ts">
import { defineComponent, Ref, ref } from "vue";
import AxiosUtil from "../utils/AxiosUtil";
import { Task } from "custom-types";
import TaskItem from "../components/TaskItem.vue";
import Popper from "vue3-popper/dist/popper.esm";
import { DatePicker } from "v-calendar";

export default defineComponent({
  components: {
    TaskItem,
    Popper,
    DatePicker,
  },
  setup() {
    const taskTitle = ref("");
    const tasks: Ref<Task[]> = ref([]);
    const getTasks = async () => {
      const result = await AxiosUtil.get("/task/list");
      tasks.value = result.data.tasks;
    };
    const date = ref(new Date());
    getTasks();

    const taskCreate = async () => {
      const _result = await AxiosUtil.post("/task/create", {
        title: taskTitle.value,
        period: new Date(date.value).toISOString(),
      });
      await getTasks();
      taskTitle.value = "";
    };

    const taskComplete = async (task: Task) => {
      const _result = await AxiosUtil.post("/task/complete", {
        taskId: task.task_id,
      });
      await getTasks();
    };

    const taskSchedule = async (task: Task) => {
      const _result = await AxiosUtil.post("/task/edit", {
        taskId: task.task_id,
        title: task.title,
        period: new Date(task.period).toISOString(),
      });
      await getTasks();
    };

    return {
      tasks,
      date,
      taskTitle,
      taskCreate,
      taskComplete,
      taskSchedule,
    };
  },
});
</script>
<style lang="scss" scoped>
.header {
  position: relative;
  margin: 20px;
  padding: 20px 40px;
  margin-bottom: 0;
  padding-bottom: 0;

  .title {
    display: inline-block;
  }

  .button_logout {
    position: absolute;
    bottom: 0;
    right: 1em;

    display: block;
    // width: 200px;
    padding: 4px 8px;
    // font-size: 16px;
    border: solid 1px $primary-color;
    border-radius: 5px;
    background-color: $button-text-color; // 色を反転
    color: $primary-color; // 色を反転
    text-align: center;
    text-decoration: none;
    cursor: pointer;
    margin-left: 3px;
    transition: background-color 0.2s ease-in-out;
    &:hover,
    &:focus {
      background-color: darken($color: $button-text-color, $amount: 10); // 色を反転
      outline: none;
    }

    &:active {
      background-color: lighten($color: $button-text-color, $amount: 10); // 色を反転
    }
  }
}
.content {
  margin: 20px;
  padding: 20px 40px;
  margin-top: 1em;
  padding-top: 0px;
}

.task_list {
  margin: 12px 5px;
}

.task_add_form {
  position: relative;
  text-align: center;

  .right-content {
    position: absolute;
    display: flex;
    align-items: center;
    right: 5.2em;
    top: 6px;
  }
  .calendar-container {
    width: 1.7em;
    height: 1.7em;
    justify-content: center;
    align-content: center;
    line-height: 1em;
    visibility: hidden;
    &.focus {
      visibility: visible;
    }

    &:hover {
      cursor: pointer;
    }
  }

  .input-task_title.focus .calendar-container {
    visibility: visible;
  }

  input {
    width: 80%;
    padding: 0.5rem;
    font-size: 1em;
    height: 1.4rem;
    line-height: 1.4rem;
    color: $text-color;
    border: 1px solid #ccc;
    border-radius: 4px;
    background-color: #f5f5f5;

    &:focus {
      outline: none;
      border-color: $primary-color;
      box-shadow: 0 0 0 2px rgba(77, 144, 254, 0.2);
    }
  }

  button.button-task_submit {
    display: block;
    // width: 200px;
    padding: 4px 8px;
    // font-size: 16px;
    border: none;
    border-radius: 5px;
    background-color: $primary-color;
    color: $button-text-color;
    text-align: center;
    text-decoration: none;
    cursor: pointer;
    margin-left: 3px;
    transition: background-color 0.2s ease-in-out;
    &:hover,
    &:focus {
      background-color: lighten($color: $primary-color, $amount: 10);
      outline: none;
    }

    &:active {
      background-color: darken($color: $primary-color, $amount: 10);
    }
  }
}
</style>
