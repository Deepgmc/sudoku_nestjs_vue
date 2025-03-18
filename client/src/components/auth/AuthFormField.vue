<script lang="ts" setup>
import type { ErrorObject } from '@vuelidate/core'


/**
const props = defineProps({
  source: {
    type: String as PropType<string>,
    default: '/profile.png',
  },
  alt: {
    type: String as PropType<string>,
    default: 'Profile Photo',
  },
  large: {
    type: Boolean as PropType<boolean>,
    default: true,
  },
})
*/
type PropsType = {
    errors: ErrorObject[],
    inputName: string,
    modelField: any
}
const props = defineProps<PropsType>()

</script>


<template>
    <div class="register_item_caption">
        <span v-if="props.errors.length" class="error_asterisk">*</span>{{ props.inputName }}
        <template v-if="props.errors.length">
            <span class="error-msg" v-for="error of props.errors" :key="error.$uid">
                {{ error.$message }}
            </span>
        </template>
    </div>
    <slot></slot>
</template>