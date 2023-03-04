<template>
    <p>{{ token }}</p>
</template>
<script lang="ts">
import { computed, defineComponent, onBeforeMount } from 'vue'
import { useStore } from '../store'
import AxiosUtil from '../utils/AxiosUtil'

export default defineComponent({
    setup() {
        const getTasks = async ()=>{
            const result = await AxiosUtil.get('/task/list')
            console.log(result);
        }
        onBeforeMount(getTasks);
        const store = useStore();
        const token = computed(()=>store.state.token);
        return {
            token
        }
    },
})
</script>
<style scoped>
.taskItem:hover {
    background-color: aliceblue;
}
</style>