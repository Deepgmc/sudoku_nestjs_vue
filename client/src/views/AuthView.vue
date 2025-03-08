<script setup lang="ts">
import { ref } from 'vue'

import AuthLogin from '../components/auth/AuthLogin.vue'
import AuthRegister from '../components/auth/AuthRegister.vue'

const loginSwitchText = 'Switch to register'
const registerSwitchText = 'Switch to login'

const isLogin = ref(true)
const authBtnText = ref(loginSwitchText)

/**
 * Switch login/register form
 */
function changeForm(): void{
    authBtnText.value = !isLogin.value ? loginSwitchText : registerSwitchText
    isLogin.value = !isLogin.value
}

</script>

<template>
    <section class="auth_container">
        <div class="auth_line" v-if="isLogin">
            <AuthLogin></AuthLogin>
        </div>
        <div class="auth_line" v-else>
            <AuthRegister></AuthRegister>
        </div>
        <div class="auth_line">
            <span class="auth_switch_btn link" @click="changeForm">{{ authBtnText }}</span>
        </div>
    </section>
</template>

<style lang="scss">
.auth_container{
    display: flex;
    flex-flow: column nowrap;
    flex: 1 0 $authFormWidth;

    align-items: center;

    //border: 1px solid green;
}
.auth_line{
    display:flex;
    flex-flow: column nowrap;
    justify-content: space-between;
    align-items: flex-start;
    flex: 1 0 auto;
    margin: 0 0 40px 0;
    min-width: $authFormWidth;

    //border: 1px solid blue;
}


.auth_caption{
    font-size: 2em;
    color: $orangeColor;
    padding:0 0 20px 0;
}
.form_container {
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
    flex: 1 0 auto;
    min-width: 100%;

    //border: 1px solid red;
}

.login_item, .register_item{
    display:flex;
    flex-flow:column nowrap;
    justify-items: flex-start;
    justify-content: space-around;
    flex: 1 0 auto;
    margin: 15px 0 0 0;
    width:100%;

}
.login_item input, .register_item input{
    display:flex;
    flex: 1 0 100%;
    min-width: 205px;
}

.register_item_caption, .error-msg{
    padding: 3px;
}
.error-msg{
    color: $errorTextColor;
    margin-left:15px;
    font-size:11px;
}
.error_asterisk{
    color: $errorTextColor;
    font-size:11px;
    margin:0 5px 0 0;
}

.auth_caption_message {
    margin-top:3px;
    height:1em;
    font-size: 1em;
}

.submit_item{
    margin-top: 50px;
}
.auth_switch_btn{
    cursor:pointer;
}
.auth_switch_btn:hover {
    color: $linkColorHover;
}
</style>
