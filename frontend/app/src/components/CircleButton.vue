<template>
  <button class="button-circle active" @click="onClick">
    <svg
      v-if="state.done"
      class="mdi-check"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
    >
      <title>check</title>
      <path d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z" />
    </svg>
  </button>
</template>
<script lang="ts">
import { defineComponent, reactive } from "vue";

export default defineComponent({
  setup(_props) {
    const state = reactive({
      done: false,
    });
    const onClick = () => {
      state.done = !state.done;
    };
    return {
      state,
      onClick,
    };
  },
});
</script>
<style lang="scss" scoped>
.button-circle {
  display: inline-block;
  width: 26px;
  height: 26px;
  border: solid 1px;
  border-radius: 50%;
  opacity: 0.5;
}

.button-circle:hover {
  cursor: pointer;
  opacity: 1;
}

.mdi-check {
  margin: -2px -5px -5px -5px;
}
</style>
