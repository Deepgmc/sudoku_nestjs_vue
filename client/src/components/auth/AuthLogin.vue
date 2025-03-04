<script setup lang="ts">
import { computed, inject, reactive, ref } from 'vue';

import type { IAuthManager } from '@/interfaces/auth';
import { type ILoginUser } from '@/interfaces/user';
import AuthFormField from './AuthFormField.vue'
import AuthResponseMessage from './AuthResponseMessage.vue'
import { loginFormValidationFields, getRules } from './formValidationHelper'
import { useVuelidate } from '@vuelidate/core';

const $externalResults = reactive({})
const isFormValidated = ref<boolean>(false)
const infoMessage = ref<string[]>([])

const $authManager: IAuthManager = inject('$authManager') as IAuthManager;

const loginUser = ref<ILoginUser>({
    username: 'Serg',
    password: '1234567'
})

/** Vuelidate init */
const rules = computed(() => {
    return getRules('login', false)
})
const $v = useVuelidate(rules, loginUser, { $externalResults: $externalResults })

async function submitLogin (): Promise<boolean> {
    resetMessageField()
    const result = await $v.value.$validate()
    if(!result){
        return false //client side-validation
    }
    $authManager.setStrategy('jwt')
    const res = await $authManager.loginRequest(loginUser.value)
    console.log('LoginAnswer:', res)

    if(res.error){
        if(res.error.message) {
            infoMessage.value.push(res.error.message)
        } else if(res.error.response.data){
            infoMessage.value = infoMessage.value.concat(res.error.response.data.message)
        } else {
            infoMessage.value = infoMessage.value.concat(['Server login error'])
        }
    } else {
        isFormValidated.value = true
        infoMessage.value.push('Success logined')
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

    <form @submit.prevent="submitLogin" name="login_form" class="form_container">
        <div class="login_item auth_caption">Login</div>
        <div class="login_item">
            <AuthResponseMessage
                form="login"
                :messages="infoMessage"
                :isFormValidated="isFormValidated"
            ></AuthResponseMessage>

        </div>

        <div v-for="item of loginFormValidationFields" class="login_item">
            <AuthFormField :inputName="item.caption" :errors="$v[item.field].$errors"
                :modelField="loginUser[item.field as keyof typeof loginUser]">
                <input v-model="loginUser[item.field as keyof typeof loginUser]" :type="item.type" :placeholder="item.placeholder">
            </AuthFormField>
        </div>

        <div class="login_item submit_item">
            <button type="submit">Login</button>
        </div>
    </form>

</template>

<style lang="scss">
</style>
