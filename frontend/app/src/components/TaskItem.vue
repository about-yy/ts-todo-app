<!-- eslint-disable vue/no-mutating-props -->
<template>
  <div class="task_item" @mouseover="onMouseOver" @mouseleave="onMouseLeave">
    <CircleButton @click="taskComplete" />
    <label class="task_item-text task_title" :for="`task_${task.task_id}`">
      {{ task.title }}
    </label>
    <label class="task_item-text task_period" :for="`task_${task.task_id}`">
      {{ new Date(task.period).toLocaleDateString() }}
    </label>

    <div class="task_item-nav">
      <Popper @close:popper="taskSchedule">
        <svg
          v-show="hovered"
          class="icon task_period mdi-calendar mdi"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <title>期限を設定する</title>
          <path
            d="M19,19H5V8H19M16,1V3H8V1H6V3H5C3.89,3 3,3.89 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5C21,3.89 20.1,3 19,3H18V1M17,12H12V17H17V12Z"
          />
        </svg>
        <template #content>
          <DatePicker v-model="task.period" />
        </template>
      </Popper>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, PropType, ref } from "vue";
import { Task } from "custom-types";
import CircleButton from "./CircleButton.vue";
import Popper from "vue3-popper/dist/popper.esm";
import { DatePicker } from "v-calendar";

export default defineComponent({
  components: {
    CircleButton,
    Popper,
    DatePicker,
  },
  props: {
    task: {
      type: Object as PropType<Task>,
      required: true,
    },
  },
  emits: ["onComplete", "onScheduled"],
  setup(props, context) {
    const hovered = ref(false);
    const date = ref(new Date(props.task.period ?? ""));

    const onMouseOver = () => {
      hovered.value = true;
    };
    const onMouseLeave = () => {
      hovered.value = false;
    };

    const taskComplete = async () => {
      context.emit("onComplete");
    };

    const taskSchedule = async () => {
      context.emit("onScheduled");
    };

    return {
      hovered,
      date,
      onMouseOver,
      onMouseLeave,
      taskComplete,
      taskSchedule,
    };
  },
});
</script>
<style scoped>
.task_item {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-items: center;
  margin: 4.5px;
}

.task_item .task_item-text {
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
  opacity: 1;
}

.icon.mdi-calendar {
  width: 20px;
}
</style>
