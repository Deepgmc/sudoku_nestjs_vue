<script setup lang="ts">
import { computed, reactive } from 'vue'
import { useVuelidate } from '@vuelidate/core'
import { required, minLength, between, email, helpers as h } from '@vuelidate/validators'

const messages = {
    required: 'Required',
    minlen: 'Minimum length',
    between: 'Between',
    email: 'Incorrect email'
}

const localUser = reactive({
    username: '',
    password: 'init password',
    passwordConfirm: '',
    age: 3,
    email: 'example@example.com'
})
const rules = computed(() => ({
    username: {
        required: h.withMessage(messages.required, required),
        minLength: h.withMessage(`${messages.minlen} 2`, minLength(2))
    },
    password: {
        required: h.withMessage(messages.required, required),
        minLength: h.withMessage(`${messages.minlen} 3`, minLength(3))
    },
    passwordConfirm: {
        required: h.withMessage(messages.required, required),
        minLength: h.withMessage(`${messages.minlen} 3`, minLength(3))
    },
    age: {
        required: h.withMessage(messages.required, required),
        minLength: h.withMessage(`${messages.between} 5-150`, between(5, 150))
    },
    email: {
        required: h.withMessage(messages.required, required),
        email: h.withMessage(messages.email, email),
        minLength: h.withMessage(`${messages.minlen} 3`, minLength(3))
    },
}))
const $v = useVuelidate(rules, localUser);

function submitRegister() {

    const result = $v.value.$validate();
    result.then((res) => {
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

        <div class="register_item">
            <div class="register_item_caption">
                <span v-if="$v.username.$errors.length" class="error_asterisk">*</span>Name
                <template v-if="$v.username.$errors.length">
                    <span class="error-msg" v-for="error of $v.username.$errors" :key="error.$uid">
                        {{ error.$message }}
                    </span>
                </template>
            </div>
            <input v-model="localUser.username" type="text" placeholder="login">
        </div>

        <div class="register_item">
            <div class="register_item_caption">
                Password
                <template v-if="$v.password.$errors.length">
                    <span class="error-msg" v-for="error of $v.password.$errors" :key="error.$uid">
                        {{ error.$message }}
                    </span>
                </template>
            </div>
            <input v-model="localUser.password" type="text" placeholder="password">
        </div>
        <div class="register_item">
            <div class="register_item_caption">
                Password confirmation
                <template v-if="$v.passwordConfirm.$errors.length">
                    <span class="error-msg" v-for="error of $v.passwordConfirm.$errors" :key="error.$uid">
                        {{ error.$message }}
                    </span>
                </template>
            </div>
            <input v-model="localUser.passwordConfirm" type="text" placeholder="confirm password">
        </div>

        <div class="register_item">
            <div class="register_item_caption">
                Age
                <template v-if="$v.age.$errors.length">
                    <span class="error-msg" v-for="error of $v.age.$errors" :key="error.$uid">
                        {{ error.$message }}
                    </span>
                </template>
            </div>
            <input v-model="localUser.age" type="number" placeholder="age">
        </div>

        <div class="register_item">
            <div class="register_item_caption">
                Email
                <template v-if="$v.email.$errors.length">
                    <span class="error-msg" v-for="error of $v.email.$errors" :key="error.$uid">
                        {{ error.$message }}
                    </span>
                </template>
            </div>
            <input v-model="localUser.email" type="email" placeholder="email">
        </div>
        <div class="register_item submit_item">
            <button type="submit">Register</button>
        </div>
    </form>

</template>

<style lang="scss"></style>
