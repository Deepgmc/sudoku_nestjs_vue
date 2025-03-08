<script lang="ts" setup>
import { computed } from 'vue';

type PropsType = {
    messages: string[],
    form: string,
    isFormValidated: boolean
}
const props = defineProps<PropsType>()
const sym = computed(() => {
    if(props.isFormValidated) return `&#10003;`
    else return `&#10007;`
})

</script>

<template>
    <span class="auth_caption_message" :class="[isFormValidated ? 'success_text' : 'error_text']" v-for="message of messages"><span v-html="sym"></span> {{ message }}</span>
</template>

<style lang="scss">

</style>