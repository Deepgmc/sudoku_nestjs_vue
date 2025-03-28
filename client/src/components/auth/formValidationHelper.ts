import type { TFormValidationFields } from '../../interfaces/user'
import { errorMessages } from '../../auth/errorMessages'
import type { TRegisterForm } from '../../interfaces/user'
import { required, minLength, email, helpers as h } from '@vuelidate/validators'

export const registerFormValidationFields: TFormValidationFields[] = [
    { field: 'username',        caption: 'Login',                placeholder: 'login',               type: 'text' },
    { field: 'email',           caption: 'Email',                placeholder: 'example@example.com', type: 'text' },
    { field: 'age',             caption: 'Age',                  placeholder: 'your age',            type: 'number'},
    { field: 'password',        caption: 'Password',             placeholder: 'password',            type: 'text' },
    { field: 'passwordConfirm', caption: 'PasswordConfirmation', placeholder: 'confirm password',    type: 'text' },
]

export const loginFormValidationFields: TFormValidationFields[] = [
    { field: 'username', caption: 'Login',    placeholder: 'login',    type: 'text' },
    { field: 'password', caption: 'Password', placeholder: 'password', type: 'text' },
]

const externalServerValidation = () => true

/**
 * Составляет структуру-настройку в нужном формате для vuelidate
 * @param whichForm для какой формы выполняется
 * @returns структура валидации для vuelidate
 */
export function getRules(whichForm: string, disable:boolean = false) {
    const rules: any = {}
    const types: TFormValidationFields[] = whichForm === 'register' ? registerFormValidationFields : loginFormValidationFields
    for (const item of types) {
        const thisRules: any = {externalServerValidation}//vuelidate bug: incorrect works with $externalData errors!
        rules[item.field] = thisRules
        if(disable) continue; //for debugging

        const minLen = item.type === 'text' ? 3 : 1;
        thisRules['required'] = h.withMessage(errorMessages.required, required)
        thisRules['minLength'] = h.withMessage(`${errorMessages.minlen} ${minLen}`, minLength(minLen))
        if (item.field === 'email') thisRules['email'] = h.withMessage(errorMessages.email, email)
        if (item.field === 'password' && whichForm !== 'login') thisRules['passwordConfirmValidator'] = h.withMessage(errorMessages.equalPasswords, passwordConfirmValidator)
    }
    return rules
}

/**
 * Валидатор, правильно ли подтвержден пароль (при регистрации)
 * @param value проверяемое поле пароля
 * @param siblings другие поля, одно из которых подтверждение пароля
 * @returns проверка, одинаковы ли пароли
 */
const passwordConfirmValidator = (value: TRegisterForm['password'], siblings: any) => {
    if (comparePasswords(value, siblings.passwordConfirm as string)) return {$valid: true}
    return {$valid: false}
}

function comparePasswords(password: TRegisterForm['password'], confirmation: TRegisterForm['passwordConfirm']) {
    return password === confirmation
}