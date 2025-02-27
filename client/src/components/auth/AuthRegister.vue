<script setup lang="ts">
import { computed, reactive, ref } from 'vue'

import { useVuelidate } from '@vuelidate/core'
import { required, minLength, between, email, helpers as h } from '@vuelidate/validators'

import AuthFormField from './AuthFormField.vue'
import { errorMessages } from './errorMessages'

const localUser = reactive({
    username       : '',
    password       : 'init password',
    passwordConfirm: '',
    age            : 3,
    email          : 'example@example.com',
})

const localUserT = [
    {field: 'username', caption: 'Name', placeholder: 'login', type: 'text'},
    {field: 'password', caption: 'Password', placeholder: 'password', type: 'text'},
    {field: 'passwordConfirm', caption: 'PasswordConfirmation', placeholder: 'confirm password', type: 'text'},
    {field: 'age', caption: 'Age', placeholder: 'your age', type: 'number'},
    {field: 'email', caption: 'Email', placeholder: 'email', type: 'text'},
]

const rules: any = {}
for(const item of localUserT){
    const thisRules: any = {}
    const minLen = item.type === 'text' ? 3 : 1;
    thisRules['required'] = h.withMessage(errorMessages.required, required)
    thisRules['minLength'] = h.withMessage(`${errorMessages.minlen} ${minLen}`, minLength(minLen))
    if(item.field === 'email') thisRules['email'] = h.withMessage(errorMessages.email, email)

    rules[item.field] = thisRules
}
console.log('rules', rules)


const $v = useVuelidate(rules, localUser);


function submitRegister() {
    const result = $v.value.$validate()


    /**
    равны ли пароли
    отправка на сервер
    проверка на сервере и если неудачно - высветить ошибку тут
    */


    result.then((res) => {
        console.log('V:', $v.value.$errors)
        if (res) {
            console.log('Form submitting')
        } else {
            console.log('Not submitting', res)
        }
    }).catch((err) => {
        console.log(err);
    })
}
</script>

<template>

    <form @submit.prevent="submitRegister" name="register_form" class="form_container">
        <div class="register_item auth_caption">
            Register at sudoku
        </div>


        <div v-for="item of localUserT" class="register_item">
            <AuthFormField
                :inputName="item.caption"
                :errors="$v[item.field].$errors"
                :modelField="localUser[item.field]"
            >
                <input v-model="localUser[item.field]" :type="item.type" :placeholder="item.placeholder">
            </AuthFormField>
        </div>


        <div class="register_item submit_item">
            <button type="submit">Register</button>
        </div>
    </form>

</template>

<style lang="scss"></style>
