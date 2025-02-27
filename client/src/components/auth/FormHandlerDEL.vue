<script setup lang="ts">
import { computed } from 'vue'
import { useVuelidate } from '@vuelidate/core'
import { required, minLength, between, email, helpers as h } from '@vuelidate/validators'
import type { TUserForm } from '../../interfaces/user';

const errorMessages = {
    required: 'Required',
    minlen: 'Minimum length',
    between: 'Between',
    email: 'Incorrect email'
}


type PropsType = {
    lineClass: string,
    formFields: TUserForm,
    fieldsValidationSetup: {[key: string]: any}
}
const props = defineProps<PropsType>()

interface IRules<U extends keyof typeof props.formFields> {
    [key: string]: U
}
const rules: any = {}

// const rules = computed(() => ({
//     username: {
//         required: h.withMessage(errorMessages.required, required),
//         minLength: h.withMessage(`${errorMessages.minlen} 2`, minLength(2))
//     },
//     password: {
//         required: h.withMessage(errorMessages.required, required),
//         minLength: h.withMessage(`${errorMessages.minlen} 3`, minLength(3))
//     },
//     passwordConfirm: {
//         required: h.withMessage(errorMessages.required, required),
//         minLength: h.withMessage(`${errorMessages.minlen} 3`, minLength(3))
//     },
//     age: {
//         required: h.withMessage(errorMessages.required, required),
//         between: h.withMessage(`${errorMessages.between} 5-150`, between(5, 150))
//     },
//     email: {
//         required: h.withMessage(errorMessages.required, required),
//         email: h.withMessage(errorMessages.email, email),
//         minLength: h.withMessage(`${errorMessages.minlen} 3`, minLength(3))
//     },
// }))
for(const [key, value] of Object.entries(props.fieldsValidationSetup)){ //console.log(key, value)
    const thisRules: any = {}
    if(value.required) thisRules['required'] = h.withMessage(errorMessages.required, required)
    if(value.email) thisRules['email'] = h.withMessage(errorMessages.email, email)

    if(value.type === 'string'){
        if(value.min) thisRules['minLength'] = h.withMessage(`${errorMessages.minlen} ${value.min}`, minLength(value.min))
    } else if(value.type === 'number'){
        thisRules['between'] = h.withMessage(`${errorMessages.between} ${value.min}-${value.max}`, between(value.min, value.max))
    }
    rules[key] = thisRules
}
console.log('rules', rules)


// rules = computed(() => ({
//     username: {
//         required: h.withMessage(errorMessages.required, required),
//         minLength: h.withMessage(`${errorMessages.minlen} 2`, minLength(2))
//     },
//     password: {
//         required: h.withMessage(errorMessages.required, required),
//         minLength: h.withMessage(`${errorMessages.minlen} 3`, minLength(3))
//     },
//     passwordConfirm: {
//         required: h.withMessage(errorMessages.required, required),
//         minLength: h.withMessage(`${errorMessages.minlen} 3`, minLength(3))
//     },
//     age: {
//         required: h.withMessage(errorMessages.required, required),
//         between: h.withMessage(`${errorMessages.between} 5-150`, between(5, 150))
//     },
//     email: {
//         required: h.withMessage(errorMessages.required, required),
//         email: h.withMessage(errorMessages.email, email),
//         minLength: h.withMessage(`${errorMessages.minlen} 3`, minLength(3))
//     },
// }))

const $v = useVuelidate(rules, props.formFields);

</script>

<template>
    <div v-for="field of props.formFields" :class="props.lineClass">
        <slot name="header"></slot>
        <slot name="input" :field="field"></slot>
        <slot name="error_list"></slot>
    </div>
</template>

<style lang="scss"></style>