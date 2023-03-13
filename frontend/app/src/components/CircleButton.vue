<template>
  <button
    class="button-circle active"
    @click="onClick"
  >
    <v-icon
      v-if="state.done"
      size="26px"
      class="mdi-check"
    >
      mdi-check
    </v-icon>
  </button>
</template>
<script lang="ts">
import { defineComponent, reactive } from 'vue'

export default defineComponent({
    setup(_props) {
        const state = reactive({
            done: false
        });
        const onClick = ()=>{
            state.done = !state.done;
        }
        return {
            state,
            onClick
        }
    },
})
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
    cursor:pointer;
    opacity: 1;
}

.mdi-check {
    margin: -13px -10px -10px -10px;
}
</style>
