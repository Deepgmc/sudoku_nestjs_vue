<script setup lang="ts">
import { reactive, ref, computed, inject } from 'vue'
import { useVuelidate } from '@vuelidate/core'

import AuthFormField from './AuthFormField.vue'
import { registerFormValidationFields, getRules } from './formValidationHelper'
import type { TRegisterForm, TServerError } from '@/interfaces/user'
import type { IAuthManager } from '@/interfaces/auth'

//const serverErrors = ref<TServerError[]>([])
const $externalResults = reactive({})


const warnMessage = ref<string[]>([])
const $authManager: IAuthManager = inject('$authManager') as IAuthManager

const localUser = ref<TRegisterForm>({
    username: 'Serg',
    password: '1234567',
    passwordConfirm: '1234567',
    age: 36,
    email: 'deep@deep.com'
})



const rules = computed(() => {
    return getRules('registration', true)
})
const $v = useVuelidate(rules, localUser, { $externalResults: $externalResults })
console.log('rules', rules)

async function submitRegister() {
    resetWarnField()
    /**
    проверка на сервере и если неудачно - высветить ошибку тут
    // console.log($v.value)
    // console.log('V $errors:', $v.value.$errors)
    */
    const result = await $v.value.$validate()
    if (result) {
        try {
            const registerAnswer = await $authManager.register(localUser.value)
            console.log('RegisterAnswer:', registerAnswer)

            const errors = {
                username: 'ggggggggg',
            }
            Object.assign($externalResults, errors)
            //$v.value.$touch()
            //if(!$v.value.$validate()) console.log('FAIL!')
            //console.log('Errors:', $v.value.$errors)


            if(registerAnswer.error){
                if(registerAnswer.error.response.data.message){
                    warnMessage.value = registerAnswer.error.response.data.message
                } else {
                    console.log('ALARM ERROR TYPE INCORRECT')
                }
                // console.error(
                //     'Err message:', registerAnswer.error.message,
                //     'Err code:', registerAnswer.error.code,
                //     'Err status:', registerAnswer.error.status
                // )
            } else {
                warnMessage.value = ['SUCCESS']
            }
        } catch (e: any) {
            console.log('Catch error:', e)
            console.log('ALARM EROR TYPE INCORRECT 2')
        }
    } else {
        warnMessage.value = ['Validation went wrong']
    }

}

function resetWarnField(){
    warnMessage.value = []
}


</script>

<template>

    <form @submit.prevent="submitRegister" name="register_form" class="form_container">
        <div class="register_item auth_caption">
            Register
            <span class="tmp_warn" v-for="message of warnMessage">{{ message }}</span>
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
</style>
