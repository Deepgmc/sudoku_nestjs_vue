<template>
    <form @submit.prevent="submitLogin" name="login_form" class="form_container">
        <div class="login_item auth_caption">Login {{ authStore.isLogined ? '(logined)' : '' }}</div>
        <div class="login_item">
            <AuthResponseMessage
                form="login"
                :messages="infoMessage"
                :isFormValidated="isFormValidated"
            ></AuthResponseMessage>
        </div>
        <div v-for="item of loginFormValidationFields" class="login_item" :key="item.field">
            <AuthFormField
                :inputName="item.caption"
                :errors="$v[item.field].$errors"
                :modelField="loginUser[item.field as keyof typeof loginUser]"
            >
                <input
                    v-model="loginUser[item.field as keyof typeof loginUser]"
                    :type="item.type"
                    :placeholder="item.placeholder"
                >
            </AuthFormField>
        </div>

        <div class="login_item submit_item">
            <button type="submit">Login</button>
        </div>
    </form>
</template>

<script setup lang="ts">
import { computed, inject, reactive, ref, watch, watchEffect } from 'vue';
import { useAuthStore } from '@/stores/auth'
import { useVuelidate } from '@vuelidate/core'

import AuthFormField from './AuthFormField.vue'
import AuthResponseMessage from './AuthResponseMessage.vue'
import { loginFormValidationFields, getRules } from './formValidationHelper'

import type { IAuthManager } from '@/interfaces/Auth';
import type { ILoginUser } from '@/interfaces/user';
import { RESPONSE_STATUS_CODES } from '@/constants';


const $externalResults = reactive({})
const isFormValidated = ref<boolean>(false)
const infoMessage = ref<string[]>([])

const authStore = useAuthStore()
const $authManager: IAuthManager = inject('$authManager') as IAuthManager;

const loginUser = ref<ILoginUser>({
    username: 'SergUmbrella',
    password: '1234567'
})

/** Vuelidate init */
const rules = computed(() => {
    return getRules('login', false)
})
const $v = useVuelidate(rules, loginUser, { $externalResults: $externalResults })

async function submitLogin(): Promise<boolean> {
    resetMessageField()
    const result = await $v.value.$validate()
    if(!result){
        return false //client side-validation
    }
    let res: any
    try {
        res = await $authManager.loginRequest(loginUser.value)
        console.log('Login request result:', res)
    } catch(e){
        console.log('err:', e)
    }

    let message = 'Server offline'
    if(res.error){
        if(res.error.message) {
            if(res.error.status !== RESPONSE_STATUS_CODES.SERVER_ERR){
                message = res.error.message
            }
            infoMessage.value.push(message)
        } else if(res.error.response.data){
            message = res.error.response.data.message
            infoMessage.value = infoMessage.value.concat(message)
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

<style lang="scss">
</style>
