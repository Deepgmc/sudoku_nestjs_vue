<script setup lang="ts">
import { reactive, ref, computed, inject } from 'vue'
import { useVuelidate } from '@vuelidate/core'

import AuthFormField from './AuthFormField.vue'
import AuthResponseMessage from './AuthResponseMessage.vue'
import { registerFormValidationFields, getRules } from './formValidationHelper'
import type { TRegisterForm } from '@/interfaces/user'
import type { IAuthManager } from '@/interfaces/Auth'

const $externalResults = reactive({})
const isFormValidated = ref<boolean>(false)
const infoMessage = ref<string[]>([])
const $authManager: IAuthManager = inject('$authManager') as IAuthManager

const registerUser = ref<TRegisterForm>({
    username: 'Serg',
    email: 'deep@deep.com',
    age: 36,
    password: '1234567',
    passwordConfirm: '1234567',
})

/** Vuelidate init */
const rules = computed(() => {
    return getRules('register', false)
})
const $v = useVuelidate(rules, registerUser, { $externalResults: $externalResults })

async function submitRegister(): Promise<boolean> {
    resetMessageField()
    const result = await $v.value.$validate()
    if(!result){
        return false //client side-validation
    }
    const res = await $authManager.registerRequest(registerUser.value)
    console.log('RegisterAnswer:', res)

    //TODO SERVER ERRORS ADD TO VUELIDATE
    // const errors = {
    //     username: 'password errs',
    //     age: 'password errs',
    //     email: 'password errs',
    // }
    // Object.assign($externalResults, errors)

    if(res.error){
        if(res.error.message) {
            infoMessage.value.push(res.error.message)
        } else if(res.error.response.data){
            infoMessage.value = infoMessage.value.concat(res.error.response.data.message)
        } else {
            infoMessage.value = infoMessage.value.concat(['Server register error'])
        }
    } else {
        isFormValidated.value = true
        infoMessage.value.push('Success registered')
    }
    return true
}

function resetMessageField(){
    $v.value.$clearExternalResults()
    $v.value.$reset()
    $v.value.$touch()
    isFormValidated.value = false
    infoMessage.value = []
}


</script>

<template>

    <form @submit.prevent="submitRegister" name="register_form" class="form_container">
        <div class="register_item auth_caption">Register</div>
        <div class="register_item">
            <AuthResponseMessage
                form="register"
                :messages="infoMessage"
                :isFormValidated="isFormValidated"
            ></AuthResponseMessage>

        </div>

        <div v-for="item of registerFormValidationFields" class="register_item">
            <AuthFormField :inputName="item.caption" :errors="$v[item.field].$errors"
                :modelField="registerUser[item.field as keyof typeof registerUser]">
                <input v-model="registerUser[item.field as keyof typeof registerUser]" :type="item.type" :placeholder="item.placeholder">
            </AuthFormField>
        </div>

        <div class="register_item submit_item">
            <button type="submit">Register</button>
        </div>
    </form>

</template>

<style lang="scss">
</style>
