<script setup lang="ts">
import { reactive, ref, computed, inject } from 'vue'
import { useVuelidate } from '@vuelidate/core'

import AuthFormField from './AuthFormField.vue'
import { registerFormValidationFields, getRules } from './formValidationHelper'
import type { TRegisterForm } from '@/interfaces/user'
import type { IAuthManager } from '@/interfaces/auth'

const warnMessage = ref('###')
const $authManager: IAuthManager = inject('$authManager') as IAuthManager

const localUser = ref<TRegisterForm>({
    username: 'Serg',
    password: '1234567',
    passwordConfirm: '1234567',
    age: 36,
    email: 'deep@deep.com',
})

const rules = computed(() => {
    return getRules('registration')
})
const $v = useVuelidate(rules, localUser)

async function submitRegister() {
    const registerAnswer = await $authManager.register(localUser.value)

    console.log('RegisterAnswer:', registerAnswer)
    if(registerAnswer.error){
        //axios error comes here
        console.warn(
            'Err message:', registerAnswer.error.message,
            'Err code:', registerAnswer.error.code,
            'Err status:', registerAnswer.error.status
        )
    }



    return
    const result = await $v.value.$validate()

    /**
    равны ли пароли
    отправка на сервер
    проверка на сервере и если неудачно - высветить ошибку тут
    */

    // console.log($v.value)
    // console.log('V $errors:', $v.value.$errors)
    if (result) {
        try {
            $authManager.register(localUser.value)
            console.log('Form submitting')
        } catch (e: any) {
            warnMessage.value = e.message
        }
    } else {
        console.warn('Not submitting', result)
    }





}


</script>

<template>

    <form @submit.prevent="submitRegister" name="register_form" class="form_container">
        <div class="register_item auth_caption">
            Register <span class="tmp_warn">{{ warnMessage }}</span>
        </div>


        <div v-for="item of registerFormValidationFields" class="register_item">
            <AuthFormField :inputName="item.caption" :errors="$v[item.field].$errors"
                :modelField="localUser[item.field as keyof typeof localUser]">
                <input v-model="localUser[item.field as keyof typeof localUser]" :type="item.type" :placeholder="item.placeholder">
            </AuthFormField>
        </div>


        <div class="register_item submit_item">
            <button type="submit">Register</button>
        </div>
    </form>

</template>

<style lang="scss">
.tmp_warn {
    color: rgb(184, 69, 34);
}
</style>
