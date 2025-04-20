<template>
    <div>
        <div>ValOne: {{ valOne }}</div>
        <div>ValTwo: {{ obj.valTwo }}</div>
    </div>
</template>

<script lang="ts">
import { reactive, toRefs } from 'vue';

export default {
    setup(props, context) {

        const state = reactive({
            valOne: 1,
            obj: {
                valTwo: 1
            }
        })

        function tick(){
            state.valOne++
            state.obj.valTwo++
        }

        // setInterval(() => {
        //     tick()
        // }, 1000)

        return {
            ...toRefs(state)
        }
    }
}
</script>

<style lang="">

</style>